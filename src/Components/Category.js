import React, { useState } from "react";
import { useHistory } from "react-router";
import Constant from "../Constants/Constant";

function Category({ category }) {
  const [selectedCategory, setselectedCategory] = useState(category);
  const history = useHistory();

  const changeCategory = (category) => {
    setselectedCategory(category);
    history.push(category);
  };
  return (
    <div className="d-flex justify-content-around flex-wrap category__filter">
      {Constant.CATEGORY.map((Category) => {
        return (
          <div
            className={
              Category === selectedCategory ? "Category active" : "Category"
            }
            onClick={() => changeCategory(Category)}
          >
            {Category}
          </div>
        );
      })}
    </div>
  );
}

export default Category;
