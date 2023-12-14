import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';

const AllUser = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState();
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


  useEffect(() => {
    axiosPublic(`/getUser?search=${search}&sortBy=${sortBy}`).then((data) => setUsers(data.data));
  }, [axiosPublic,search,sortBy]);
  console.log(users);


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
        </select>
      </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 justify-center items-center">
        {users?.map((user) => (
          <div key={user._id} className="card  bg-gradient-to-r from-pink-300 to-blue-300   ">
          
            <div className="card-body grid justify-center font-serif">
              <h2 className="card-title text-xl md:text-2xl uppercase ">{user?.name}</h2>
              <p className="text-base  md:text-xl flex items-center gap-2"><IoMdMail></IoMdMail> {user?.email}</p>
             <p className="flex items-center gap-2 text-base"><FaPhoneAlt /> {user?.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
