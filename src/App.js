import './App.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './Hooks/GlobalContext';

function App() {
  const value = useContext(GlobalContext);
  const [page, setPage] = useState([]);

  const getCode = async () => {
    setPage(value.webConfig?.message);
  };

  console.log(page)
  console.log(value.webConfig)

  useEffect(() => {
    getCode();

    return () => {
      setPage([]);
    };
  }, []);

  return (
    <div className="App">
      {page?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        page?.map((x) => (
          <div dangerouslySetInnerHTML={{ __html: x.htmlContent }} />
        ))
      )}
    </div>
  );
}

export default App;







