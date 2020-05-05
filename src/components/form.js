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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
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

  handleModal() {
    this.setState({ modal: false });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className={styles.root}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="textarea"
              name="message"
              id="message"
              placeholder="Message"
              onChange={this.handleChange}
            />
          </FormGroup>
          <div className={styles.send}>
            <Button onClick={this.handleSubmit}>Send</Button>
          </div>
        </Form>
        <Modal isOpen={this.state.modal} toggle={this.handleModal} className={styles.modal}>
          <ModalHeader className={styles.header}>Success</ModalHeader>
          <ModalBody className={styles.title}>Thank you!</ModalBody>
          <ModalBody className={styles.body}>Your message has been received. I will get back to you with a response within 24 hours.</ModalBody>
          <ModalFooter className={styles.footer}>
            <Button onClick={this.handleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
