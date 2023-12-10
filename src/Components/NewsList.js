import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewsList.css';

const NewsList = ({ news }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalNewsData, setOriginalNewsData] = useState(news);
  const [filteredNews, setFilteredNews] = useState(news);
  const articlesPerPage = 9;

  useEffect(() => {
    setOriginalNewsData(news);
    setFilteredNews(news); 
  }, [news]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter some text before searching.');
      return;
    }
    const filteredData = originalNewsData.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredNews(filteredData);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilteredNews(originalNewsData);
  };

  const getPageNumbers = () => {
    if (!filteredNews || !Array.isArray(filteredNews) || filteredNews.length === 0) {
      return null;
    }

    const totalPages = Math.ceil(filteredNews.length / articlesPerPage);
    const pageNumbers = [];

    pageNumbers.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active selected' : ''}
        >
          {i}
        </button>
      );
    }

    pageNumbers.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return pageNumbers;
  };

  const getPageNews = () => {
    if (!filteredNews || !Array.isArray(filteredNews) || filteredNews.length === 0) {
      return [];
    }

    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredNews.slice(startIndex, endIndex);
  };

  return (
    <div className='total-news-container'>
      <h1 className='news-heading'>News Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
        <button onClick={() => { handleSearch(); setCurrentPage(1); }} className='search-btn'>
          Search
        </button>
        <button onClick={() => resetSearch()} className='reset-btn'>
          Reset
        </button>
      </div>
      <div className='news-list'>
        {getPageNews().map((article, index) => (
          <div key={index} className="news-item">
            <h2>{article.title}</h2>
            {article.urlToImage && <img src={article.urlToImage} alt='articleimage' />}
            <p>{article.description}</p>
            <p>Published at: {article.publishedAt}</p>
            <Link to={`/news/${index + 1}`}>
              <button>Read More</button>
            </Link>
          </div>
        ))}

        <div className="pagination">{getPageNumbers()}</div>
      </div>
    </div>
  );
};

export default NewsList;
