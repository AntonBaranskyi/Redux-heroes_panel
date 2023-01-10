const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: "all",
  filteredHeroes: [],
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

        filteredHeroes:
          state.filters === "all"
            ? state.heroes
            : state.heroes.filter((item) => item.element === state.filters),
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

        filteredHeroes:
          state.filters === "all"
            ? newHeroList
            : newHeroList.filter((item) => item.element === state.filters),
      };
    case "DELETING_HERO":
      const index = state.heroes.findIndex(
        (hero) => hero.id === action.payload
      );

      const before = state.heroes.slice(0, index);
      const after = state.heroes.slice(index + 1);
      const newArr = [...before, ...after];
      return {
        ...state,
        heroes: newArr,
      };
    case "FILTER_HERO":
      return {
        ...state,
        filters: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((item) => item.element === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
