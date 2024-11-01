import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { useAuth } from "../context/auth";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../context/cart";
import api from "../const.js";

const Header = () => {
  const [auth, setauth] = useAuth();
  const [value, setvalue] = useSearch();
  const categories = useCategory();
  const navigate = useNavigate();
  const [cart , setcart] = useCart();

  // handle submit
  console.log(categories);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch(
        `${api}/api/v1/product/search/${value.keyword}`
      );
      console.log(response);
      if (response.ok) {
        response = await response.json();
        console.log(response);
        if (response.success) {
          setvalue({ ...value, result: response.products });
          navigate("/search");
        } else {
          console.log("Got error during searching , success : false");
          toast.error("Got error during searching , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleLogout = () => {
    const data = localStorage.getItem("auth");
    if (data) {
      setauth({
        ...auth,
        user: null,
        token: "",
      });
    }
    setcart([]);

    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <FaShopify /> Ecommerce App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <button
                    type="button"
                    class="btn btn-primary position-relative"
                  >
                    Cart
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.length}+
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name || "User"}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="#">
                      {!auth.user ? (
                        <>
                          <li className="nav-item">
                            <NavLink
                              className="nav-link"
                              to="/register"
                              style={{ color: "white" }}
                            >
                              Register
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              className="nav-link"
                              to="/login"
                              style={{ color: "white" }}
                            >
                              Login
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="nav-item">
                            <NavLink
                              className="nav-link"
                              to="/dashboard"
                              style={{ color: "white" }}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              className="nav-link"
                              onClick={handleLogout}
                              to="/login"
                              style={{ color: "white" }}
                            >
                              Logout
                            </NavLink>
                          </li>
                        </>
                      )}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="btn-group m-1">
              <button
                type="button"
                className="btn btn-success dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </button>
              <ul className="dropdown-menu">
                {categories?.map((category) => (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/category/${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value.keyword}
                onChange={(e) =>
                  setvalue({ ...value, keyword: e.target.value })
                }
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
