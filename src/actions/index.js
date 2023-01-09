export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const createHero = (hero) => {
  return {
    type: "HERO_CREATED",
    payload: hero,
  };
};

export const deleteHero = (id) => {
  return {
    type: "DELETING_HERO",
    payload: id,
  };
};
