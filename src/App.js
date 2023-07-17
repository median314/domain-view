// import './App.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './Hooks/GlobalContext';
import LoaderComponent from './Components/Spinners/LoaderComponent';
import { Center } from '@chakra-ui/layout';

function App() {
  const value = useContext(GlobalContext);
  const [page, setPage] = useState([]);

  const getCode = () => {
    setPage(value.webConfig?.message);
  };

  console.log(page)
  console.log(value?.webConfig)

  useEffect(() => {
    getCode()

    return () => {
      // setPage([]);
    };
  }, []);

  return (
    <div className="App">
      {value.webConfig?.message?.length === 0 || value.webConfig?.message === undefined ? (
        <Center>
          <LoaderComponent />
        </Center>
      ) : (
        value.webConfig?.message?.map((x) => (
          <div dangerouslySetInnerHTML={{ __html: x.htmlContent }} />
        ))
      )}
    </div>
  );
}

export default App;







