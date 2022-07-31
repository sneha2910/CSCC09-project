import { Stack } from "react-bootstrap";
import ULDesignFrame from "../components/ULDesignFrame";

const ULPresentation = () => {
  return (
    <Stack className="h-100">
      <ULDesignFrame presentationMode={true} />
    </Stack>
  );
};

export default ULPresentation;