import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Loading } from "./Loading";
import { Link } from "react-router-dom";

// Hàm hiển thị phòng ban
function RenderPB({ department }) {
  return (
    <Card>
      <CardBody className="border border-success rounded">
        <CardTitle>{department.name}</CardTitle>
        <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
      </CardBody>
    </Card>
  );
}

// Hiển thị phòng ban
const PhongBan = (props) => {
  if (props.dept.isLoading) {
    return (
      <div className="container ">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dept.errMess) {
    return (
      <div className="container">
        <div className="row mt-2">
          <h3 style={{ color: "red" }}>{props.dept.errMess}</h3>
        </div>
      </div>
    );
  } else {
    const phongBanList = props.dept.dept.map((department) => {
      return (
        <div className="col-12 col-lg-4 col-md-6 mt-3" key={department.id}>
          <Link className="css-link-dept" to={`/phongban/${department.name}`}>
            <RenderPB department={department} />
          </Link>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{phongBanList}</div>
      </div>
    );
  }
};

export default PhongBan;
