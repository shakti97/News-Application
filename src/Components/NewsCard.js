import React from "react";

function NewsCard({ title, urlToImage, url, author, publishedAt }) {
  return (
    <div className="newsCard pointer">
      <div onClick={() => window.open(url, "_blank")}>
        <img className="card-img-top" src={urlToImage} alt="News" />
        <div className="card-body pl-1 pr-1">
          <h5 className="card-title text-truncate">{title}</h5>
          <div className="card-text row">
            <div className="col-md-6">
              <div>Author</div>
              <div className="text-truncate">{author}</div>
            </div>
            <div className="col-md-6 text-end">
              <div>Date</div>
              <div className="text-truncate">{publishedAt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
