import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layouts from "../components/Layouts";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5005/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName}),
    });

    if (response.status === 201) {
      navigate("/login");
    }
  };

  return (
    <Layouts>
      <h1>Signup </h1>
      <form onSubmit={handleSubmit}>
      <label>
          Firstname
          <input
            placeholder="Enter you firstname"
            type="firstname"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>

        <label>
          Lastname
          <input
            placeholder="Enter you lastname"
            type="lastname"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            placeholder="Enter you email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Password
          <input
            placeholder="Enter a password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Create your account </button>
      </form>

    </Layouts >
  );
};
export default SignupPage;
