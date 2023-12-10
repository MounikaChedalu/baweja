import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from './Components/NewsList';
import NewsItem from './Components/NewsItem';

const App = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const response = await fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=1a3408fa2f3e4af89fb08a64e60d02e7');
      const data = await response.json();
      setNews(data.articles);
    };

    fetchNewsData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList news={news} />} />
        <Route path="/news/:id" element={<NewsItem news={news} />} />
      </Routes>
    </Router>
  );
};

export default App;
