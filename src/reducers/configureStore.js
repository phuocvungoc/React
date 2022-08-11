import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import { Salary } from "./salary";
import { Search } from "./search";
import { StaffsInDept } from "./staffsInDept";

export const Store = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      dept: Departments,
      salary: Salary,
      keyword: Search,
      staffsInDept: StaffsInDept,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger)
  );
  return store;
};
