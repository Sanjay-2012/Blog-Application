import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/Auth";
import { TOKEN } from "../utils/config";

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) {
      toast.error("Title is required.", { autoClose: 1500 });
      return false;
    }
    if (!form.content.trim()) {
      toast.error("Content is required.", { autoClose: 1500 });
      return false;
    }  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        content: form.content.trim(),
        image: form.image.trim() || undefined,
      };

      const res = await fetch("http://localhost:2000/api/v1/blogs/createblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization":  `Bearer ${user?.token || localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create blog.", { autoClose: 2000 });
        setLoading(false);
        return;
      }

      toast.success("✅ Blog created successfully!", { autoClose: 1800 });
      setTimeout(() => {
        navigate("/");
      }, 1800);

    } catch (err) {
      console.error("Create blog error:", err);
      toast.error("⚠️ Something went wrong. Try again.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#4C6EF5", textAlign: "center" }}>Create Blog</h2>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            style={inputStyle}
            required
          />


          <label style={labelStyle}>Image  (optional)</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            style={inputStyle}
          />

          <label style={labelStyle}>Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            style={textAreaStyle}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* --- styles --- */
const pageStyle = {
  display: "flex",
  justifyContent: "center",
  padding: "40px 20px",
  background: "linear-gradient(135deg, #f6f9ff, #eef7ff)",
  minHeight: "80vh",
};

const cardStyle = {
  width: "100%",
  maxWidth: "720px",
  background: "#fff",
  padding: "28px",
  borderRadius: "12px",
  boxShadow: "0 6px 25px rgba(36, 59, 85, 0.06)",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginTop: "12px",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const textAreaStyle = {
  width: "100%",
  minHeight: "160px",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  resize: "vertical",
};

const buttonStyle = {
  marginTop: "18px",
  width: "100%",
  padding: "12px",
  backgroundColor: "#4C6EF5",
  color: "#fff",
  fontWeight: 600,
  border: "none",
  borderRadius: "8px",
};

export default CreateBlog;
