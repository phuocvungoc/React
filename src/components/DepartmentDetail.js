import React from "react";
import { Card, CardImg, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

function DepartmentDetail(props) {
  const departmentDetail = props.staff.map((staff) => {
    return (
      <div className="col-6 col-md-4 col-lg-2 mt-3" key={staff.id}>
        <Card className="border border-success rounded">
          <CardBody className="p-0">
            <Link to={`/nhanvien/${staff.id}`}>
              <CardImg src={staff.image} alt={staff.name} />
            </Link>
            <CardText className="text-center mt-4">{staff.name}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{departmentDetail}</div>
    </div>
  );
}

export default DepartmentDetail;
