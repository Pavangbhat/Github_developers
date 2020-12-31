import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  NavbarBrand,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const Context = React.useContext(UserContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const navToggler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Navbar className="text-white " color="danger" light expand="md" >
      <NavbarBrand>
        <Link to="/" className="text-white">
          Github React App
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={navToggler} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="ml-auto" navbar>
          {Context.user ? (
            <>
              <NavItem>
                <NavLink className="text-white" tag={Link} onClick={()=>{
                  Context.setUser(null)
                 toast("Logout successful",{
                    type:"info",
                  }) 
                  return(
                    <Redirect to="/Signin"/>
                  )
                }}>
                  Logout
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink className="text-white" tag={Link} to="/Signin">
                  Signin
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" tag={Link} to="/Signup">
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
