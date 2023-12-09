import React from 'react';


const NewsItem = ({ article }) => {
  const { title, description, url, publishedAt,source,author} = article;

  return (
    <div>
      <h2>Source:{source.name}</h2>
      <h2>{title}</h2>
      <h3>author:{author}</h3>
      <p>{description}</p>
      <p>Published at: {publishedAt}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      <hr />
    </div>
  );
};

export default NewsItem;
