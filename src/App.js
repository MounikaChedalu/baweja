import React, { useState } from 'react';
import NewsList from './Components/NewsList';
import './App.css'; 

const App = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div>
      <h1>News Dashboard</h1>
      {error && <p>{error}</p>}
      <NewsList news={news} setNews={setNews} setError={setError} />
    </div>
  );
};

export default App;
