const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "HERO_CREATED":
      let newHeroList = [...state.heroes, action.payload];
      return {
        ...state,
        newHeroList,
      };
    case "DELETING_HERO":
      const index = state.heroes.findIndex((hero) => hero.id === action.payload);

      const before = state.heroes.slice(0, index);
      const after = state.heroes.slice(index + 1);
      const newArr = [...before, ...after];
      return {
        ...state,
        heroes: newArr,
      };
    default:
      return state;
  }
};

export default reducer;
