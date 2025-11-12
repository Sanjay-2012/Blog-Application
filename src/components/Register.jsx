import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        ProfilePic: ""
    });

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
            const response = await fetch("http://localhost:2000/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("🎉 Registered successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    onClose: () => navigate("/login"), // redirect after toast closes
                });
            } else {
                toast.error(`❌ ${data.message || "Registration failed"}`, {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
            alert("⚠️ Error connecting to server!");
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
                    Create Account
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ fontWeight: "bold" }}>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

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

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ fontWeight: "bold" }}>Phone Number</label>
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Enter phone number"
                            value={formData.phonenumber}
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

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontWeight: "bold" }}>ProfilePic</label>
                        <input
                            type="text"
                            name="ProfilePic"
                            placeholder="Enter ProfilePic"
                            value={formData.ProfilePic}
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
                        Register
                    </button>
                </form>
                <ToastContainer />
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "15px",
                        fontSize: "14px",
                        color: "#555",
                    }}
                >
                    Already have an account?{" "}
                    <span
                        style={{ color: "#4C6EF5", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
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

export default Register;
