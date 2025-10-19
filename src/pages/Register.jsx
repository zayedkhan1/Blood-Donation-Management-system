
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHeart, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaArrowRight, FaAmbulance, FaCheckCircle, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const RegisterPage = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError('');
        try {
            await createUser(data.email, data.password, data.fullName);
            navigate('/login');

        } catch (error) {
            console.error('Registration error:', error);
            setAuthError(error.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const password = watch('password');

    return (
        <div className="min-h-screen mt-15 bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating Blood Cells */}
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
                        <div className="w-3 h-3 bg-red-300 rounded-full opacity-30 transform rotate-45"></div>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Side - Benefits & Information */}
                <div className="text-center lg:text-left space-y-8">
                    {/* Logo & Brand */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <div className="bg-white p-4 rounded-2xl shadow-2xl">
                            <FaHeart className="w-8 h-8 text-red-600 animate-pulse" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">
                            Join <span className="text-red-200">BloodDonor</span>
                        </h1>
                    </div>

                    {/* Hero Text */}
                    <div className="space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                            Become a <br />
                            <span className="text-red-200">Life Saver</span>
                        </h2>

                        <p className="text-red-100 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                            Join our community of heroes. Your single blood donation can save up to 3 lives.
                        </p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                        {[
                            {
                                icon: FaHeart,
                                title: 'Save Lives Instantly',
                                description: 'Your donation can help multiple patients'
                            },
                            {
                                icon: FaShieldAlt,
                                title: 'Verified & Secure',
                                description: 'Complete privacy and data protection'
                            },
                            {
                                icon: FaAmbulance,
                                title: 'Emergency Response',
                                description: 'Be there when someone needs you most'
                            },
                            {
                                icon: FaUsers,
                                title: 'Join 50K+ Donors',
                                description: 'Be part of a growing life-saving community'
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                                <div className="bg-white p-3 rounded-lg flex-shrink-0">
                                    <benefit.icon className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white font-semibold text-lg">{benefit.title}</h4>
                                    <p className="text-red-100 text-sm mt-1">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Impact Statistics */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">50K+</div>
                            <div className="text-xs text-red-100">Lives Saved</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">25K+</div>
                            <div className="text-xs text-red-100">Active Donors</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-xs text-red-100">Service</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white">Become a Donor</h3>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <p className="text-red-100">Join our life-saving community today</p>
                    </div>

                    <div className="p-8">
                        {/* Error Message */}
                        {authError && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                                <div className="flex items-center space-x-2 text-red-700">
                                    <FaHeart className="w-4 h-4" />
                                    <span className="text-sm font-medium">{authError}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                    <FaUser className="w-4 h-4 text-red-600 mr-2" />
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <input
                                        id="fullName"
                                        type="text"
                                        {...register('fullName', {
                                            required: 'Full name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Name must be at least 2 characters',
                                            },
                                        })}
                                        className="block w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                    <FaEnvelope className="w-4 h-4 text-red-600 mr-2" />
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className="block w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                    <FaLock className="w-4 h-4 text-red-600 mr-2" />
                                    Password
                                </label>
                                <div className="relative group">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters',
                                            },
                                        })}
                                        className="block w-full px-4 pr-12 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                                        placeholder="Create a strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <FaEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-gray-700 mb-3">
                                    <FaLock className="w-4 h-4 text-red-600 mr-2" />
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register('confirmPassword', {
                                            required: 'Please confirm your password',
                                            validate: value =>
                                                value === password || 'Passwords do not match',
                                        })}
                                        className="block w-full px-4 pr-12 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className="h-5 w-5" />
                                        ) : (
                                            <FaEye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start p-4 bg-red-50 rounded-xl border border-red-200">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        {...register('terms', {
                                            required: 'You must accept the terms and conditions',
                                        })}
                                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded mt-1"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-700">
                                        I agree to the{' '}
                                        <button type="button" className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium">
                                            Terms and Conditions
                                        </button>{' '}
                                        and{' '}
                                        <button type="button" className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium">
                                            Privacy Policy
                                        </button>
                                    </label>
                                    {errors.terms && (
                                        <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                                            {errors.terms.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Eligibility Notice */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-start space-x-3">
                                    <FaCheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-800">Eligibility Requirements</p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Must be 18-65 years old, weigh at least 50kg, and be in good health condition.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FaHeart className="w-4 h-4" />
                                        Join as Blood Donor
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Already a donor?{' '}
                                <Link
                                    to="/login"
                                    className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>


                    </div>
                </div>
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

export default RegisterPage;