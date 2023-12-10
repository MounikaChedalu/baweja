import React from 'react';
import { useParams } from 'react-router-dom';
import './NewsList.css'

const NewsItem = ({ news }) => {
  const { id } = useParams();
  const articleIndex = parseInt(id, 10) - 1;

  if (!news || news.length === 0 || !news[articleIndex]) {
    return <div>Article not found</div>;
  }

  const article = news[articleIndex];

  return (
    <div className='item-container'>
      <h2>{article.title}</h2>
      {article.urlToImage && <img src={article.urlToImage} alt='articleimage1' />}

      <p>{article.description}</p>
      <h4>Source: {article.source && article.source.name}</h4>
      <h5>Author:{article.author}</h5>
      <h5>Published at: {article.publishedAt}</h5>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className='article-url1'>
        {article.url}
      </a>
          </div>
  );
};

export default NewsItem;
