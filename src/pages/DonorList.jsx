
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaHeart, FaPhone, FaMapMarkerAlt, FaTint, FaTimes, FaCheckCircle, FaTimesCircle, FaSort, FaSortUp, FaSortDown, FaEnvelope, FaCalendar, FaIdCard, FaUser } from 'react-icons/fa';
import Loading from '../components/Loading';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showDonorModal, setShowDonorModal] = useState(false);




  const fetchDonors = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/donors"); // backend endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch donors");
      }

      const data = await response.json(); // parse JSON
      setDonors(data); // save donors to state
      setIsLoading(false);
    } catch (error) {
      console.error("❌ Error fetching donors:", error);
      setIsLoading(false);
    }
  };

  // Fetch donors on component mount
  useEffect(() => {
    fetchDonors();
  }, []);





  // Filter and sort donors
  useEffect(() => {
    let result = donors.filter(donor => {
      const matchesSearch = donor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.bloodType?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBloodType = selectedBloodType === 'All' || donor.bloodType === selectedBloodType;
      const matchesArea = selectedArea === 'All' || donor.area === selectedArea;
      const matchesAvailability = availabilityFilter === 'All' ||
        (availabilityFilter === 'Available' && donor.isAvailable) ||
        (availabilityFilter === 'Not Available' && !donor.isAvailable);

      return matchesSearch && matchesBloodType && matchesArea && matchesAvailability;
    });

    // Sort results
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredDonors(result);
  }, [donors, searchTerm, selectedBloodType, selectedArea, availabilityFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return FaSort;
    return sortConfig.direction === 'asc' ? FaSortUp : FaSortDown;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBloodType('All');
    setSelectedArea('All');
    setAvailabilityFilter('All');
  };

  const toggleAvailability = async (donorId) => {
    try {
      // const donor = donors.find(d => d.id === donorId);
      const donor = donors.find(d => d._id === donorId);//new line
      const newAvailability = !donor.isAvailable;


      // ---------new line---------
      const response = await fetch(`http://localhost:5000/donors/${donorId}/availability`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: newAvailability }),
      });

      // ---------new line---------

      if (!response.ok) {
        throw new Error('Failed to update donor availability');
      }

      // Update local state
      setDonors(prevDonors =>
        prevDonors.map(donor =>
          donor._id === donorId ? { ...donor, isAvailable: newAvailability } : donor//donor.id instead of donor._id
        )
      );
    } catch (error) {
      console.error('Error updating donor availability:', error);
      alert('Failed to update donor availability');
    }
  };

  // View donor details
  const viewDonorDetails = (donor) => {
    setSelectedDonor(donor);
    setShowDonorModal(true);
  };

  // Close modal
  const closeDonorModal = () => {
    setShowDonorModal(false);
    setSelectedDonor(null);
  };

  // Extract unique blood types and areas from actual data
  const bloodTypes = ['All', ...new Set(donors.map(d => d.bloodType).filter(Boolean))];
  const areas = ['All', ...new Set(donors.map(d => d.area).filter(Boolean))];

  const getDaysSinceLastDonation = (lastDonation) => {
    if (!lastDonation) return 'Never';
    const diffTime = Math.abs(new Date() - new Date(lastDonation));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
     <Loading></Loading>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <FaHeart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Heroes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our registered blood donors who are ready to save lives. Find donors by blood type, location, or availability.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-red-600">{donors.length}</div>
            <div className="text-gray-600">Total Donors</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600">
              {donors.filter(d => d.isAvailable).length}
            </div>
            <div className="text-gray-600">Available Now</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600">
              {[...new Set(donors.map(d => d.bloodType).filter(Boolean))].length}
            </div>
            <div className="text-gray-600">Blood Types</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600">
              {[...new Set(donors.map(d => d.area).filter(Boolean))].length}
            </div>
            <div className="text-gray-600">Areas Covered</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, area, or blood type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-red-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-red-700 transition-all duration-300"
            >
              <FaFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              >
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Blood Types' : type}</option>
                ))}
              </select>

              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area === 'All' ? 'All Areas' : area}</option>
                ))}
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>

              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2"
              >
                <FaTimes className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden grid grid-cols-1 gap-4 mt-4 p-4 bg-red-50 rounded-xl">
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              >
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Blood Types' : type}</option>
                ))}
              </select>

              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area === 'All' ? 'All Areas' : area}</option>
                ))}
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>

              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2 justify-center"
              >
                <FaTimes className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredDonors.length} of {donors.length} donors
          </p>
          <p className="text-sm text-gray-500">
            Click on headers to sort
          </p>
        </div>

        {/* Donors Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  {[
                    { key: 'fullName', label: 'Donor Name' },
                    { key: 'bloodType', label: 'Blood Type' },
                    { key: 'age', label: 'Age' },
                    { key: 'area', label: 'Area' },
                    { key: 'lastDonation', label: 'Last Donation' },
                    { key: 'isAvailable', label: 'Status' }
                  ].map(({ key, label }) => {
                    const SortIcon = getSortIcon(key);
                    return (
                      <th
                        key={key}
                        className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-red-700 transition-colors duration-200"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{label}</span>
                          <SortIcon className="w-3 h-3" />
                        </div>
                      </th>
                    );
                  })}
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-red-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => viewDonorDetails(donor)}
                      >
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <FaHeart className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                            {donor.fullName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <FaPhone className="w-3 h-3" />
                            <span>{donor.primaryPhone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaTint className={`w-4 h-4 ${donor.bloodType?.includes('+') ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        <span className="font-semibold text-gray-900">{donor.bloodType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{donor.age} years</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-red-600" />
                        <span className="text-gray-900">{donor.area}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {getDaysSinceLastDonation(donor.lastDonation)} days ago
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${donor.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {donor.isAvailable ? (
                          <>
                            <FaCheckCircle className="w-4 h-4" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <FaTimesCircle className="w-4 h-4" />
                            <span>Not Available</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 space-x-2 flex ">
                      <button
                        onClick={() => viewDonorDetails(donor)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
                      >
                        View Details
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredDonors.map((donor) => (
              <div key={donor.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  {/* Header */}
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => viewDonorDetails(donor)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <FaHeart className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg hover:text-red-600 transition-colors">
                          {donor.fullName}
                        </div>
                        <div className="text-sm text-gray-500">{donor.age} years</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTint className={`w-5 h-5 ${donor.bloodType?.includes('+') ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      <span className="font-bold text-gray-900">{donor.bloodType}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <FaPhone className="w-4 h-4 text-red-600" />
                      <span>{donor.primaryPhone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <FaMapMarkerAlt className="w-4 h-4 text-red-600" />
                      <span>{donor.area}</span>
                    </div>
                    <div className="text-gray-700">
                      Last donation: {getDaysSinceLastDonation(donor.lastDonation)} days ago
                    </div>
                  </div>

                  {/* Status and Action */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold w-fit ${donor.isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {donor.isAvailable ? (
                        <>
                          <FaCheckCircle className="w-4 h-4" />
                          <span>Available</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="w-4 h-4" />
                          <span>Not Available</span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewDonorDetails(donor)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => toggleAvailability(donor.id)}
                        className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${donor.isAvailable
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                      >
                        {donor.isAvailable ? 'Unavailable' : 'Available'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDonors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimes className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No donors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <button
                onClick={clearFilters}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Donor Details Modal */}
      {showDonorModal && selectedDonor && (
        <div className="fixed inset-0  backdrop-blur-sm bg-white/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <FaUser className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedDonor.fullName}</h2>
                    <p className="text-red-100">Blood Donor Profile</p>
                  </div>
                </div>
                <button
                  onClick={closeDonorModal}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Blood Type Badge */}
              <div className="flex justify-center">
                <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full text-lg font-bold ${selectedDonor.bloodType?.includes('+')
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
                  }`}>
                  <FaTint className="w-6 h-6" />
                  <span>Blood Type: {selectedDonor.bloodType}</span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Personal Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FaIdCard className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-semibold">{selectedDonor.age} years</p>
                      </div>
                    </div>

                    {selectedDonor.gender && (
                      <div className="flex items-center space-x-3">
                        <FaUser className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-sm text-gray-600">Gender</p>
                          <p className="font-semibold">{selectedDonor.gender}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Area</p>
                        <p className="font-semibold">{selectedDonor.area}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Contact Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FaPhone className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Primary Phone</p>
                        <p className="font-semibold">{selectedDonor.primaryPhone}</p>
                      </div>
                    </div>

                    {selectedDonor.secondaryPhone && (
                      <div className="flex items-center space-x-3">
                        <FaPhone className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-sm text-gray-600">Secondary Phone</p>
                          <p className="font-semibold">{selectedDonor.secondaryPhone}</p>
                        </div>
                      </div>
                    )}

                    {selectedDonor.email && (
                      <div className="flex items-center space-x-3">
                        <FaEnvelope className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold">{selectedDonor.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              {selectedDonor.address && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Address
                  </h3>
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-red-600 mt-1" />
                    <p className="text-gray-700">{selectedDonor.address}</p>
                  </div>
                </div>
              )}

              {/* Donation History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Donation History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <FaCalendar className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Last Donation</p>
                      <p className="font-semibold">
                        {selectedDonor.lastDonation ? (
                          <>
                            {new Date(selectedDonor.lastDonation).toLocaleDateString()}
                            <span className="text-sm text-gray-600 ml-2">
                              ({getDaysSinceLastDonation(selectedDonor.lastDonation)} days ago)
                            </span>
                          </>
                        ) : (
                          'Never donated'
                        )}
                      </p>
                    </div>
                  </div>

                  {selectedDonor.registrationDate && (
                    <div className="flex items-center space-x-3">
                      <FaCalendar className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Registration Date</p>
                        <p className="font-semibold">
                          {new Date(selectedDonor.registrationDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Current Status
                </h3>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-semibold ${selectedDonor.isAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {selectedDonor.isAvailable ? (
                    <>
                      <FaCheckCircle className="w-5 h-5" />
                      <span>Available for Donation</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="w-5 h-5" />
                      <span>Not Available for Donation</span>
                    </>
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedDonor.emergencyContact && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Emergency Contact
                  </h3>
                  <p className="text-gray-700">{selectedDonor.emergencyContact}</p>
                </div>
              )}

              {/* Medical History */}
              {selectedDonor.medicalHistory && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Medical History
                  </h3>
                  <p className="text-gray-700">{selectedDonor.medicalHistory}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => toggleAvailability(selectedDonor.id)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${selectedDonor.isAvailable
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                  {selectedDonor.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button
                  onClick={closeDonorModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default DonorList;







































