import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Singleblog from "./Singleblog";
import Register from "./Register";
import Login from "./Login";
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";
import GetblogbyTopic from "./GetblogbyTopic";


const Routing = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Singleblog/:id" element={<Singleblog/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/createblog" element={<CreateBlog/>}/>
       <Route path="/editblog/:id" element = {<EditBlog/>}/>
       <Route path="/getblogbytopic/:topic" element = {<GetblogbyTopic/>}/>
    </Routes>
    </div>
  )
}

export default Routing
