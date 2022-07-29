import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useCurrentUser } from "./useCurrentUser.js";
import apiService from "../services/apiService.js";

const useElementService = (fileName, frameName) => {
  /* Elements is a map from element id to objects */
  const [elements, setElements] = useState(new Map());
  /* Selection is a map from username to array of element ids */
  const [elementSelection, setElementSelection] = useState(new Map());
  /* Websocket is a socket.io instance */
  const [websocket, setWebsocket] = useState(null);
  /* ElementsNotPushed is a set of elementIds */
  const [elementsToBePushed, setElementsToBePushed] = useState(new Set());
  /* UpdateTask is an update task to be executed after some milliseconds */
  const [updateTask, setUpdateTask] = useState(null);

  const { currentUser } = useCurrentUser();

  /* Update the elements stored on this machine */
  const updateLocalElements = (newElements) => {
    setElements((prevElements) => {
      const newAllElements = new Map(prevElements);
      newElements.forEach((element) => {
        newAllElements.set(element.id, element);
      });
      return newAllElements;
    });
  };
  const deleteLocalElements = (elementIds) => {
    setElements((prevElements) => {
      const newElements = new Map(prevElements);
      elementIds.forEach((elementId) => {
        newElements.delete(elementId);
      });
      return newElements;
    });
  };

  useEffect(() => {
    /* On load, connect to the websocket */
    if (!websocket) {
      const socket = io();

      /* Join the room */
      socket.emit("joinRoom", {
        projectName: fileName,
        frameName,
      });
      /* Listen for messages */
      socket.on("updateElements", (data) => {
        updateLocalElements(data.elements);
      });
      socket.on("deleteElements", (data) => {
        deleteLocalElements(data.elementIds);
      });
      socket.on("updateSelection", (data) => {
        setElementSelection((prevElementSelection) => {
          const newElementSelection = new Map(prevElementSelection);
          newElementSelection.set(data.username, data.elementIds);
          return newElementSelection;
        });
      });

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      /* Set the websocket */
      setWebsocket(socket);
    }

    /* Load all elements */
    apiService.getElements(fileName, frameName).then((data) => {
      updateLocalElements(
        data.elements.map((element) => {
          return element.content;
        })
      );
    });
  }, [fileName, frameName, websocket]);

  /* Create an element */
  const createElements = (elements) => {
    websocket.emit("updateElements", {
      elements,
      fileName,
      frameName,
    });
    updateLocalElements(elements);
  };
  const deleteElements = () => {
    const elementIds = Array.from(elementSelection.get(currentUser));
    websocket.emit("deleteElements", {
      elementIds,
      fileName,
      frameName,
    });
    deleteLocalElements(elementIds);
  };
  const updateElements = (newElements) => {
    updateLocalElements(newElements);
    setElementsToBePushed((prevElementsToBePushed) => {
      const newElementsToBePushed = new Set(prevElementsToBePushed);
      newElements.forEach((element) => {
        newElementsToBePushed.add(element.id);
      });
      return newElementsToBePushed;
    });

    /* Set the update task */
    clearTimeout(updateTask);
    setUpdateTask(
      setTimeout(() => {
        if (elementsToBePushed.size === 0) {
          return;
        }

        websocket.emit("updateElements", {
          elements: Array.from(elementsToBePushed).map((elementId) => {
            return elements.get(elementId);
          }),
          fileName,
          frameName,
        });
        console.log("Emitted");
        setElementsToBePushed(new Set());
      }, 256)
    );
  };
  const updateSelection = (selectElementIds, unselectElementIds) => {
    setElementSelection((elementSelection) => {
      const prevElementSelectionByUser =
        elementSelection.get(currentUser) ?? new Set();
      const newElementSelectionByUser = new Set(
        [...prevElementSelectionByUser, ...selectElementIds].filter(
          (elementId) => !unselectElementIds.has(elementId)
        )
      );
      /* If two sets are equal, do nothing */
      if (
        newElementSelectionByUser.size === prevElementSelectionByUser.size &&
        [...newElementSelectionByUser].every((elementId) =>
          prevElementSelectionByUser.has(elementId)
        )
      ) {
        return;
      }

      websocket.emit("updateSelection", {
        elementIds: Array.from(newElementSelectionByUser),
        fileName,
        frameName,
      });
      const newElementSelection = new Map(elementSelection);
      newElementSelection.set(currentUser, newElementSelectionByUser);
      return newElementSelection;
    });
  };
  const selectElements = (elementIds) => {
    updateSelection(new Set(elementIds), new Set());
  };
  const unselectElements = (elementIds) => {
    updateSelection(new Set(), new Set(elementIds));
  };
  const unselectAllElements = () => {
    const selected = elementSelection.get(currentUser);
    if (selected && selected.size > 0) {
      unselectElements(Array.from(selected));
    }
  };

  return {
    elements,
    elementSelection,
    createElements,
    deleteElements,
    updateElements,
    selectElements,
    unselectElements,
    unselectAllElements,
  };
};

export default useElementService;
