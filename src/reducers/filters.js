const initialState = {
  filters: "all",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_HERO":
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default filters;
