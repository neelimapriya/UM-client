import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import image from '../../assets/noData.png'
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const AllUser = () => {
  const axiosPublic = useAxiosPublic();
  const {user}=useAuth()
  const currentUser=user;
  const location = useLocation();
    const [search, setSearch]=useState('')
    const [sortBy, setSortBy]=useState('')

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search.value;

    setSearch(searchText);
    
  };
  const handleSortChange=(e)=>{
    const value=e.target.value;
    setSortBy(value)
    console.log(value)

  }
  console.log(sortBy)


  const { data:users = [], isPending:loading, refetch }=useQuery({
    queryKey:['user', axiosPublic,search,sortBy],
    queryFn:async()=>{
      const res =await axiosPublic.get(`/getUser?search=${search}&sortBy=${sortBy}`)
      return res.data
    }
    
  })
  console.log(users)

  const handleDeleteUser=(user)=>{
    if(!currentUser){
      <Navigate to="/login" state={{ from: location }} replace></Navigate>;
    }
    console.log('/deleteUser/:id',user)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/deleteUser/${user?._id}`).then((res) => {
          // console.log(res.data)
          if (res.data.deletedCount > 0) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: `${user?.name} deleted`,
              icon: "success",
            });
           
          }
        });
      }
    });
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold font-serif text-center my-3">All User</h2>

      <div className=" flex flex-col md:flex-row gap-2 justify-center items-center text-center text-xl font-serif mb-10">
        
      <form
        onSubmit={handleSearch}
        className=" flex  justify-center items-center "
      >
        <input
          className="text-black  outline md:py-2 rounded"
          type="text"
          name="search"
          placeholder="Name, Email, Mobile"
        />
        <input
          className="font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 md:p-2 rounded-lg btn  md:px-3 "
          type="submit"
          value="search"
        />
      </form>
      <label className="bg-pink-500 md:p-3  rounded-lg flex justify-center items-center">
        Sort by:
        <select
         className=" text-black px-2 rounded-lg bg-pink-500 text-center" 
         value={sortBy} onChange={handleSortChange}
         >
          <option value="">Select An Option</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="LastInserted">Last Inserted</option>
          <option value="LastModified">Last Modified</option>
        </select>
      </label>
      </div>
      <div>
        {
          users?.length == 0 && <img className="w-1/3 mx-auto" src={image} alt="" />
        }
      </div>

      <div>
        {
          loading ? (
            <div className="flex justify-center items-center text-center">
               <ClipLoader
        
        loading={loading}
        
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
             </div>
          ):(
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 justify-center items-center">
        {users?.map((user) => (
          <div key={user._id} className="card  bg-gradient-to-r from-pink-300 to-blue-300   ">
          
            <div className="card-body grid justify-center font-serif">
              <h2 className="card-title text-xl md:text-2xl uppercase ">{user?.name}</h2>
              <p className="text-base  md:text-xl flex items-center gap-2"><IoMdMail></IoMdMail> {user?.email}</p>
             <p className="flex items-center gap-2 text-base"><FaPhoneAlt /> {user?.phone}</p>
             <div className="flex justify-around mt-2">
              <MdDelete className="cursor-pointer" onClick={()=>handleDeleteUser(user)} size={30}></MdDelete>
              <Link to={`/updateUser/${user?._id}`}>
              <MdEdit className="cursor-pointer" size={30}></MdEdit></Link>
             </div>
            </div>
          </div>
        ))}
      </div>
          )
        }
      </div>
    </div>
  );
};

export default AllUser;
