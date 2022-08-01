import { STAFFS, DEPARTMENTS } from "../shared/staffs";

// Khởi tạo initState
let initState = {
  keyword: "",
  staffs: STAFFS,
  departments: DEPARTMENTS,
  sort: {
    by: "name",
    value: 1,
  },
};

// Xử lí dữ liệu người dùng gửi
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_INPUT":
      let keyword = action.payload;
      return { ...state, keyword };
    case "SORT":
      let sort = {
        by: action.payload.by,
        value: action.payload.value,
      };
      return { ...state, sort };
    default:
      return state;
  }
};

export default rootReducer;
