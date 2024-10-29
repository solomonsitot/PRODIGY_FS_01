import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../assets/login back.png";
import mail from "../assets/mail.png";
import key from "../assets/key.png";
import contact from "../assets/Contact.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  SET_ID,
  SET_LOGIN,
  SET_NAME,
} from "../redux/features/counter/counterSlice";

function Signup() {
  const [full_name, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [re_password, setRe_Password] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function sign(e) {
    e.preventDefault(); // Prevents page reload on submit
    if (!full_name || !email || !password || !re_password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== re_password) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        {
          full_name,
          email,
          password,
          re_password,
        },
        { withCredentials: true },
      );

      const data = response.data;
      toast(response.data.message);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.body.full_name));
      await dispatch(SET_ID(data.body._id));
      if (data.body) {
        navigate(`/home`);
        console.log(data.message);
      } else {
        window.alert(`${data.message}`);
        setFullname("");
        setEmail("");
        setPassword("");
        setRe_Password("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      window.alert("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <div className="flex">
        <div className=" content-center mx-auto text-center w-3/4  h-screen  ">
          <h1 className="text-3xl  font-bold mb-4">Signup Page</h1>
          <div className="flex w-full justify-center my-2">
            <img
              className=" p-1 w-8  border-b-2  mx-0 border-gray-400"
              src={contact}
              alt=""
            />

            <input
              className="p-1 px-4 w-1/2 block border-b-2  mx-0 border-gray-400"
              type="text"
              name="name"
              placeholder="full name"
              value={full_name}
              required={true}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center my-2">
            <img
              className=" p-1 w-8  border-b-2  mx-0 border-gray-400"
              src={mail}
              alt=""
            />
            <input
              className="p-1 px-4 w-1/2 block border-b-2 mx-0 border-gray-400"
              type="text"
              value={email}
              name="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex w-full justify-center my-2">
            <img
              className=" p-1 w-8  border-b-2  mx-0 border-gray-400"
              src={key}
              alt=""
            />
            <input
              className="p-1 px-4 w-1/2 block border-b-2 mx-0 border-gray-400"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center my-2 ">
            <img
              className=" p-1 w-8  border-b-2  mx-0 border-gray-400"
              src={key}
              alt=""
            />
            <input
              className="p-1 px-4 w-1/2 block border-b-2 mx-0 border-gray-400"
              type="password"
              value={re_password}
              name="re_password"
              placeholder="Confirm Password"
              required={true}
              onChange={(e) => setRe_Password(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-10 py-2 rounded-lg text-white bg-green-950  "
            onClick={sign}
          >
            SignUp
          </button>
          <p className="mt-4">
            Already have an account{" "}
            <a className="text-blue-500" href="/login">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
