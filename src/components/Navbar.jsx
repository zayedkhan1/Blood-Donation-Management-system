
import { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  FaHeart, FaUser, FaBell, FaSearch, FaBars, FaTimes,
  FaHome, FaInfoCircle, FaHandHoldingHeart, FaPhoneAlt,
  FaUserAlt
} from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from '../context/AuthProvider';
import { TbLogin } from "react-icons/tb";

const Navbar = () => {
  const { user, SignOut } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleLogOut = () => {
    SignOut()
      .then(() => {
        alert('logout successfully')
      })
      .catch(error => {
        console.error(error)
      })

  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Donate', href: '/donate', icon: FaHandHoldingHeart },
    { name: 'Donor List', href: '/donor-list', icon: FaInfoCircle },
    { name: 'MyProfile', href: '/my-profile', icon: FaUserAlt },
    { name: 'Contact', href: '/contact', icon: FaPhoneAlt },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-red-100'
        : 'bg-gradient-to-r from-red-600 to-red-700'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to='/' className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${isScrolled ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' : 'bg-white text-red-600'
              }`}>
              <FaHeart className="w-6 h-6" />
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-red-700' : 'text-white'
              }`}>
              Blood<span className="text-white bg-red-500 px-1 rounded">Donor</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map(({ name, href, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={name}
                  to={href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                      ? isScrolled
                        ? 'text-red-700 bg-red-50 border-b-2 border-red-600'
                        : 'text-white bg-red-800/30 border-b-2 border-white'
                      : isScrolled
                        ? 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                        : 'text-red-100 hover:text-white hover:bg-red-800/30'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Notifications */}
            <button className={`p-2 rounded-full transition-all duration-200 ${isScrolled
                ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                : 'text-white hover:bg-red-800/30'
              }`}>
              <FaBell className="w-5 h-5" />
            </button>

            {/* Profile */}
            {
              user ?
                // logout btn
                <button onClick={handleLogOut} className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isScrolled
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                    : 'bg-white text-red-600 hover:bg-red-50'
                  }`}>
                  <IoIosLogOut className="w-4 h-4" />
                  <span className="text-sm font-medium"> Logout</span>
                </button>
                :
                <>
                  {/* Login btn */}
                  <Link to='/login' className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isScrolled
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                      : 'bg-white text-red-600 hover:bg-red-50'
                    }`}>
                    <TbLogin className="w-4 h-4" />
                    <span className="text-sm font-medium">Login</span>
                  </Link>

                  {/* register btn */}
                  <Link to='/register' className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isScrolled
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                      : 'bg-white text-red-600 hover:bg-red-50'
                    }`}>
                    <FaUser className="w-4 h-4" />
                    <span className="text-sm font-medium">Register</span>
                  </Link>
                </>

            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-all duration-200 ${isScrolled
                  ? 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  : 'text-white hover:bg-red-800/30'
                }`}
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 ${isScrolled ? 'bg-white border border-gray-200' : 'bg-red-800/90 backdrop-blur-md'
              }`}>
              {navigationItems.map(({ name, href, icon: Icon }) => {
                const isActive = location.pathname === href;
                return (
                  <Link
                    key={name}
                    to={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${isActive
                        ? isScrolled
                          ? 'text-red-700 bg-red-50 border-l-4 border-red-600'
                          : 'text-white bg-red-700 border-l-4 border-white'
                        : isScrolled
                          ? 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                          : 'text-red-100 hover:text-white hover:bg-red-700'
                      }`}
                  >

                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </Link>
                );
              })}
             

  {
              user ?
                // logout btn
                <button onClick={handleLogOut} className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isScrolled
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                    : 'bg-white text-red-600 hover:bg-red-50'
                  }`}>
                  <IoIosLogOut className="w-4 h-4" />
                  <span className="text-sm font-medium"> Logout</span>
                </button>
                :
                <>
                  {/* Login btn */}
                  <Link to='/login' className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isScrolled
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                      : 'bg-white text-red-600 hover:bg-red-50'
                    }`}>
                    <FaUser className="w-4 h-4" />
                    <span className="text-sm font-medium">Login</span>
                  </Link>

                  {/* register btn */}
                  <Link to='/register' className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 ${isScrolled
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                      : 'bg-white text-red-600 hover:bg-red-50'
                    }`}>
                    <TbLogin className="w-4 h-4" />
                    <span className="text-sm font-medium">Register</span>
                  </Link>
                </>

            }

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
