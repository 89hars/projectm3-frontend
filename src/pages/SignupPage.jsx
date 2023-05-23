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
    const response = await fetch(`${import.meta.env.VITE_API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (response.status === 201) {
      navigate("/login");
    }
  };

  return (
    <Layouts>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <form onSubmit={handleSubmit} style={{ width: 360 }}>
          <h1>Signup page</h1>
          <label className="text-secondary">Firstname</label>
          <input
            placeholder="Enter you firstname"
            className="form-control"
            type="firstname"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />

          <label className="text-secondary mt-2">Lastname</label>
          <input
            placeholder="Enter you lastname"
            className="form-control"
            type="lastname"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />

          <label className="text-secondary mt-2">Email</label>
          <input
            placeholder="Enter you email"
            className="form-control"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="text-secondary mt-2">Password</label>
          <input
            placeholder="Enter a password"
            className="form-control"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" className="btn btn-primary mt-4">
            Create your account
          </button>
        </form>
      </div>
    </Layouts>
  );
};
export default SignupPage;
