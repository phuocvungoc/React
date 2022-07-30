import { STAFFS, DEPARTMENTS } from "../shared/staffs";

let initState = {
  keyword: "",
  staffs: STAFFS,
  departments: DEPARTMENTS,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_INPUT":
      let keyword = action.payload;
      return { ...state, keyword };
    default:
      return state;
  }
};

export default rootReducer;
