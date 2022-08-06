import { STAFFS, DEPARTMENTS } from "../shared/staffs";

// Khởi tạo initState
let initState = {
  keyword: "",
  staffs: JSON.parse(localStorage.getItem("staffs"))
    ? JSON.parse(localStorage.getItem("staffs"))
    : STAFFS,
  departments: JSON.parse(localStorage.getItem("departments"))
    ? JSON.parse(localStorage.getItem("departments"))
    : DEPARTMENTS,
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

    case "ADD_STAFF":
      // Xử lí staffs
      let newStaff = action.payload;
      state.staffs.push(newStaff);
      localStorage.setItem("staffs", JSON.stringify(state.staffs));
      let staffs = JSON.parse(localStorage.getItem("staffs"));

      // Xử lí departments
      let departmentNew = newStaff.department.name;
      switch (departmentNew) {
        case "Sale":
          state.departments[0].numberOfStaff++;
          break;

        case "HR":
          state.departments[1].numberOfStaff++;
          break;

        case "Marketing":
          state.departments[2].numberOfStaff++;
          break;

        case "IT":
          state.departments[3].numberOfStaff++;
          break;

        case "Finance":
          state.departments[4].numberOfStaff++;
          break;

        default:
          break;
      }
      localStorage.setItem("departments", JSON.stringify(state.departments));
      let departments = JSON.parse(localStorage.getItem("departments"));
      return { ...state, staffs, departments };

    default:
      return state;
  }
};

export default rootReducer;
