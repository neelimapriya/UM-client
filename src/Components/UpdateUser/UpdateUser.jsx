import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const axiosPublic = useAxiosPublic();
  const user = useLoaderData({});
  console.log(user);
  const { name, email, phone, _id } = user;
  const today = new Date().toISOString();
  console.log(today);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("udated");
    const form = new FormData(e.currentTarget);
    const name = form.get("name").toLowerCase();
    const phone = form.get("phone");
    const email = form.get("email");
    console.log(name, phone, email);
    // save user in database
    const userInfo = {
      name: name,
      email: email,
      phone: phone,
      modifiedDate: today,
    };
    const updateUser = await axiosPublic.patch(`/updated/${_id}`, userInfo);
    console.log(updateUser);

    if (updateUser.data.modifiedCount > 0) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${name}'s information updated Successfully`,
        showConfirmButton: false,
        timer: 1700,
      });
      e.target.reset();
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <h2 className="text-3xl font-semibold font-serif flex justify-center text-center pt-32 text-black">
        Update This User Information
      </h2>

      <div>
        <form onSubmit={handleUpdate} className="card-body w-2/3 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-serif text-xl">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={name}
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
              defaultValue={email}
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
              defaultValue={phone}
              placeholder="Mobile Number"
              className="rounded-lg w-full p-2 border focus border-black"
            />
          </div>

          <div className="form-control mt-6">
            <button className="text-xl font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
