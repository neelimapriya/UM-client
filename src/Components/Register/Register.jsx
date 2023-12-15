// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import { useState } from "react";
// import useAxiosPublic from "../Hooks/UseAxiosPublic";
// import Login from "./Login";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [selectedGander, setSelectedGander] = useState("");

  const handleGanderChange = (event) => {
    setSelectedGander(event.target.value);
  };

  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("register");
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const phone = form.get("phone");
    const email = form.get("email");
    const password = form.get("password");
    console.log(
      name,
      phone,
      email,
      password,
      selectedGander,
      selected,
      selectedCity
    );

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Your password at least have 6 characters",
      });
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Your Password Should have at least one uppercase character",
      });
      return;
    } else if (!/[!@#$%^&*()_+]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Your Password Should have at least one special character",
      });
      return;
    }

    createUser(email, password).then((result) => {
      console.log(result.user);

      updateProfile(result.user, {
        displayName: name,
      }).then(() => {
        // save user in database
        const userInfo = {
          name: name,
          email: email,
          phone: phone,
          gender: selectedGander,
          selected: selected,
          selectedCity: selectedCity,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);

          if (res.data.insertedId) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Account created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            e.target.reset();
            navigate("/");
          }
        });
      });
    });
  };

  return (
    <div className="pb-20 bg-gradient-to-r from-pink-300 to-blue-300">
      <div className="hero min-h-screen  ">
        <div className=" max-w-xl flex-shrink-0 w-full">
          <h2 className="text-center font-serif text-3xl mt-32">
            {" "}
            Create Your account
          </h2>
          <form onSubmit={handleRegister} className="card-body w-4/5 mx-auto">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-serif text-xl">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
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
                  Contact Number
                </span>
              </label>
              <input
                type="number"
                name="phone"
                placeholder="your contact number"
                className="rounded-lg w-full p-2 border focus border-black"
              />
            </div>
            {/* Gender */}
            <h2 className=" flex justify-center mt-3 text-xl font-serif">
              Select gender.
            </h2>

            <div className="flex flex-col md:flex-row md:gap-5 justify-center rounded-lg bg-slate-200">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio checked:bg-red-500 "
                    checked={selectedGander === "male"}
                    onChange={handleGanderChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer ">
                  <span className="label-text mr-2">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio checked:bg-blue-500"
                    checked={selectedGander === "female"}
                    onChange={handleGanderChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">other</span>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    className="radio checked:bg-green-500"
                    checked={selectedGander === "other"}
                    onChange={handleGanderChange}
                  />
                </label>
              </div>
            </div>
            {/* connection */}
            <h2 className="mt-3 flex justify-center text-xl ">
              How did you hear about this?
            </h2>
            <div className="flex flex-col md:flex-row md:gap-5 justify-center rounded-lg bg-slate-200">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">LinkedIn</span>
                  <input
                    type="checkbox"
                    name="gender"
                    value="linkedIn"
                    className="checkbox checked:bg-red-500 "
                    checked={selected === "linkedIn"}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer ">
                  <span className="label-text mr-2">Friends</span>
                  <input
                    type="checkbox"
                    name="checkBox"
                    value="friends"
                    className="checkbox checked:bg-blue-500"
                    checked={selected === "friends"}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2"> Job Portal</span>
                  <input
                    type="checkbox"
                    name="checkBox"
                    value=" Job Portal"
                    className="checkbox checked:bg-green-500"
                    checked={selected === " Job Portal"}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2"> Others</span>
                  <input
                    type="checkbox"
                    name="checkBox"
                    value=" Others"
                    className="checkbox checked:bg-green-500"
                    checked={selected === " Others"}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            {/* city */}
            <div className="text-xl font-serif flex justify-center rounded-lg mt-3">
              <label>
                Select City:
                <select className="ml-3" value={selectedCity} onChange={handleCityChange} required>
                  <option value="" >-- Select --</option>
                  <option value="Mumbai" >Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-serif text-xl">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 rounded-lg border border-black"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="text-xl font-semibold bg-gradient-to-r from-pink-700 to-blue-700 text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg">
                Register
              </button>
            </div>
          </form>

          <div className="text-center mb-5 ">
            <p className="text-md text-center  font-serif flex flex-col md:flex-row justify-center items-center">
              Already Have an Account ?
              <Link className="underline ml-2 text-blue-700 " to="/login">
                Please Login
              </Link>
            </p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Register;
