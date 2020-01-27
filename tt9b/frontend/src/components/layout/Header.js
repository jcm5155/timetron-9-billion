import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto">
        <Navbar.Text className="px-4">
          <strong>{user ? `${user.username}` : ""}</strong>
        </Navbar.Text>
        <li className="nav-item">
          <Button variant="outline-secondary" onClick={this.props.logout}>
            Logout
          </Button>
        </li>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto">
        <Nav.Link href="#/register">Register</Nav.Link>
        <Nav.Link href="/#login">Login</Nav.Link>
      </Nav>
    );

    return (
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand href="#">TimeTron 9 Billion</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/stopwatch">Stopwatch</Nav.Link>
            </Nav>
            {isAuthenticated ? authLinks : guestLinks}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
