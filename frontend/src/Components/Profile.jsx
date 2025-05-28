import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";
import { useEffect } from "react";
const Profile = () => {
  const [image, setImage] = useState({ file: null, preview: null });
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useAuth();
  const { id } = useParams();
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/get-profile/${id}`);
      if (data.success) {
        setImage({
          file: null,
          preview: data.user.image || "https://avatar.iran.liara.run/public",
        });
        setFullname(data.user.fullname);
        setEmail(data.user.email);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting profile", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("image", image.file);
      const { data } = await axios.put(
        `${backendUrl}/auth/update-profile/${id}`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in  Error in Updating profile", error);
      setIsEdit(false);
      setLoading(false);
    }
  };

  const handleIsEdit = () => {
    setIsEdit(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage({
        file: file,
        preview: previewUrl,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      <form className="p-6 sm:p-10" onSubmit={updateProfile}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          {isEdit ? (
            <button
              disabled
              className="px-4 py-2 bg-gray-300 text-gray-600 text-sm font-medium rounded cursor-not-allowed"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleIsEdit}
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
        </div>
        <hr className="mb-6 border-gray-300" />

        {/* Avatar with Camera Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <img
              src={image.preview || "https://avatar.iran.liara.run/public"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-white border p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
            >
              {isEdit ? (
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c-1.1 0-2 .9-2 2H8l-2 2H4c-1.1 0-2 .9-2 2v8a2 2 0 002 2h16a2 2 0 002-2v-8c0-1.1-.9-2-2-2h-2l-2-2h-2c0-1.1-.9-2-2-2zm0 2c.55 0 1 .45 1 1h-2c0-.55.45-1 1-1zm0 3c2.21 0 4 1.79 4 4s-1.79 4-4 4a4 4 0 110-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              ) : (
                ""
              )}

              {isEdit ? (
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              ) : (
                ""
              )}
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          {isEdit ? (
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Prem"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled
              placeholder="Prem"
              className="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          {isEdit ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prem@gmail.com"
              className="w-full px-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prem@gmail.com"
              className="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>

        {isEdit ? (
          <>
            {!loading ? (
              <>
                <button type="submit" className="btn btn-primary w-full">
                  Updated Profile
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn bg-gray-200 w-full">
                  Loading....
                </button>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Profile;
