const initialState = {
    menus: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_MENUS":
        return { ...state, menus: action.data };
      case "CREATE_MENU":
        return { ...state, menus: [...state.menus, action.data] };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  