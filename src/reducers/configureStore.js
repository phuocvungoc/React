import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import { Salary } from "./salary";
import { Search } from "./search";

export const Store = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      dept: Departments,
      salary: Salary,
      keyword: Search,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger)
  );
  return store;
};
