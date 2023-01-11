import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHero,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.filters,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        console.log("render");
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );

  const filteredHeroes = useSelector(filteredHeroesSelector);

  const { heroes, heroesLoadingStatus } = useSelector((state) => state.heroes);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    console.log(id);

    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then((answ) => {
        console.log(answ);
        dispatch(deleteHero(id));
      })
      .then((resp) => console.log(`Error ${resp}`));
  };

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem onDelete={onDelete} id={id} key={id} {...props} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
