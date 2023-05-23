import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import Layouts from "../components/Layouts";

const LoginPage = () => {
  const { initSessionContext } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("${import.meta.env.VITE_BASE_API_URL}/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      const { token, user } = await response.json();
      initSessionContext(token, user);
      navigate("/");
    }
  };

  return (
    <Layouts>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <form onSubmit={handleSubmit} style={{ width: 360 }}>
          <h1>Login page</h1>
          <label className="text-secondary">Email</label>
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

          <button type="submit" className="btn btn-primary mt-4">Log In </button>
        </form>
      </div>
    </Layouts>
  );
};

export default LoginPage;
