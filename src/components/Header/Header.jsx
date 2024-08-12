import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../../appwrite/auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Updated import for the icons

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // const userRole = useSelector((state) => state.auth.role); // Assuming you store the role in Redux state
  const navigate = useNavigate();
  // console.log("Testing" + userRole);
  const [userEmail, setUserEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Track mobile menu state

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserEmail(user.email); // Extract and set the email
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUserEmail();
  }, []);

  console.log(" email of this user is " + userEmail);

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
      name: "FAQ",
      slug: "/faq",
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
      active: false,
    },
    {
      name: "Add Application",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Past Applications",
      slug: "/pastApplications",
      active:
        authStatus && `${userEmail}` === "mavs.vidyaadhar.scholar@gmail.com", // Only admin can see this,
    },
    {
      name: "Funds Received",
      slug: "/fundsReceived",
      active:
        authStatus && `${userEmail}` !== "mavs.vidyaadhar.scholar@gmail.com", //only students can see
    },
  ];

  return (
    <header className="py-3 bg-transparent border-none">
      <Container>
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="mr-4 ml-4 mt-2">
            <Link to="/">
              <Logo width="80px" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <div className="px-2 py-1 m-2 bg-blue-500 rounded-3xl">
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
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

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-green-200 z-50 lg:hidden ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-end p-4 mr-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl p-2 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col p-4 text-2xl ">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false); // Close menu after navigation
                    }}
                    className="px-4 py-2 text-left"
                  >
                    {item.name}
                  </button>
                ) : null
              )}
              {authStatus && (
                // <button
                //   // onClick={() => {
                //   //   // Add your logout functionality here
                //   //   setIsOpen(false); // Close menu after logout
                //   // }}
                //   // className="px-4 py-2 text-left"
                // >

                // </button>
                <div className="text-left bg-red-200 rounded-xl mr-auto">
                  <LogoutBtn />
                </div>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
