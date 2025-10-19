import { useState, useEffect } from 'react';
import { FaHeart, FaArrowRight, FaPlay, FaUsers, FaAmbulance, FaStar, FaTint, FaClock, FaMapMarkerAlt, FaShieldAlt, FaUserPlus, FaCheckCircle, FaCalendarAlt, FaHeartbeat, FaHandHoldingHeart, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);




  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: '50K+', label: 'Lives Saved', icon: FaHeart },
    { number: '25K+', label: 'Active Donors', icon: FaUsers },
    { number: '500+', label: 'Blood Drives', icon: FaTint },
    { number: '24/7', label: 'Emergency Service', icon: FaAmbulance },
  ];

  const features = [
    { icon: FaShieldAlt, text: 'Verified Donors', subtext: '100% safety guaranteed' },
    { icon: FaClock, text: 'Quick Matching', subtext: 'Find donors in minutes' },
    { icon: FaMapMarkerAlt, text: 'Nationwide', subtext: 'Covering all regions' },
    { icon: FaStar, text: 'Premium Support', subtext: '24/7 assistance' },
  ];

  const emergencyContacts = [
    { type: 'Emergency', number: '999', description: '24/7 Helpline' },
    { type: 'Ambulance', number: '999', description: 'Immediate Response' },
    { type: 'Blood Bank', number: '+1-234-567-8900', description: 'Direct Line' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Blood Cells Animation */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div className="w-4 h-4 bg-red-500 rounded-full opacity-20 transform rotate-45"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Banner Section */}
        <section className="pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}>
                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 shadow-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <span className="text-sm font-semibold text-red-700">Live Emergency Service Available</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Every Drop
                  <span className="block text-transparent bg-gradient-to-r from-red-600 to-red-800 bg-clip-text">
                    Saves Lives
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Join our community of heroes. Your single blood donation can save up to
                  <span className="font-semibold text-red-600"> 3 lives</span>. Be the reason
                  someone smiles today.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to='/donate' className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                    <span>Donate Blood Now</span>
                    <FaArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => setShowModal(true)}
                    className="group bg-white text-red-600 border-2 border-red-200 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-red-500/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 hover:border-red-300">
                    <FaPlay className="w-5 h-5" />
                    <span>How It Works</span>
                  </button>
                  {/* How It Works Modal */}
                  {/* Simple Modal */}
                  {showModal && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                          <h2 className="text-xl font-bold text-gray-900">How It Works</h2>
                          <button
                            onClick={() => setShowModal(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <FaTimes className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <div className="flex items-start space-x-3">
                            <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Register as Donor</h3>
                              <p className="text-gray-600 text-sm">Fill out our simple registration form</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Get Verified</h3>
                              <p className="text-gray-600 text-sm">Our team reviews your information</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Receive Requests</h3>
                              <p className="text-gray-600 text-sm">Get notified when your blood type is needed</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-gray-900">Donate & Save Lives</h3>
                              <p className="text-gray-600 text-sm">Visit a blood bank and make a difference</p>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t">
                          <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                          >
                            Got It!
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="text-center transform transition-all duration-500 hover:scale-110"
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-red-100">
                          <Icon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                          <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Content - Hero Image/Illustration */}
              <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}>
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                          <FaHeart className="w-10 h-10 text-red-600 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Urgent Need</h3>
                        <p className="text-gray-600"> Blood Required in Emergency</p>
                        <div className="bg-red-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600">Location</div>
                          <div className="font-semibold text-gray-900">City General Hospital</div>
                          <div className="text-xs text-red-600 mt-1">⏰ Needed within 2 hours</div>
                        </div>
                        <Link to='/donor-list'>
                          <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300">
                            I Can Help
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-red-200 animate-bounce">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-700"> Donors Online</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl border border-red-200 animate-bounce animation-delay-1000">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">4.9</div>
                      <div className="flex justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-red-600">BloodDonor</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We make blood donation simple, safe, and impactful with our premium services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.text}</h3>
                    <p className="text-gray-600 text-sm">{feature.subtext}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="py-12 bg-gradient-to-r from-red-600 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">Emergency Blood Need?</h3>
                <p className="text-red-100">Immediate assistance available 24/7</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                    <div className="text-sm text-red-200">{contact.type}</div>
                    <div className="text-lg font-bold">{contact.number}</div>
                    <div className="text-xs text-red-200">{contact.description}</div>
                  </div>
                ))}
              </div>

              <div className="text-center lg:text-right">
                <a href='https://www.facebook.com/nssofficial2020' target='_blank' className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-red-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Request Emergency Blood
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Banner;