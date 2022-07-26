import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import RenderStaff from "./RenderStaffComponent";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffSelected: null,
      columDefault: "col-12 col-md-6 col-lg-3 mt-3",
    };
  }

  handleStaffSelected(staff) {
    this.setState({ staffSelected: staff });
  }

  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className={this.state.columDefault} key={staff.id}>
          <Card
            onClick={() => {
              this.handleStaffSelected(staff);
            }}
          >
            <CardBody className="border border-success rounded">
              <CardImg className="rounded" src={staff.image} alt={staff.name} />
              <CardTitle className="text-center mt-4">{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div>
        <RenderStaff
          staff={this.state.staffSelected}
          handleStaffSelected={this.handleStaffSelected}
        />
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
