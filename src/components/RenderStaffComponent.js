import React from "react";
import {
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Button,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function RenderDetails({ staff }) {
  return (
    <div className="row">
      <div className="col-12 col-lg-5 col-sm-5 m-1">
        <CardImg src={staff.image} alt={staff.name} />
      </div>
      <div className="col-12 col-lg-6 col-sm-6 m-1">
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
      <div className="container">
        <ButtonGroup className="mt-3 success">
          <Button>
            <Link to="/nhanvien">Nhân viên</Link>
          </Button>
          <Button>{props.staff.name}</Button>
        </ButtonGroup>

        <div className="row border border-success rounded mt-3 mb-2">
          <div className="col-lg-8 col-sm-10">
            <RenderDetails staff={props.staff} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default RenderStaff;
