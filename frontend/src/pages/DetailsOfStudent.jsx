import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
const DetailsOFStudent = () => {
  const { backendUrl } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  const [isEdit, setIsEdit] = useState(false);
  const handleUpdateStudent = async (e) => {
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
      const { data } = await axios.put(
        `${backendUrl}/student/update-student/${id}`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setLoading(false);
        setIsEdit(false);
      } else {
        toast.error(data.message);
        setLoading(false);
        setIsEdit(false);
      }
    } catch (error) {
      console.log("Error in Student Updating", error);
      toast.error("Error in Student Updating", error);
      setLoading(false);
      setIsEdit(false);
    }
  };

  const getSingleStudent = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/student/get-single-student/${id}`
      );
      if (data.success) {
        setFullname(data.student.fullname);
        setEmail(data.student.email);
        setPhone(data.student.phone);
        setPaymenet(data.student.payment);

        setTiming(data.student.timing);
        setComeFrom(data.student.comeFrom);
        setAddress(data.student.address);

        setImage({
          file: null,
          preview: data.student.image,
        });

        setStudentIds({
          front: {
            file: null,
            preview: data.student.studentIds.front,
          },
          back: {
            file: null,
            preview: data.student.studentIds.back,
          },
        });
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error in Get Single", error);
      toast.error("Error in  Get Single", error);
    }
  };

  useEffect(() => {
    getSingleStudent();
  }, [id]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className="flex justify-center mt-10 mb-3 px-4">
      <div className="w-full max-w-2xl border border-gray-300 p-5 rounded-lg font-bold shadow-md">
        <div className="flex justify-end">
          {isEdit ? (
            <button disabled className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
        <form onSubmit={handleUpdateStudent}>
          <h1 className="text-center text-lg md:text-xl font-semibold mb-4">
            {isEdit ? "Update Student" : " Student Details Page"}
          </h1>
          <hr className="mt-3 mb-5" />

          <div className="flex flex-col gap-2">
            <div className="flex-1 gap-2">
              <label>Student Photo</label>
              <br />
              {isEdit ? (
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
              ) : (
                <></>
              )}

              {image.preview && (
                <img
                  src={image.preview}
                  alt="Student Preview"
                  className="w-40 h-40 m-auto max-w-xs mt-2 rounded-full"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              {isEdit ? (
                <input
                  type="text"
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              {isEdit ? (
                <input
                  type="email"
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <input
                  type="email"
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label>Phone</label>
              {isEdit ? (
                <input
                  type="tel"
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ) : (
                <input
                  type="tel"
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label>Address</label>
              {isEdit ? (
                <input
                  type="text"
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              )}
            </div>

            {/* Date of Joining */}
            <div className="flex flex-col gap-2">
              <label>Date of Joining</label>
              {isEdit ? (
                <input
                  type="date"
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={comeFrom}
                  onChange={(e) => setComeFrom(e.target.value)}
                />
              ) : (
                <input
                  type="date"
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={comeFrom}
                  onChange={(e) => setComeFrom(e.target.value)}
                />
              )}
            </div>

            {/* Payment Status */}
            <div className="flex flex-col gap-2">
              <label>Payment Status</label>
              {isEdit ? (
                <select
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={payment}
                  onChange={(e) => setPaymenet(e.target.value)}
                >
                  <option>Select Payment</option>
                  <option value="PAID">PAID</option>
                  <option value="NOT PAID">NOT PAID</option>
                </select>
              ) : (
                <select
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={payment}
                  onChange={(e) => setPaymenet(e.target.value)}
                >
                  <option>Select Payment</option>
                  <option value="PAID">PAID</option>
                  <option value="NOT PAID">NOT PAID</option>
                </select>
              )}
            </div>

            {/* Student IDs */}
            <div className="flex flex-col gap-2">
              <label>Student IDs</label>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label>Front</label>

                  {isEdit ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      {" "}
                      {studentIds.front.preview && (
                        <img
                          src={studentIds.front.preview}
                          alt="Front Preview"
                          className="w-40 max-w-xs mt-2 rounded"
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Back ID */}
                <div className="flex-1">
                  <label>Back</label>
                  {isEdit ? (
                    <>
                      {" "}
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
                    </>
                  ) : (
                    <>
                      {" "}
                      {studentIds.back.preview && (
                        <img
                          src={studentIds.back.preview}
                          alt="Back Preview"
                          className="w-40 rounded max-w-xs mt-2"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className="flex flex-col gap-2">
              <label>Timing</label>
              {isEdit ? (
                <select
                  className="border-2 border-gray-400 rounded-full p-2 text-sm md:text-base"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                >
                  <option>Select Timing</option>
                  <option value="12h">12h</option>
                  <option value="24h">24h</option>
                </select>
              ) : (
                <select
                  disabled
                  className="border-2 border-gray-400 bg-gray-100 rounded-full p-2 text-sm md:text-base"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                >
                  <option>Select Timing</option>
                  <option value="12h">12h</option>
                  <option value="24h">24h</option>
                </select>
              )}
            </div>

            {isEdit ? (
              <>
                {loading ? (
                  <button
                    type="submit"
                    className="w-full cursor-pointer mt-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
                  >
                    Loading...
                  </button>
                ) : (
                  <button className="w-full cursor-pointer mt-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
                    Update Student
                  </button>
                )}
              </>
            ) : (
              <button
                type="submit"
                disabled
                className="w-full cursor-pointer mt-5 py-2 bg-gray-200  text-gray-400 rounded-full "
              >
                Update Student
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsOFStudent;
