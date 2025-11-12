import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/Auth";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:2000/api/v1/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {

                toast.error(`❌ ${result.message || "Login failed"}`, {
                    position: "top-center",
                    autoClose: 2000,
                });
                return;
            }

            // ✅ Success case
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: result.data,
                token: result.data.token,
                role: result.data.role,
            });

            toast.success("🎉 Login successfully!", {
                autoClose: 500,
                position: "top-center",
            });

            setTimeout(() => navigate("/"));


        } catch (error) {

            console.error("Error connecting to server:", error);
            toast.error("⚠️ Unable to connect to the server. Please try again later.", {
                autoClose: 500,
                position: "top-center",
            });
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #4C6EF5, #82C0FF)",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "25px",
                        color: "#4C6EF5",
                    }}
                >
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ fontWeight: "bold" }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontWeight: "bold" }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#4C6EF5",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#3B5BDB")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#4C6EF5")}
                    >
                        Login
                    </button>
                </form>
               

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "15px",
                        fontSize: "14px",
                        color: "#555",
                    }}
                >
                    Do not have an Account?{" "}
                    <span
                        style={{ color: "#4C6EF5", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};


const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    marginTop: "5px",
    fontSize: "14px",
};

export default Login;

