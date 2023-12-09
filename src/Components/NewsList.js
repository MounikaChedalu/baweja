import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ news = [], setNews, setError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=1a3408fa2f3e4af89fb08a64e60d02e7`;

    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.articles) {
          console.log(data.articles);
          setNews(data.articles);
        } else {
          setError('Error fetching news. Please try again later.');
        }
      } catch (error) {
        setError('Error fetching news. Please try again later.');
      }
    };

    fetchNews();
  }, [currentPage, setNews, setError]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(news.length / pageSize);
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
          className={i === currentPage ? 'active' : ''}
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
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return news.slice(startIndex, endIndex);
  };

  return (
    <div className="news-list">
            {getPageNews().map((article, index) => (
        <NewsItem key={index} article={article} />
      ))}
      <div className="pagination">
        {getPageNumbers()}
      </div>
    </div>
  );
};

export default NewsList;
