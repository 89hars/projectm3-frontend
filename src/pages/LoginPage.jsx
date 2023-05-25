import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import Layouts from "../components/Layouts";

const LoginPage = () => {
  const { initSessionContext } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
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
      <div className="container my-5">
        <h1 className="text-center mb-4">Login page</h1>
        <div className="d-flex justify-content-center align-items-center">
          <div className="card shadow border-0 " style={{ width: 400 }}>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <label className="text-secondary small mb-2">Email</label>
                <input
                  placeholder="Enter you email"
                  className="form-control"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <label className="text-secondary small mb-2 mt-2">
                  Password
                </label>
                <input
                  placeholder="Enter a password"
                  className="form-control"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit" className="btn btn-primary mt-4 w-100">
                  Log In
                </button>
                <div className="mt-3 small text-secondary">
                  You don't have an account? <Link to="/signup">Click here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default LoginPage;
