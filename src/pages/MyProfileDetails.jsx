
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaHeart,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
  FaIdCard
} from "react-icons/fa";

const MyProfileDetails = ({ userEmail }) => {
  const [donorData, setDonorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // -------------------------------try-------------------------

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  // -------------------------------try-------------------------


  useEffect(() => {
    if (!userEmail) return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api-blood-donation-bs5h.onrender.com/donors/${userEmail}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setDonorData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userEmail]);

  const toggleAvailability = async () => {
    if (!donorData) return;

    try {
      setIsUpdating(true);
      const res = await fetch(`https://api-blood-donation-bs5h.onrender.com/donors/${donorData._id}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !donorData.isAvailable }),
      });

      if (res.ok) {
        const updated = { ...donorData, isAvailable: !donorData.isAvailable };
        setDonorData(updated);
      }
    } catch (err) {
      console.error("❌ Failed to update availability:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // -------------------------------try-------------------------
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`https://api-blood-donation-bs5h.onrender.com/donors/${donorData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      setDonorData((prev) => ({ ...prev, ...editedData }));
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update profile.");
    }
  };
  // -------------------------------try-------------------------


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!donorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your donor profile. Please complete your registration.</p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300">
            Complete Registration
          </button>
        </div>
      </div>
    );
  }

  const profileFields = [
    {
      icon: FaUser,
      label: "Full Name",
      value: donorData.fullName,
      color: "text-blue-600"
    },
    {
      icon: FaEnvelope,
      label: "Email Address",
      value: donorData.email,
      color: "text-red-600"
    },
    {
      icon: FaPhone,
      label: "Primary Phone",
      value: donorData.primaryPhone,
      color: "text-green-600"
    },
    {
      icon: FaPhone,
      label: "Secondary Phone",
      value: donorData.secondaryPhone || "Not provided",
      color: "text-gray-600"
    },
    {
      icon: FaCalendarAlt,
      label: "Age",
      value: `${donorData.age} years`,
      color: "text-purple-600"
    },
    {
      icon: FaTint,
      label: "Blood Type",
      value: donorData.bloodType,
      color: "text-red-600"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: donorData.address,
      color: "text-orange-600"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Area",
      value: donorData.area,
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl">
                <FaUser className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <FaCheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Donor Profile
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back, <span className="text-red-600 font-semibold">{donorData.fullName}</span>
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Status Header */}
          <div className={`p-6 text-white ${donorData.isAvailable
            ? 'bg-gradient-to-r from-green-600 to-green-700'
            : 'bg-gradient-to-r from-red-600 to-red-700'
            }`}>
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {donorData.isAvailable ? (
                    <FaCheckCircle className="w-6 h-6" />
                  ) : (
                    <FaTimesCircle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">Availability Status</h2>
                  <p className="text-white/90">
                    {donorData.isAvailable ? 'Ready to save lives' : 'Currently unavailable'}
                  </p>
                </div>
              </div>

              <button
                onClick={toggleAvailability}
                disabled={isUpdating}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${donorData.isAvailable
                  ? 'bg-white text-red-600 hover:bg-red-50'
                  : 'bg-white text-green-600 hover:bg-green-50'
                  } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isUpdating ? (
                  <FaSync className="w-4 h-4 animate-spin" />
                ) : donorData.isAvailable ? (
                  <>
                    <FaTimesCircle className="w-4 h-4" />
                    <span>Mark Unavailable</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="w-4 h-4" />
                    <span>Mark Available</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            

              {/* ---------------------------try------------------- */}

              {profileFields.map((field, index) => {
                const Icon = field.icon;
                const key = field.label.replace(/\s+/g, '').toLowerCase(); // simple key
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center ${field.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-600 mb-1">
                          {field.label}
                        </p>
                        {isEditing ? (
                          <input
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            defaultValue={field.value}
                            onChange={(e) =>
                              setEditedData((prev) => ({
                                ...prev,
                                [field.label.toLowerCase().replace(/\s/g, '')]: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-900">{field.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}


              {/* ---------------------------try------------------- */}


            </div>

            {/* User ID Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-3 bg-gray-50 rounded-2xl p-4">
                <FaIdCard className="w-5 h-5 text-gray-600" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600">Donor ID</p>
                  <p className="text-gray-900 font-mono">{donorData.userId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaHeart className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">Active</div>
            <div className="text-gray-600">Donor Status</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaTint className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{donorData.bloodType}</div>
            <div className="text-gray-600">Blood Type</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaMapMarkerAlt className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{donorData.area}</div>
            <div className="text-gray-600">Service Area</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        

          {/* -----------------------------try------------------------ */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-red-600 border-2 border-red-200 px-8 py-3 rounded-xl font-semibold hover:border-red-300 hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaEdit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={handleUpdateProfile}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-500/30"
            >
              <FaSync className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          )}
          {/* -----------------------------try------------------------ */}


        </div>
      </div>
    </div>
  );
};

export default MyProfileDetails;