import React, { useEffect, useState } from "react";
import { getCatagories } from "../utils/api";
import { Link } from "react-router-dom";

export default function Categories({ categories, setCategories }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getCatagories().then((categoriesFromApi) => {
        setCategories(categoriesFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [setCategories]);

  return (
    <main>
      <h3>Categories List</h3>
      {isLoading ? (
        <h3 id="loading">Loading...</h3>
      ) : (
        <ul className="Categories-list">
          {categories.map((category) => {
            return (
              <li className="category-card" key={category.slug}>
                <Link to={`/categories/${category.slug}`}>
                  <p>{category.slug}</p>
                </Link>
                <p>{category.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
