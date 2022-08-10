import * as ActionTypes from "./ActionTypes";

export const Search = (state = { keyword: "" }, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH:
      let keyword = action.payload;
      return { ...state, keyword };
    default:
      return state;
  }
};
