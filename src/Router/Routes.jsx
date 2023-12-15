import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Home/Home";
import ErrorPage from "../Components/ErrrorPage/ErrorPage";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import AddUser from "../Components/AddUser/AddUser";
import UpdateUser from "../Components/UpdateUser/UpdateUser";
import PrivateRoute from "./PrivateRoute";

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
          element:<PrivateRoute><AddUser></AddUser></PrivateRoute>
        },
        {
          path:'/updateUser/:id',
          element:<PrivateRoute><UpdateUser></UpdateUser></PrivateRoute>,
          loader:({params})=>fetch(`https://user-management-server-taupe.vercel.app/getUser/${params.id}`)
        }
      ]
    },
  ]);