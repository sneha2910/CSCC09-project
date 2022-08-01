import { Stack } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import ULNavbar from '../components/ULNavbar';
import ULDesignFrame from '../components/ULDesignFrame';


const ULDesign = () => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const frameId = searchParams.get("frameId");
  const projectName = searchParams.get("projectName");
  const frameName = searchParams.get("frameName");

  return (
    <Stack className="h-100">
      <ULNavbar />
      <h2>Home &gt; {projectName} &gt; {frameName}</h2>
      <ULDesignFrame />
    </Stack>
  );
};

export default ULDesign;