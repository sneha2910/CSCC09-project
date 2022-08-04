import { Stack } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import ULNavbar from "../components/ULNavbar";
import ULDesignFrame from "../components/ULDesignFrame";

const ULDesign = () => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const frameName = searchParams.get("frameName");

  return (
    <Stack className="h-100">
      <ULNavbar />
      <h3>
        <Link to="/">Home</Link> &gt;{" "}
        <Link to={`/project?projectId=${projectId}&projectName=${projectName}`}>
          {projectName}
        </Link>{" "}
        &gt; {frameName}
      </h3>
      <ULDesignFrame />
    </Stack>
  );
};

export default ULDesign;
