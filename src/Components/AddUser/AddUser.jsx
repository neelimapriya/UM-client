import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/UseAxiosPublic";


const AddUser = () => {

    const axiosPublic =useAxiosPublic()
    

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log("added");

    const form = new FormData(e.currentTarget);
    const name = form.get("name").toLowerCase();
    const phone = form.get("phone");
    const email = form.get("email");
  
    console.log(
      name,
      phone,
      email,
      
     
    );

    // save user in database
    const userInfo = {
        name: name,
        email: email,
        phone: phone,
      };
      axiosPublic.post("/addUser", userInfo).then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "User Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          
        }
      });


  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <h2 className="text-3xl font-semibold font-serif flex justify-center text-center pt-32 text-black">
        Add New User
      </h2>

      <div>
        <form onSubmit={handleAddUser} className="card-body w-2/3 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-serif text-xl">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder=" Name"
              className="rounded-lg w-full p-2 border focus border-black"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-serif text-xl">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder=" Email Address*"
              className="rounded-lg w-full p-2 border focus border-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-serif text-xl">
                Mobile Number
              </span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Mobile Number"
              className="rounded-lg w-full p-2 border focus border-black"
            />
          </div>

          <div className="form-control mt-6">
            <button className="text-xl font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
