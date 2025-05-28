import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { backendUrl } = useAuth();
  const [myStudents, setMyStudents] = useState([]);
  const myStudent = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/student/get-student`);
      if (data.success) {
        setMyStudents(data.student);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myStudent();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5 p-4">
      {myStudents.map((data) => (
        <div
          key={data._id}
          className="border border-gray-300 rounded-lg shadow-md w-full sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white transition hover:scale-105 duration-300"
        >
          <img
            className="w-24 h-24 object-cover rounded-full mx-auto mt-4 border-2 border-blue-400"
            src={data.image}
            alt={data.fullname}
          />
          <div className="px-4 py-3 text-center">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Name</h2>
              <p className="text-sm text-gray-600 mb-2">{data.fullname}</p>
            </div>

            <hr className="my-2" />
            <div className="flex flex-row justify-between">
              <h3 className="text-md font-medium text-gray-700">
                Date of Joining
              </h3>
              <p className="text-sm text-gray-600 mb-4">{data.comeFrom}</p>
            </div>
            <hr />
            <div className="flex flex-row justify-between">
              <h3 className="text-md font-medium text-gray-700">
                Payment Status
              </h3>
              <p className="text-sm text-gray-600 mb-4">{data.payment}</p>
            </div>
            <hr />
            <Link to={`/details/${data._id}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
                View
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
