import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columDefault: "col-12 col-md-6 col-lg-4 mt-3",
    };
  }

  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className={this.state.columDefault} key={staff.id}>
          <Card>
            <CardBody>
              <CardImg src={staff.image} alt={staff.name} />
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });

    return <div className="row">{staffList}</div>;
  }
}

export default StaffList;
