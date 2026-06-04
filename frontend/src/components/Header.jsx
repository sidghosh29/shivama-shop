import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    // Implement logout functionality here
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* you don’t use plain Link inside Navbar.Brand because Navbar.Brand is already link-like. You either wrap it with LinkContainer, or tell it to render as React Router’s Link. */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="ProShop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Just using Nav.Link as={Link} to="/cart" instead of 
                LinkContainer to show that it can be done */}
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, item) => {
                      return acc + item.qty;
                    }, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
