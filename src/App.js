import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Categories from "./components/Categories";
import Users from "./components/Users";
import Review from "./components/Review";
import { useState } from "react";
import SignUp from "./components/SignUp";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/users"
          element={<Users users={users} setUsers={setUsers} />}
        />
        <Route path="/user/sign-up" element={<SignUp users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
