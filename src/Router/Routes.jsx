import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Home/Home";
import ErrorPage from "../Components/ErrrorPage/ErrorPage";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AddUser from "../Components/AddUser/AddUser";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<ErrorPage></ErrorPage>  ,
      children:[
        {
            path:'/',
            element:<Home></Home>,

        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/login',
          element:<Login></Login>,

        },
        {
          path:'/addUser',
          element:<AddUser></AddUser>
        }
      ]
    },
  ]);