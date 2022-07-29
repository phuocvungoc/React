import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Button,
} from "reactstrap";

function RenderBL({ staff }) {
  return (
    <Card>
      <CardBody className="border border-success rounded">
        <CardTitle>{staff.name}</CardTitle>
        <CardText>Mã nhân viên: {staff.id}</CardText>
        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
        <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
        <CardFooter className="text-muted">
          Lương:{" "}
          {Math.round(staff.salaryScale * 3000000 + staff.overTime * 200000)}
        </CardFooter>
      </CardBody>
    </Card>
  );
}

const BangLuong = (props) => {
  const ListBangLuong = props.staffs.map((staff) => {
    return (
      <div className="col-12 col-lg-4 col-md-6 mt-3" key={staff.id}>
        <RenderBL staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="mt-3">
        <Button>Nhân viên</Button>
        <Button className="ml-3">Bảng Lương</Button>
      </div>
      <div className="row">{ListBangLuong}</div>
    </div>
  );
};

export default BangLuong;
