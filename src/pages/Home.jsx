import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { Benificeries } from "../components/index";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

//added on demand
import InstructionsPopup from "../components/InstructionsPopup";

function Home() {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // if (posts.length === 0)
  {
    return (
      <>
        <div className="w-full p-8 mx-4 flex flex-wrap items-center justify-center">
          <div className="w-full md:w-1/2 p-4">
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to MAVS Vidya Adhar financial Assistance programm.
              </h2>
              <br />
              <p className="text-xl">
                Education is the passport to the future, for tomorrow belongs to
                those who prepare for it today.
                <br />
                Education is part of the foundation of all progress and growth,
                both as an individual and as a society.
              </p>

              {/* added on demand General Instructions Button */}
              <button
                onClick={handlePopupOpen}
                className="cta-button inline-block bg-green-500 text-white font-semibold my-4 py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 mx-2"
              >
                General Instructions
              </button>
              <Link
                to={authStatus ? "/add-post" : "/login"}
                className="cta-button inline-block bg-blue-500 text-white font-semibold my-4 py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              >
                Apply here
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 flex items-end">
            <img
              src="https://i.pinimg.com/736x/5e/ee/b8/5eeeb8d270ed8eee7e04b635ed382838.jpg"
              alt="image"
              className="w-full md:w-auto"
            />
          </div>
        </div>
         
         {/* added later for public awareness */}
        <div>
          <p className=" text-gray-600">
            &copy; Developed by Ashirwad Katkamwar. All Rights Reserved by MAVS.
          </p>
        </div>

        {/* <Benificeries />  //removed on demand */}
        {/* added on demand Popup Component */}
        <InstructionsPopup show={showPopup} onClose={handlePopupClose} />
      </>
    );
  }
  // return (
  //   <div className="w-full py-8">
  //     <Container>
  //       <div className="flex flex-wrap">
  //         {posts.map((post) => (
  //           <div key={post.$id} className="p-2 w-1/4">
  //             <PostCard {...post} />
  //           </div>
  //         ))}
  //       </div>
  //     </Container>
  //   </div>
  // );
}

export default Home;
