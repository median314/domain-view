// import './App.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './Hooks/GlobalContext';
import LoaderComponent from './Components/Spinners/LoaderComponent';
import { Center } from '@chakra-ui/layout';
import { inject } from '@vercel/analytics';

inject();
function App() {
  const value = useContext(GlobalContext);

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


