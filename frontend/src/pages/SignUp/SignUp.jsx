import React, { useState } from "react";
import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox/CheckBox";
import toast from "react-hot-toast";
import { signup } from "../../store/featuers/userSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/featuers/userSlice";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckBox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signup(inputs);
    if (response.status === 201) {
      toast.success("Registered Successfully");

      // setUser
      const user = {
        _id: response.data.user._id,
        fullName: response.data.user.fullName,
        username: response.data.user.username,
        auth: response.data.auth,
        profilePic: response.data.user.profilePic,
      };

      dispatch(setUser(user));

      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <IoPerson className="m-auto w-10 h-10 text-white" />
        <h1 className="text-3xl font-mono text-center text-gray-300">SignUp</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-white label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-white label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <CheckBox handleCheckBox={handleCheckBox} gender={inputs.gender} />

          <Link
            className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
