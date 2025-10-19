import { FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight, FaHandHoldingHeart, FaAmbulance, FaShieldAlt, FaTint } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Find Donors', href: '/' },
    { name: 'Blood Banks', href: '/' },
    { name: 'Eligibility', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Success Stories', href: '/' },
  ];

  const resources = [
    { name: 'Blood Types', href: '/' },
    { name: 'Donation Process', href: '/' },
    { name: 'Health Tips', href: '/' },
    { name: 'FAQ', href: '/' },
    { name: 'Support', href: '/' },
  ];

  const emergencyContacts = [
    { type: 'Emergency', number: '106', available: '24/7' },
    { type: 'Blood Bank', number: '+1-234-567-8900', available: '24/7' },
    { type: 'Ambulance', number: '102', available: '24/7' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-red-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-red-600 rounded-full">
                <FaHeart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                Blood<span className="text-red-400">Donor</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting blood donors with those in need. Join our mission to save lives
              through voluntary blood donation. Every drop counts, every donor matters.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-200 group"
                  >
                    <FaArrowRight className="w-3 h-3 mr-3 text-red-400 transform group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Resources
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-white transition-all duration-200 group"
                  >
                    <FaArrowRight className="w-3 h-3 mr-3 text-red-400 transform group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Emergency Contacts
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-red-800/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-red-500 hover:border-red-400 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-600 rounded-full">
                      <FaAmbulance className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{contact.type}</p>
                      <p className="text-lg font-bold text-red-300">{contact.number}</p>
                      <p className="text-sm text-gray-400">{contact.available}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                &copy; {currentYear} BloodDonor. All rights reserved.
                <span className="text-red-300 ml-2">Save Lives, Donate Blood</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="group relative">
          <div className="absolute inset-0 bg-red-600 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300">
            <FaTint className="w-6 h-6" />
          </div>
          <div className="absolute -top-2 -right-2">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          </div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;