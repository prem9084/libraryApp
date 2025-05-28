import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
const AddStudent = () => {
  const { backendUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [studentData, setStudentData] = useState({
  //   fullname: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   comeFrom: "",
  //   payment: "",
  //   studentIds: {
  //     front: "",
  //     back: "",
  //   },
  //   image: "",
  //   timing: "",
  // });

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comeFrom, setComeFrom] = useState("");
  const [payment, setPaymenet] = useState("");
  const [studentIds, setStudentIds] = useState({
    front: { file: null, preview: null },
    back: { file: null, preview: null },
  });
  const [image, setImage] = useState({
    file: null,
    preview: null,
  });
  const [timing, setTiming] = useState("");

  const handleAddStudent = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("comeFrom", comeFrom);
    formData.append("payment", payment);
    formData.append("timing", timing);
    formData.append("image", image.file); // Student photo
    formData.append("studentIdFront", studentIds.front.file); // Front ID
    formData.append("studentIdBack", studentIds.back.file);

    try {
      const { data } = await axios.post(
        `${backendUrl}/student/add-student`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in Student Adding", error);
      toast.error("Error in Student Adding", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-3 px-4">
      <div className="w-full max-w-2xl border border-gray-300 p-5 rounded-lg font-bold shadow-md">
        <form onSubmit={handleAddStudent}>
          <h1 className="text-center text-lg md:text-xl font-semibold mb-4">
            Add New Student
          </h1>
          <hr className="mt-3 mb-5" />
          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label>Phone</label>
              <input
                type="tel"
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label>Address</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Date of Joining */}
            <div className="flex flex-col gap-2">
              <label>Date of Joining</label>
              <input
                type="date"
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={comeFrom}
                onChange={(e) => setComeFrom(e.target.value)}
              />
            </div>

            {/* Payment Status */}
            <div className="flex flex-col gap-2">
              <label>Payment Status</label>
              <select
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={payment}
                onChange={(e) => setPaymenet(e.target.value)}
              >
                <option>Select Payment</option>
                <option value="PAID">PAID</option>
                <option value="NOT PAID">NOT PAID</option>
              </select>
            </div>

            {/* Student IDs */}
            <div className="flex flex-col gap-2">
              <label>Student IDs</label>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Front ID */}
                <div className="flex-1">
                  <label>Front</label>
                  <input
                    type="file"
                    id="front"
                    className="border-2 border-gray-400 rounded-full p-2 text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const previewUrl = URL.createObjectURL(file);
                        setStudentIds((prev) => ({
                          ...prev,
                          front: {
                            file: file,
                            preview: previewUrl,
                          },
                        }));
                      }
                    }}
                  />
                  {studentIds.front.preview && (
                    <img
                      src={studentIds.front.preview}
                      alt="Front Preview"
                      className="w-40 max-w-xs mt-2 rounded"
                    />
                  )}
                </div>

                {/* Back ID */}
                <div className="flex-1">
                  <label>Back</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="border-2 border-gray-400 rounded-full p-2 text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const previewUrl = URL.createObjectURL(file);
                        setStudentIds((prev) => ({
                          ...prev,
                          back: {
                            file: file,
                            preview: previewUrl,
                          },
                        }));
                      }
                    }}
                  />
                  {studentIds.back.preview && (
                    <img
                      src={studentIds.back.preview}
                      alt="Back Preview"
                      className="w-40 rounded max-w-xs mt-2"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className="flex flex-col gap-2">
              <label>Timing</label>
              <select
                className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              >
                <option>Select Timing</option>
                <option value="12h">12h</option>
                <option value="24h">24h</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex-1 gap-2">
                <label>Student Photo</label>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 w-full border-gray-400 rounded-full p-2 text-sm"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setImage({
                        file: file,
                        preview: previewUrl,
                      });
                    }
                  }}
                />
                {image.preview && (
                  <img
                    src={image.preview}
                    alt="Student Preview"
                    className="w-40 rounded max-w-xs mt-2"
                  />
                )}
              </div>
            </div>

            {loading ? (
              <button
                type="submit"
                className="w-full cursor-pointer mt-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full cursor-pointer mt-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
