import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./header.module.css";
import ContactForm from "./form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Collapse,
  Modal,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleHeader = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  return (
    <div className={styles.root}>
      <Navbar color="" light expand="md">
        <NavbarBrand href="/" className={styles.brand}>
          <h4>James Lee</h4>
        </NavbarBrand>
        <NavbarToggler onClick={toggleHeader} />
        <Collapse isOpen={isOpen} navbar>
          <Router>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/portfolio">Portfolio</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={toggleModal} className={styles.contact}>
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/j584lee98">
                  <FontAwesomeIcon icon={faGithub} />
                </NavLink>
              </NavItem>
            </Nav>
          </Router>
        </Collapse>
      </Navbar>
      <div>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Contact</ModalHeader>
          <ContactForm></ContactForm>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
