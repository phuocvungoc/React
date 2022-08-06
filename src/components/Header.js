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
    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  handleSubmitClick = () => {
    this.props.onSearch(this.search.value);
    this.search.value = "";
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
                    onClick={this.handleSubmitClick}
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
                innerRef={(input) => (this.search = input)}
              />
              <Button
                className="btn btn-primary"
                onClick={this.handleSubmitClick}
              >
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
