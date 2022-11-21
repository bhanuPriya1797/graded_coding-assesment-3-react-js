import { Button, Container, Form, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
import { NavLink } from "react-router-dom";
import "../custom css/header.css";
import Moviesection from "./moviesection";



const Header=()=>{
   

   return (

    <Navbar style={{backgroundColor:" rgb(192, 66, 231)"}} expand="lg">
    <Container fluid>
     
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <NavLink   className={(navData)=> navData.isActive ? "active" : "navlink"} to="/movies-coming">Movies in theaters</NavLink>
          <NavLink   className={(navData)=> navData.isActive ? "active" : "navlink"} to="/movies-in-theaters">Coming soon</NavLink>
          <NavLink   className={(navData)=> navData.isActive ? "active" : "navlink"} to="/top-rated-india">Top rated indian</NavLink>
          <NavLink  className={(navData)=> navData.isActive ? "active" : "navlink"} to="/top-rated-movies">Top rated movies</NavLink>
          <NavLink  className={(navData)=> navData.isActive ? "active" : "navlink"}  to="/favourite">Favourites</NavLink>
          
        </Nav>
     
      </Navbar.Collapse>
    </Container>
  </Navbar>

   )
}


export default Header;
