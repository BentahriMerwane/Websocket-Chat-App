
import './App.css';
import React, { useState, useEffect } from 'react';
function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
      <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
        
      </header>
    </div>
  );
}

export default App;
