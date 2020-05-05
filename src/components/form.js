import React from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import styles from "./form.module.css";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      email: "",
      modal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  handleValidSubmit() {
    const form = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    };
    axios
      .post(
        "https://8rrwf7ige7.execute-api.ca-central-1.amazonaws.com/email",
        form
      )
      .then((res) => {
        console.log("Email Sent Successfully!");
        this.setState({ modal: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInvalidSubmit() {
    return;
  }

  handleModal() {
    this.setState({ modal: false });
  }

  render() {
    return (
      <div>
        <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} className={styles.root}>
          <AvGroup>
            <AvField
              type="text"
              name="name"
              id="name"
              label="Full Name"
              placeholder="Your name"
              onChange={this.handleChange}
              required
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="email"
              name="email"
              id="email"
              label="Email Address"
              placeholder="Your email"
              onChange={this.handleChange}
              required
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="textarea"
              name="message"
              id="message"
              label="Message"
              placeholder="Message"
              onChange={this.handleChange}
              required
            />
          </AvGroup>
          <div className={styles.send}>
            <Button onClick={this.handleSubmit}>Send</Button>
          </div>
        </AvForm>
        <Modal
          isOpen={this.state.modal}
          toggle={this.handleModal}
          className={styles.modal}
        >
          <ModalHeader className={styles.header}>Success</ModalHeader>
          <ModalBody className={styles.title}>Thank you!</ModalBody>
          <ModalBody className={styles.body}>
            Your message has been received. I will get back to you with a
            response within 24 hours.
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button onClick={this.handleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
