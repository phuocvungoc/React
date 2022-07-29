import React from "react";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function RenderListStaff({ staff }) {
  return (
    <Card>
      <CardBody className="border border-success rounded">
        <Link to={`/nhanvien/${staff.id}`}>
          <CardImg className="rounded" src={staff.image} alt={staff.name} />
        </Link>
        <CardTitle className="text-center mt-4">{staff.name}</CardTitle>
      </CardBody>
    </Card>
  );
}

const StaffList = (props) => {
  const staffList = props.staffs.map((staff) => {
    return (
      <div className="col-12 col-md-6 col-lg-3 mt-3" key={staff.id}>
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
