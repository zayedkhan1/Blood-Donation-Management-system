
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaStar, FaTicketAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const RegisterPage = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await createUser(data.email, data.password);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
           
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30px 30px, rgba(239, 68, 68, 0.3) 2px, transparent 0)`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Side - Benefits */}
                <div className="text-center lg:text-left space-y-8">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-2xl shadow-2xl">
                            <FaTicketAlt className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">
                            Join <span className="text-red-600">QuickShow</span>
                        </h1>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                        Start Your Cinematic <br />
                        <span className="text-red-600">Journey Today</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                        Create your account and unlock exclusive features, personalized recommendations, and premium streaming experience.
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                        {[
                            {
                                icon: FaStar,
                                title: 'Premium Content',
                                description: 'Access exclusive movies and early releases'
                            },
                            {
                                icon: FaTicketAlt,
                                title: 'Personalized Experience',
                                description: 'Get recommendations based on your taste'
                            },
                            {
                                icon: FaUser,
                                title: 'Multiple Profiles',
                                description: 'Create up to 5 profiles for your family'
                            },
                            {
                                icon: FaLock,
                                title: 'Secure & Private',
                                description: 'Your data is protected with encryption'
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                <div className="bg-red-600/20 p-3 rounded-lg flex-shrink-0">
                                    <benefit.icon className="w-5 h-5 text-red-400" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white font-semibold text-lg">{benefit.title}</h4>
                                    <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-10">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white">Create Account</h3>
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-400">Join thousands of movie enthusiasts</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-3">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
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
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.fullName && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                    <span>•</span>
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
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
                                    className="block w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                    <span>•</span>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: 'Must include uppercase, lowercase, and number',
                                        },
                                    })}
                                    className="block w-full pl-12 pr-12 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5" />
                                    ) : (
                                        <FaEye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                    <span>•</span>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-3">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value =>
                                            value === password || 'Passwords do not match',
                                    })}
                                    className="block w-full pl-12 pr-12 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200"
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash className="h-5 w-5" />
                                    ) : (
                                        <FaEye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                    <span>•</span>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    {...register('terms', {
                                        required: 'You must accept the terms and conditions',
                                    })}
                                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-600 rounded bg-gray-700/50 mt-1"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-300">
                                    I agree to the{' '}
                                    <button type="button" className="text-red-400 hover:text-red-300 transition-colors duration-200 font-medium">
                                        Terms and Conditions
                                    </button>{' '}
                                    and{' '}
                                    <button type="button" className="text-red-400 hover:text-red-300 transition-colors duration-200 font-medium">
                                        Privacy Policy
                                    </button>
                                </label>
                                {errors.terms && (
                                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                                        <span>•</span>
                                        {errors.terms.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <FaTicketAlt className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </button>

                    
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-8 right-8 w-28 h-28 bg-red-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-8 left-8 w-20 h-20 bg-red-600/5 rounded-full blur-2xl"></div>
        </div>
    );
};

export default RegisterPage;