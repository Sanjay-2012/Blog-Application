import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, TOKEN } from "../utils/config";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    title: "",
    topic:"",
    content: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/getsingleblog/${id}`);
      const { data } = await response.json();
      
      setForm({
        title: data.title,
        topic : data.topic,
        content: data.content,
        image: data.image,
      });
    } catch (error) {
      console.error("Error loading blog:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/blogs/editblog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Blog updated successfully!");
        navigate(`/singleblog/${id}`);
      } else {
        toast.error(result.message || "Update failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Edit Blog</h3>

      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Topic</label>
          <input
            type="text"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="form-control"
            rows="6"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
