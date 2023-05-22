import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const LoginPage = () => {
  const { setToken } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5005/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      const responseToken = await response.json()
      setToken(responseToken);
      navigate('/')
    }
  };

  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In </button>
      </form>
    </div>
  );
};

export default LoginPage;
