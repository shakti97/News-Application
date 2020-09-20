import React from "react";
import NewsCard from "./NewsCard";

function Content({ newsList, isSearching, likeNews, hideNews }) {
  if (isSearching) {
    return (
      <div class="d-flex justify-content-center vh-100 align-items-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="row ml-5 mr-5">
      {newsList.map((newsDetail) => {
        return (
          <>
            {!newsDetail.isHidden ? (
              <div className="col-md-3 mt-2 mb-2" key={newsDetail.id}>
                <div className="border pb-2">
                  <div>
                    <NewsCard {...newsDetail} />
                  </div>
                  <div className="d-flex justify-content-around">
                    <i
                      className="fa fa-thumbs-up pointer"
                      onClick={() => likeNews(newsDetail.id)}
                    >
                      {newsDetail.likes}
                    </i>
                    <i
                      className="fa fa-ban pointer"
                      onClick={() => hideNews(newsDetail.id)}
                    ></i>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

export default Content;
