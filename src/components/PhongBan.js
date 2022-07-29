import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

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

const PhongBan = (props) => {
  const phongBanList = props.departments.map((department) => {
    return (
      <div className="col-12 col-lg-4 col-md-6 mt-3" key={department.id}>
        <RenderPB department={department} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{phongBanList}</div>
    </div>
  );
};

export default PhongBan;
