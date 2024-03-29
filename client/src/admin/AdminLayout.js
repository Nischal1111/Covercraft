import { Link,  Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContex";
import "./admin.css"

export default function AdminLayout() {
  const url = "http://localhost:4000";
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");
  const {userInfo} = useContext(UserContext)
  const {setUserInfo} = useContext(UserContext)

  const userInfoLS = JSON.parse(localStorage.getItem("userInfo"))

  const firstName = userInfoLS.firstName;
  const lastName = userInfoLS.lastName;
  const image = userInfoLS.photo;



  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const logoutHandler = async() => {
    const confirm = window.confirm("Are you sure you want to logout?")
    if(confirm){
        try {
            const response = await axios.post(`${url}/logout`)
            if(response.status === 200){
                console.log("Logout Successful")
                setUserInfo(null)
                //clearing local storage (user data)
                localStorage.removeItem("userInfo")
                navigate('/')
            }else{
                console.log("Logout Failed")
            }

        } catch (error) {
            console.log("Error while logout : ",error)
        }
    }
}

  const handleLinkClick = (path) => {
    setCurrentPath(path);
    navigate(path);
  };


  return (
    <div className="flex">
      {/* for the sidebar */}
      <div className="admin-bar flex flex-col z-50">
        <h1 className="panel-name">Admin Panel</h1>

        <div className="mt-3 mb-3">
          <img src={url+'/'+image} alt="profile" className="w-20 h-20 rounded-full object-cover ml-10" />
          <h1 className="text-2xl font-bold">
            {firstName} {lastName}
          </h1>
        </div>
        <div className="admin-page text-2xl">
          <Link to={'/'}>Home</Link>
        </div>

        <Link
          to={`/admin/dashboard`}
          className={`admin-page text-2xl text-black ${
            currentPath === "/admin/dashboard" && "admin-path"
          }`}
          onClick={() => handleLinkClick("/admin/dashboard")}
        >
          Dashboard
        </Link>
        <Link
          to={`/admin/users`}
          className={`admin-page text-2xl mt-2 text-black ${
            currentPath === "/admin/users" && "admin-path"
          }`}
          onClick={() => handleLinkClick("/admin/users")}
        >
          Users
        </Link>
        <Link
          to={`/admin/products`}
          className={`admin-page text-2xl mt-2 text-black ${
            currentPath === "/admin/products" && "admin-path"
          }`}
          onClick={() => handleLinkClick("/admin/products")}
        >
          Products
        </Link>
        <Link
          to={`/admin/add-products`}
          className={`admin-page text-2xl mt-2 text-black ${
            currentPath === "/admin/add-products" && "admin-path"
          }`}
          onClick={() => handleLinkClick("/admin/add-products")}
        >
          Add Products
        </Link>
        <button
          onClick={logoutHandler}
          className="admin-page flex items-center gap-2 text-2xl mt-5 text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* for the main content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>

    </div>
  );
}
