import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Constant from "../Constants/Constant";
import Category from "./Category";
import Content from "./Content";

const createUniqueId = (date) => {
  let tempDate = new Date(date);
  return `${tempDate.getDate()}${tempDate.getMonth()}${tempDate.getFullYear()}${tempDate.getHours()}${tempDate.getMinutes()}${tempDate.getSeconds()}`;
};

const modifyArticle = (articles) => {
  let storedArticles = JSON.parse(localStorage.getItem("articles"));
  let storedArticlesIdArray = [];
  if (storedArticles) {
    storedArticlesIdArray = Object.keys(storedArticles);
  }
  articles = articles.map((article) => {
    let uniqueId = createUniqueId(article.publishedAt);
    article.id = uniqueId;
    article.likes = 0;
    article.isHidden = false;
    if (storedArticlesIdArray.includes(uniqueId)) {
      article.likes = storedArticles[uniqueId].likes;
      article.isHidden = storedArticles[uniqueId].isHidden;
    }
    return article;
  });
  return articles;
};

function NewsBoard() {
  const { category } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setSearching] = useState(false);

  const likeNews = (id) => {
    let storedArticles = JSON.parse(localStorage.getItem("articles"));
    if (storedArticles) {
      if (storedArticles[id]) {
        storedArticles[id].likes = storedArticles[id].likes + 1;
      } else {
        storedArticles = {
          ...storedArticles,
          [id]: { likes: 1 },
        };
      }
    } else {
      storedArticles = {
        [id]: { likes: 1 },
      };
    }

    let index = newsList.findIndex((news) => news.id === id);
    if (index > -1) {
      const updateList = [...newsList];
      updateList[index].likes = updateList[index].likes + 1;
      localStorage.setItem("articles", JSON.stringify(storedArticles));
      setNewsList(updateList);
    }
  };

  const hideNews = (id) => {
    let storedArticles = JSON.parse(localStorage.getItem("articles"));
    if (storedArticles) {
      storedArticles[id].isHidden = true;
    } else {
      storedArticles = {
        [id]: { isHidden: true },
      };
    }
    let index = newsList.findIndex((news) => news.id === id);
    const updateList = [...newsList];
    updateList[index].isHidden = true;
    localStorage.setItem("articles", JSON.stringify(storedArticles));
    setNewsList(updateList);
  };

  const getNews = async (category, page) => {
    setSearching(true);
    let url = `${Constant.BASE_URL}&category=${category}&page=${page}`;
    try {
      let response = await Axios.get(url);
      if (response.Error) {
        return;
      }
      let articles = modifyArticle(response.data.articles);
      console.log(articles);
      setNewsList(articles);
      setSearching(false);
    } catch (err) {
      alert(err.response);
      setSearching(false);
      console.log(err.response);
    }
  };

  useEffect(() => {
    getNews(category, page);
  }, [category, page]);

  return (
    <div>
      <Category category={category} />
      <div className="d-flex justify-content-end">
        <i
          className={
            page > 1
              ? "fa fa-angle-left font-weight-bold p-4 pointer"
              : "fa fa-angle-left font-weight-bold p-4 grey"
          }
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        ></i>
        <i
          className={
            newsList.length === 20
              ? "fa fa-angle-right font-weight-bold p-4 pointer"
              : "fa fa-angle-right grey font-weight-bold p-4"
          }
          onClick={() => {
            if (newsList.length === 20) setPage(page + 1);
          }}
        ></i>
      </div>
      <Content
        newsList={newsList}
        isSearching={isSearching}
        likeNews={likeNews}
        hideNews={hideNews}
      />
    </div>
  );
}

export default NewsBoard;
