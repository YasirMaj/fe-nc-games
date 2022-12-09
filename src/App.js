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
import Reviews from "./components/Reviews";

function App() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route
          path="/categories"
          element={
            <Categories categories={categories} setCategories={setCategories} />
          }
        />
        <Route path="/categories/:slug" element={<Reviews />} />
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
