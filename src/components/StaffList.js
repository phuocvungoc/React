import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Input,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  FormFeedback,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: "",
      overTime: "",
      image: "/assets/images/ngoctrinh.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        annualLeave: false,
        overTime: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    console.log(target);
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    var dataStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: "/assets/images/ngoctrinh.png",
    };
    var checkForm =
      this.state.touched.name &&
      this.state.touched.doB &&
      this.state.touched.salaryScale &&
      this.state.touched.startDate &&
      this.state.touched.annualLeave &&
      this.state.touched.overTime;
    if (checkForm) {
      this.props.onStaffChange(dataStaff);
    } else {
      alert("Dữ liệu không đầy đủ, vui lòng nhập lại");
    }
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(name, doB, salaryScale, startDate, annualLeave, overTime) {
    const errors = {
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      annualLeave: "",
      overTime: "",
    };

    if (this.state.touched.name && name.length < 3)
      errors.name = "Họ Tên phải nhiều hơn 3 ký tự";

    if (this.state.touched.doB && doB.length < 1)
      errors.doB = "Vui lòng chọn ngày sinh";

    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Vui lòng chọn ngày vào công ty";

    if (this.state.touched.salaryScale && salaryScale < 0)
      errors.salaryScale = "Vui lòng nhập hệ số lương hợp lệ";

    if (this.state.touched.annualLeave && annualLeave < 0)
      errors.annualLeave = "Vui lòng nhập ngày phép còn lại hợp lệ";

    if (this.state.touched.overTime && overTime < 0)
      errors.overTime = "Vui lòng nhập số giờ tăng ca hợp lệ";
    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.salaryScale,
      this.state.startDate,
      this.state.annualLeave,
      this.state.overTime
    );
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-6 col-md-4 col-lg-2 mt-3" key={staff.id}>
          <Card>
            <CardBody className="border border-success rounded">
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
        <Button className="mt-3 ml-0" onClick={this.toggleModal}>
          Thêm Nhân Viên
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Thêm Nhân Viên Mới</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup className="row">
                <Label htmlFor="name" className="col-5">
                  Họ và Tên
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  valid={errors.name === ""}
                  invalid={errors.name !== ""}
                  onBlur={this.handleBlur("name")}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="doB" className="col-5">
                  Ngày sinh
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="date"
                  id="doB"
                  name="doB"
                  max="2022-08-06"
                  value={this.state.doB}
                  onChange={this.handleInputChange}
                  valid={errors.doB === ""}
                  invalid={errors.doB !== ""}
                  onBlur={this.handleBlur("doB")}
                />
                <FormFeedback>{errors.doB}</FormFeedback>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="startDate" className="col-5">
                  Ngày vào công ty
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.handleInputChange}
                  valid={errors.startDate === ""}
                  invalid={errors.startDate !== ""}
                  onBlur={this.handleBlur("startDate")}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="department" className="col-5">
                  Phòng Ban
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="select"
                  id="department"
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur("department")}
                >
                  <option>Sale</option>
                  <option>HR</option>
                  <option>Marketing</option>
                  <option>IT</option>
                  <option>Finance</option>
                </Input>
                <FormFeedback>{errors.department}</FormFeedback>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="salaryScale" className="col-5">
                  Hệ số lương
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="salaryScale"
                  id="salaryScale"
                  name="salaryScale"
                  value={this.state.salaryScale}
                  onChange={this.handleInputChange}
                  valid={errors.salaryScale === ""}
                  invalid={errors.salaryScale !== ""}
                  onBlur={this.handleBlur("salaryScale")}
                />
                <FormFeedback>{errors.salaryScale}</FormFeedback>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="annualLeave" className="col-5">
                  Số ngày nghỉ còn lại
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="annualLeave"
                  id="annualLeave"
                  name="annualLeave"
                  value={this.state.annualLeave}
                  onChange={this.handleInputChange}
                  valid={errors.annualLeave === ""}
                  invalid={errors.annualLeave !== ""}
                  onBlur={this.handleBlur("annualLeave")}
                />
                <FormFeedback>{errors.annualLeave}</FormFeedback>
              </FormGroup>
              <FormGroup className="row">
                <Label htmlFor="overTime" className="col-5">
                  Số giờ tăng ca
                </Label>
                <Input
                  className="col-6 ml-3"
                  type="overTime"
                  id="overTime"
                  name="overTime"
                  value={this.state.overTime}
                  onChange={this.handleInputChange}
                  valid={errors.overTime === ""}
                  invalid={errors.overTime !== ""}
                  onBlur={this.handleBlur("overTime")}
                />
                <FormFeedback>{errors.overTime}</FormFeedback>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Thêm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default StaffList;
