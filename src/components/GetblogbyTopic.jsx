import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { BASE_URL } from "../utils/config";

const GetblogbyTopic = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchBlogs();
    }, [topic]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${BASE_URL}/blogs/getblogbytopic/${topic}`);
            const { data } = await response.json();
            setBlogs(data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading blogs...</div>;
    }

    if (blogs.length === 0) {
        return <div className="text-center mt-5">No blogs found for this topic.</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Blogs on "{topic}"</h2>

            {blogs.map((blog) => (
                <div key={blog._id} className="card mb-4 shadow-sm p-3">
                    <h4 className="fw-bold mb-2">{blog.title}</h4>
                    <h6 className="text-muted mb-3">By: {blog.user?.name || "Unknown Author"}</h6>

                    {blog.image ? (
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="img-fluid rounded mb-3"
                        />
                    ) : (
                        <p className="text-muted">No image available</p>
                    )}

                    <p className="lead">{blog.content}</p>

                    {user && user._id === blog.user?.id && (
                        <button
                            onClick={() => navigate(`/editblog/${blog._id}`)}
                            className="btn btn-primary mt-3"
                        >
                            ✏️ Edit Blog
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default GetblogbyTopic;
