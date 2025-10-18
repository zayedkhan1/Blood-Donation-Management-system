import React, { useState } from 'react';
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon to Fri 9am to 6pm',
      color: 'text-blue-600'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: 'support@blooddonation.com',
      description: 'Send us your query anytime!',
      color: 'text-red-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: '123 Blood Donation Center, City',
      description: 'Visit our main center',
      color: 'text-green-600'
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      details: 'Monday - Saturday: 9AM - 6PM',
      description: 'Sunday: Emergency Only',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <FaHeart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-red-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us. We're here to help you save lives through blood donation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions about blood donation? Want to organize a blood drive? 
                We're here to help you make a difference.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300">
                    <div className={`p-3 rounded-xl bg-gray-50 ${item.color.replace('text', 'bg')} bg-opacity-10`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-900 font-medium">{item.details}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">🚨 Emergency Contact</h3>
              <p className="mb-4">For urgent blood requirements and emergency situations:</p>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="font-semibold text-lg text-red-500">+1 (555) 911-BLOOD</p>
                <p className="text-red-500 text-sm">24/7 Emergency Helpline</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">We'll get back to you as soon as possible</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-gray-700 font-medium">
                      <FaUser className="w-4 h-4 text-red-600" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-gray-700 font-medium">
                      <FaEnvelope className="w-4 h-4 text-red-600" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-700 font-medium">
                    <FaComment className="w-4 h-4 text-red-600" />
                    <span>Subject</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="blood-donation">Blood Donation Query</option>
                    <option value="blood-drive">Organize Blood Drive</option>
                    <option value="emergency">Emergency Blood Need</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-700 font-medium">
                    <FaComment className="w-4 h-4 text-red-600" />
                    <span>Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <FaPaperPlane className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-600 pl-4">
                  <h4 className="font-semibold text-gray-900">How often can I donate blood?</h4>
                  <p className="text-gray-600 text-sm">You can donate whole blood every 56 days (8 weeks).</p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <h4 className="font-semibold text-gray-900">What are the eligibility requirements?</h4>
                  <p className="text-gray-600 text-sm">You must be 18-65 years old, weigh at least 50kg, and be in good health.</p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <h4 className="font-semibold text-gray-900">How long does donation take?</h4>
                  <p className="text-gray-600 text-sm">The entire process takes about 45-60 minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Our Centers</h2>
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-3 text-red-600" />
              <p className="text-lg font-semibold">Interactive Map</p>
              <p className="text-sm">Blood donation centers near you</p>
              <button className="mt-3 bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;