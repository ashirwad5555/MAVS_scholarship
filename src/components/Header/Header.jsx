import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Application",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Past Applications",
      slug: "/pastApplications",
      active: authStatus,
    },
    {
      name: "Funds Received",
      slug: "/fundsReceived",
      active: authStatus,
    },
  ];

  return (
    <header className=" py-3  bg-transparent border-none">
      <Container>
        <nav className="flex">
          <div className="mr-4 ml-4 mt-2">
            <Link to="/">
              <Logo width="80px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <div className="px-2 py-1 m-2 bg-blue-500 rounded-3xl">
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </div>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <div className="px-2 py-1 m-2 bg-blue-500 rounded-3xl">
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;