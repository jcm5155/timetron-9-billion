import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

// Navbar with navigation links
export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // Displayed if user is logged in
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

    // Displayed if user is not logged in
    const guestLinks = (
      <Nav className="ml-auto">
        <Nav.Link href="#/register">Register</Nav.Link>
        <Nav.Link href="/#login">Login</Nav.Link>
      </Nav>
    );

    return (
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand href="#">TT9B</Navbar.Brand>
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
