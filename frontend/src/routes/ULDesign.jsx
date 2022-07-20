import { Stack, Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import ULNavbar from '../components/ULNavbar';
import ULDesignFrame from '../components/ULDesignFrame';


const ULDesign = () => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const filename = searchParams.get("file");
  return (
    <Stack className="h-100">
      <ULNavbar />
      <h2>Editing {filename}</h2>
      <ULDesignFrame />
    </Stack>
  );
};

export default ULDesign;