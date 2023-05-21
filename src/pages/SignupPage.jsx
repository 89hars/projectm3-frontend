import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layouts from '../components/Layouts'

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5005/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 201) {
      navigate("/login");
    }
  };

  return (
    <Layouts>
      <h1 className="text-center">Signup </h1>
      <form onSubmit={handleSubmit} className="form-reg">
        <div className="form-reg2">
          <label className="label">
            Email
            <input
              className="input"
              placeholder="Enter you email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="form-reg2">

          <label className="label">
            Password
            <input
              className="input"
              placeholder="Enter a password"
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button className="submit-btn" type="submit">Create your account </button>
      </form>
    </Layouts>
  );
};
export default SignupPage;
