import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " +
              response.status +
              ": " +
              response.statusText +
              ". Please try again later"
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message + ". Please try again later");
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(staffsSuccess(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const staffsSuccess = (staffs) => ({
  type: ActionTypes.STAFFS,
  payload: staffs,
});

export const fetchDept = () => (dispatch) => {
  dispatch(deptLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " +
              response.status +
              ": " +
              response.statusText +
              ". Please try again later"
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message + ". Please try again later");
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dept) => dispatch(deptSuccess(dept)))
    .catch((error) => dispatch(deptFailed(error.message)));
};

export const deptLoading = () => ({
  type: ActionTypes.DEPTS_LOADING,
});

export const deptFailed = (errmess) => ({
  type: ActionTypes.DEPTS_FAILED,
  payload: errmess,
});

export const deptSuccess = (dept) => ({
  type: ActionTypes.DEPTS,
  payload: dept,
});

export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " +
              response.status +
              ": " +
              response.statusText +
              ". Please try again later"
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message + ". Please try again later");
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(salarySuccess(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const salarySuccess = (salary) => ({
  type: ActionTypes.SALARY,
  payload: salary,
});
