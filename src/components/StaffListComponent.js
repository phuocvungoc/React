import React from "react";
import { Card, CardImg, CardText, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function RenderListStaff({ staff }) {
  return (
    <Card>
      <CardBody className="border border-success rounded">
        <Link to={`/nhanvien/${staff.id}`}>
          <CardImg className="rounded" src={staff.image} alt={staff.name} />
        </Link>
        <CardText className="text-center mt-4">{staff.name}</CardText>
      </CardBody>
    </Card>
  );
}

const StaffList = (props) => {
  const staffList = props.staffs.map((staff) => {
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-2 mt-3" key={staff.id}>
        <RenderListStaff staff={staff} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{staffList}</div>
    </div>
  );
};

export default StaffList;
