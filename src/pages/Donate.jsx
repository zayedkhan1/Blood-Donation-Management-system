import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHeart, FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaTint, FaAmbulance, FaCheckCircle, FaArrowRight, FaVoicemail } from 'react-icons/fa';

const Donate = ({ userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const areas = [
    'Kanchan', 'Murapara', 'Bholabo', 'Gawsia', 'Kalni', 'Daudpur',
  ];

  const onSubmit = async (data) => {
    data.userId = userId; // attach logged-in user's ID
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error("Failed to submit donor data");
      }

      const result = await response.json();
      console.log("✅ Donor added successfully:", result)
      setIsSubmitting(false);
      setSubmitSuccess(true);
      reset
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setIsSubmitting(false);
      alert("Something went wrong while submitting. Please try again!");
    }


  };



  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your donation registration has been received. You're now part of our life-saving community!
          </p>
          <div className="bg-red-50 rounded-2xl p-4 mb-6">
            <div className="text-sm text-gray-600">Next Steps</div>
            <div className="font-semibold text-red-700">We'll contact you within 24 hours</div>
          </div>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 w-full"
          >
            Register Another Donor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 py-12  px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <FaHeart className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a <span className="text-red-600">Life Saver</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of heroes who save lives through blood donation. Your single donation can save up to 3 lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <FaTint className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Donor Registration</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-red-500 pl-3">
                    Personal Information
                  </h3>

                  {/* Name Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="w-4 h-4 text-red-600 mr-2" />
                      Full Name
                    </label>
                    <input
                      {...register('fullName', {
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      type="text"
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                        }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FaVoicemail className="w-4 h-4 text-red-600 mr-2" />
                      Email
                    </label>
                    <input
                      {...register('email', {
                        required: 'email is required',
                        minLength: { value: 5, message: 'email must be at least 5 characters' }
                      })}
                      type="email"
                      placeholder="Enter your Email"
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                        }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="w-4 h-4 text-red-600 mr-2" />
                        Primary Phone
                      </label>
                      <input
                        {...register('primaryPhone', {
                          required: 'Primary phone is required',
                          pattern: {
                            value: /^[0-9+\-\s()]{10,}$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.primaryPhone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                          }`}
                      />
                      {errors.primaryPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.primaryPhone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="w-4 h-4 text-red-600 mr-2" />
                        Secondary Phone
                      </label>
                      <input
                        {...register('secondaryPhone', {
                          pattern: {
                            value: /^[0-9+\-\s()]{10,}$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                        type="tel"
                        placeholder="Optional secondary number"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300  focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      />
                      {errors.secondaryPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.secondaryPhone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Age and Blood Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FaCalendarAlt className="w-4 h-4 text-red-600 mr-2" />
                        Age
                      </label>
                      <input
                        {...register('age', {
                          required: 'Age is required',
                          min: { value: 18, message: 'Must be at least 18 years old' },
                          max: { value: 65, message: 'Must be under 65 years old' },
                          pattern: {
                            value: /^[0-9]{1,3}$/,
                            message: 'Please enter a valid age'
                          }
                        })}
                        type="number"
                        placeholder="Your age"
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                          }`}
                      />
                      {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FaTint className="w-4 h-4 text-red-600 mr-2" />
                        Blood Type
                      </label>
                      <select
                        {...register('bloodType', { required: 'Blood type is required' })}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 appearance-none ${errors.bloodType ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                          }`}
                      >
                        <option value="">Select your blood type</option>
                        {bloodTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.bloodType && (
                        <p className="text-red-500 text-sm mt-1">{errors.bloodType.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-red-500 pl-3">
                    Location Information
                  </h3>

                  {/* Address */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-red-600 mr-2" />
                      Full Address
                    </label>
                    <input
                      {...register('address', {
                        required: 'Address is required',
                        minLength: { value: 5, message: 'Address must be at least 5 characters' }
                      })}
                      type="text"
                      placeholder="Enter your complete address"
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                        }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Area Selection */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-red-600 mr-2" />
                      Service Area
                    </label>
                    <select
                      {...register('area', { required: 'Please select your area' })}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 appearance-none ${errors.area ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                        }`}
                    >
                      <option value="">Select your area</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    {errors.area && (
                      <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
                    )}
                  </div>
                </div>


                {/* last donation */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="w-4 h-4 text-red-600 mr-2" />
                    Last Donation Date
                  </label>
                  <input
                    {...register('lastDonationDate', {
                      required: 'Donation date is required',
                    })}
                    type="date"
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${errors.lastDonationDate ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-red-500'
                      }`}
                  />
                  {errors.lastDonationDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastDonationDate.message}</p>
                  )}
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-105 shadow-lg hover:shadow-red-500/30'
                    } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Register as Donor</span>
                      <FaArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">

            {/* Benefits Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Benefits</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <FaHeart className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Free health checkup</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <FaHeart className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Blood test reports</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <FaHeart className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Refreshments provided</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <FaHeart className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Certificate of appreciation</span>
                </div>
              </div>
            </div>
            {/* Eligibility Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Eligibility Criteria
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                  Age between 18-65 years
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                  Weight at least 50 kg (110 lbs)
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                  Good health condition
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                  No recent surgeries (3 months)
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                  Not pregnant or breastfeeding
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;