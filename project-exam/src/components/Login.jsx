import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginEvent = useMutation(
    async () => {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("AccName", data.name);

        navigate("/home");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    loginEvent.mutate();
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit} className={styles.formContainer}>
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
          disabled={loginEvent.isLoading}
        >
          {loginEvent.isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      {loginEvent.isError && (
        <div>The email or password was not recognised as a user.</div>
      )}
    </div>
  );
};

export default Login;
