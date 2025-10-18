
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPlay, FaFilm } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
const LoginPage = () => {
    const { SignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await SignIn(data.email, data.password);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
       
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(239, 68, 68, 0.3) 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Side - Branding */}
                <div className="text-center lg:text-left space-y-8">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-2xl shadow-2xl">
                            <FaFilm className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">
                            Quick<span className="text-red-600">Show</span>
                        </h1>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                        Welcome Back to <br />
                        <span className="text-red-600">Premium Cinema</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                        Experience the magic of movies with exclusive content, premium streaming, and personalized recommendations.
                    </p>

                    {/* Features List */}
                    <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                        {[
                            '4K Ultra HD Streaming',
                            'Exclusive Movie Content',
                            'Personalized Recommendations',
                            'Multi-Device Support'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-sm lg:text-base">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-10">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white">Sign In</h3>
                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-400">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
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
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                    className="block w-full pl-12 pr-12 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Enter your password"
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    {...register('rememberMe')}
                                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-600 rounded bg-gray-700/50"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200 font-medium"
                            >
                                Forgot password?
                            </button>
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
                                    <FaPlay className="w-4 h-4" />
                                    Sign In
                                </>
                            )}
                        </button>

                        {/* Social Login */}
                       
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link 
                                to="/register" 
                                className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-200"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-10 left-10 w-24 h-24 bg-red-600/5 rounded-full blur-2xl"></div>
        </div>
    );
};

export default LoginPage;