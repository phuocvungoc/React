import React, { Component } from "react";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import RenderStaff from "./RenderStaffComponent";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffSelected: null,
      columDefault: "col-12 col-md-6 col-lg-3 mt-3",
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleStaffSelected = this.handleStaffSelected.bind(this);
  }

  handleStaffSelected(staff) {
    this.setState({ staffSelected: staff });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
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
        <div className="row mt-3 mb-2">
          <div className="col-9">
            <h5>Bấm vào nhân viên để xem thông tin chi tiết</h5>
          </div>
          <div className="col-2 ">
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
              className="ml-5"
            >
              <DropdownToggle caret color="danger">
                Kiểu hiển thị
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>6 cột</DropdownItem>
                <DropdownItem>4 cột</DropdownItem>
                <DropdownItem>3 cột</DropdownItem>
                <DropdownItem>2 cột</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
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
