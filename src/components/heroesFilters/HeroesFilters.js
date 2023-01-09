import { v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import classNames from "classnames/bind";

const HeroesFilters = () => {
  const { request } = useHttp();
  const [filters, setFilters] = useState();
  useEffect(() => {
    request("http://localhost:3001/filters").then(setFilter);
  }, []);

  const setFilter = (answ) => {
    setFilters(answ);
  };
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters &&
            filters.map((item) => {
              let btnClass = classNames({
                btn: true,
                "btn-danger": item.name === "fire",
                "btn-primary": item.name === "water",
                "btn-success": item.name === "wind",
                "btn-secondary": item.name === "earth",
                "btn-outline-dark": item.name === "all",
              });
              return (
                <button key={uuidv4()} className={btnClass}>
                  {item.label}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
