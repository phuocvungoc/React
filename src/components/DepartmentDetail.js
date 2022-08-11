import React, { Component } from "react";
import { Card, CardImg, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchStaffInDept } from "../reducers/ActionCreators";
import { connect } from "react-redux";

class DepartmentDetail extends Component {
  componentDidMount() {
    this.props.fetchStaffInDept(this.props.deptId);
  }

  render() {
    const departmentDetail =
      this.props.staffs.staffsInDept &&
      this.props.staffs.staffsInDept.map((staff) => {
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
}

const mapStateToProps = (state) => {
  return {
    staffs: state.staffsInDept,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStaffInDept: (deptId) => dispatch(fetchStaffInDept(deptId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDetail);
