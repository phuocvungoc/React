import React from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";

function RenderImg({ staff }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg src={staff.image} alt={staff.name} />
      </Card>
    </div>
  );
}

function RenderDetails({ staff }) {
  return (
    <div className="col-12 col-md-5 m-1">
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
  );
}

const RenderStaff = (props) => {
  if (props.staff) {
    return (
      <Card className="m-2">
        <div className="row">
          <RenderImg staff={props.staff} />
          <RenderDetails staff={props.staff} />
        </div>
      </Card>
    );
  } else return <div></div>;
};

export default RenderStaff;
