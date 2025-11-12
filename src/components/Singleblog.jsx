import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { BASE_URL, TOKEN } from "../utils/config";
import { toast } from "react-toastify";

const Singleblog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/getsingleblog/${id}`);
      const { data } = await response.json();
      setBlog(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  // ✅ DELETE HANDLER
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/blogs/deleteblog/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`, 
        },
      });

      const data = await response.json();
      

      if (response.ok) {
        toast.success("Blog deleted successfully!");
        navigate("/"); 
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Something went wrong while deleting the blog");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading blog...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">{blog.title}</h2>

      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 mb-3 text-center">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          ) : (
            <p className="text-muted">No image available</p>
          )}
        </div>

        <div className="col-lg-6 col-md-12">
          <h5 className="fw-bold mb-2">Topic : {blog.topic}</h5>
          <h5 className="fw-bold mb-2">Author : {blog.user?.name || "Unknown Author"}</h5>
          <p className="lead">{blog.content}</p>

          {user && user._id === blog.user?.id && (
            <>
              <button
                onClick={() => navigate(`/editblog/${blog._id}`)}
                className="btn btn-primary m-2"
              >
                ✏️ Edit Blog
              </button>
              <button onClick={handleDelete} className="btn btn-danger m-2">
                🗑️ Delete Blog
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Singleblog;
