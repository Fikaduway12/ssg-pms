import { useState, useContext } from "react";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      // store token + user
      localStorage.setItem("token", data.access);
      localStorage.setItem("user", JSON.stringify(data));

      login(data);

      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <h2>SSG-PMS Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}