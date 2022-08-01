import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Button,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

// Hàm hiển thị ảnh
function RenderImg({ staff }) {
  return (
    <div className="col-12 col-lg-3 col-md-4 col-sm-12 ">
      <Card>
        <CardImg src={staff.image} alt={staff.name} />
      </Card>
    </div>
  );
}

// Hàm hiển thị thông tin chi tiết nhân viên
function RenderDetails({ staff }) {
  return (
    <div className="col-12 col-lg-9 col-md-8 col-sm-12">
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

// Hiển thị chi tiết nhân viên
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
        <div className="container">
          <div className="row border border-success rounded mt-3">
            <RenderImg staff={props.staff} />
            <RenderDetails staff={props.staff} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default RenderStaff;
