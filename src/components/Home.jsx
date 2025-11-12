import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config"
import { Link } from "react-router-dom";


const Home = () => {

    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        fetchBlog()
    }, []);

    const fetchBlog = async () => {
        const response = await fetch(`${BASE_URL}/blogs/getallblogs`);
        const { data } = await response.json();
        setblogs(data)
        
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Blogs</h2>

            {blogs && blogs.length > 0 ? (
                <div className="row">
                    {blogs.map((blog, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                            <div className="card h-100 text-center">
                                <img
                                    src={blog.image}
                                    className="card-img-top"
                                    alt={blog.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text text-muted">
                                        {blog.content?.slice(0, 80)}...
                                    </p>
                                        <Link to={`/singleblog/${blog._id}`} className="btn btn-primary">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h5 className="text-center">Loading....!</h5>
            )}
        </div>

    )
}

export default Home
