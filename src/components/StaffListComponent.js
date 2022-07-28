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

    this.handleStaffSelected = this.handleStaffSelected.bind(this);
    this.handleColSelected = this.handleColSelected.bind(this);
  }

  handleStaffSelected(staff) {
    this.setState({ staffSelected: staff });
  }

  handleColSelected(col) {
    this.setState({ columDefault: col });
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
      <div className="container">
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
