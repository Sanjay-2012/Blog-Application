import { useContext , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext);

  const navigate = useNavigate()
  const [topic,setTopic] = useState("");

  const handleSearch = () => {
    if (topic.trim()) {
      navigate(`/getblogbytopic/${topic}`)
       setTopic("");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    try {

      localStorage.removeItem("token");


      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: null,
        token: null,
        role: null,
      });

      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/"));

    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("⚠️ Unable to log out. Try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#4C6EF5",
        padding: "10px 20px",
      }}
    >
      <div className="container-fluid">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-LFUm8H6SU8gMvWN_smN_dqT3ouRK0KWWg&s"
          alt="Logo"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/createblog">
                  Create Blog
                </Link>
              </li>
            )}

            <li className="nav-item d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </li>


          </ul>

          <form className="d-flex">
            <div>
              {user ? (
                <div className="d-flex">

                  <div className="d-flex justify-content-center align-items-center" >
                    <img src={user.ProfilePic} alt="" className="rounded-circle me-2 " width="40px" />
                    <h6 className="m-0">{user.name}</h6>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn"
                    style={{
                      color: "#f20c0cff",
                      backgroundColor: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "500",
                      margin: "5px",
                    }}
                  >
                    LogOut
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn"
                    style={{
                      color: "#4cce4aff",
                      backgroundColor: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "500",
                      margin: "5px",
                    }}
                  >
                    Register
                  </Link>

                  <Link
                    to="/login"
                    className="btn"
                    style={{
                      color: "#4C6EF5",
                      backgroundColor: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontWeight: "500",
                      margin: "5px",
                    }}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
