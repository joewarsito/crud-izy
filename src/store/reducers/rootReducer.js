const initialState = {
    foods: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_FOODS":
        return { ...state, foods: action.data };
      case "CREATE_FOOD":
        return { ...state, foods: [...state.foods, action.data] };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  