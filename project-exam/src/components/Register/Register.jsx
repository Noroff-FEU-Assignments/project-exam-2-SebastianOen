import React, { useState } from "react";
import { useMutation } from "react-query";
import styles from "./Register.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { apiUrl } from "../../Constants/ApiUrl";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerEvent = useMutation(async () => {
    const response = await fetch(`${apiUrl}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response.json();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setEmailError("Please use an email ending with @stud.noroff.no");
      return;
    }

    setEmailError("");
    registerEvent.mutate();
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.textContainer}>
          <label htmlFor="name">Name:</label>
          <Form.Control
            className="mb-3"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.textContainer}>
          <label htmlFor="email">Email:</label>
          <Form.Control
            className="mb-3"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div className={styles.textContainer}>
          <label htmlFor="password">Password:</label>
          <Form.Control
            className="mb-3"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={registerEvent.isLoading}
        >
          {registerEvent.isLoading ? <Spinner animation="grow" /> : "Register"}
        </Button>
      </Form>
      {registerEvent.isError && (
        <div>Unable to register. Please try again.</div>
      )}
      {registerEvent.isSuccess && <div>Thank you for registering</div>}
    </div>
  );
};

export default Register;
