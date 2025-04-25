import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response ? error.response.data.error : "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex justify-center flex-column"
        >
          <Input
            type={"text"}
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type={"submit"} text={"Register"} color={"green"} />
          {/* <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Register
          </button> */}
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?
          <Link to="/login" className="text-green-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
