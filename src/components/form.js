import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./form.module.css";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", message: "", email: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  render() {
    return (
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
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}