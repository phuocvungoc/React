import React from "react";
import { CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";

function RenderDetails({ staff }) {
  return (
    <div className="row">
      <div className="col-12 col-md-5 m-1">
        <CardImg src={staff.image} alt={staff.name} />
      </div>
      <div className="col-12 col-md-6 m-1">
        <CardBody>
          <CardTitle>Họ và tên: {staff.name}</CardTitle>
          <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
          <CardText>
            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
          </CardText>
          <CardText>Phòng ban: {staff.department.name}</CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
        </CardBody>
      </div>
    </div>
  );
}

const RenderStaff = (props) => {
  if (props.staff) {
    return (
      <div className="row border border-success rounded mt-3 mb-2">
        <RenderDetails staff={props.staff} />
        <div className="col-12 col-md-5 m-1">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => props.handleStaffSelected(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default RenderStaff;
