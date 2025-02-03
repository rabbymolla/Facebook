import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Registration from "./Pages/Registration";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Forgot from "./Pages/Forgot/Forgot";
import Otp from "./Pages/Otp/Otp";
import NotLoginUser from "./PrivateRouter/NotLoginUser";
import LoginUser from "./PrivateRouter/LoginUser";
import RootLayOut from "./components/RootLayOut";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetAllPostQuery } from "./features/api/authApi";
import Profile from "./Pages/Profile";

function App() {
  const { data: posts } = useGetAllPostQuery();

  const theme = useSelector((state) => state.themeMode.mode);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route element={<RootLayOut />}>
            <Route path="/" element={<Home posts={posts} />}></Route>
          </Route>

          <Route path="/profile" element={<Profile posts={posts} />}></Route>
          <Route path="/profile/:userName" element={<Profile />}></Route>
        </Route>
        <Route element={<NotLoginUser />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/otp/:email" element={<Otp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
        </Route>
      </Route>
    )
  );

  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
