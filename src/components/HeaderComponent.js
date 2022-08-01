import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      isNavOpen: false,
      keyword: "",
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
    this.setState({
      keyword: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                className="rounded-circle"
                src="assets/images/logo2.png"
                height="40"
                width="40"
                alt="Phước"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink
                    className="nav-link"
                    to="/nhanvien"
                    onClick={this.onSearch}
                  >
                    <span className="fa fa-users" aria-hidden="true"></span>{" "}
                    Nhân viên
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/phongban">
                    <span className="fa fa-id-card" aria-hidden="true"></span>{" "}
                    Phòng ban
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/bangluong">
                    <span className="fa fa-money" aria-hidden="true"></span>{" "}
                    Bảng lương
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <InputGroup>
              <Input
                placeholder="Search..."
                value={this.state.keyword}
                onChange={(event) => this.handleChange(event)}
              />
              <Button className="btn btn-primary" onClick={this.onSearch}>
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </InputGroup>
          </div>
        </Navbar>
      </div>
    );
  }
}

// Dispatch vào Redux để xử lí dữ liệu người dùng nhập search
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearch: (keyword) => dispatch({ type: "ADD_INPUT", payload: keyword }),
  };
};

export default connect(null, mapDispatchToProps)(Header);
