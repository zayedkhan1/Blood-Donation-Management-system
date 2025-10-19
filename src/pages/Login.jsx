
// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaUser, FaLock, FaEye, FaEyeSlash, FaPlay, FaFilm } from 'react-icons/fa';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthProvider';
// const LoginPage = () => {
//     const { SignIn } = useContext(AuthContext);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from || '/';

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = async (data) => {
//         setIsLoading(true);
//         try {
//             await SignIn(data.email, data.password);
//             navigate(from, { replace: true });
//         } catch (error) {
//             console.error('Login error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">

//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//                 <div className="absolute inset-0" style={{
//                     backgroundImage: `radial-gradient(circle at 25px 25px, rgba(239, 68, 68, 0.3) 2px, transparent 0)`,
//                     backgroundSize: '50px 50px'
//                 }}></div>
//             </div>

//             <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
//                 {/* Left Side - Branding */}
//                 <div className="text-center lg:text-left space-y-8">
//                     <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
//                         <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-2xl shadow-2xl">
//                             <FaFilm className="w-8 h-8 text-white" />
//                         </div>
//                         <h1 className="text-4xl lg:text-5xl font-bold text-white">
//                             Quick<span className="text-red-600">Show</span>
//                         </h1>
//                     </div>

//                     <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
//                         Welcome Back to <br />
//                         <span className="text-red-600">Premium Cinema</span>
//                     </h2>

//                     <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
//                         Experience the magic of movies with exclusive content, premium streaming, and personalized recommendations.
//                     </p>

//                     {/* Features List */}
//                     <div className="space-y-4 max-w-md mx-auto lg:mx-0">
//                         {[
//                             '4K Ultra HD Streaming',
//                             'Exclusive Movie Content',
//                             'Personalized Recommendations',
//                             'Multi-Device Support'
//                         ].map((feature, index) => (
//                             <div key={index} className="flex items-center gap-3 text-gray-300">
//                                 <div className="w-2 h-2 bg-red-600 rounded-full"></div>
//                                 <span className="text-sm lg:text-base">{feature}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Right Side - Login Form */}
//                 <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-10">
//                     {/* Form Header */}
//                     <div className="text-center mb-8">
//                         <div className="flex items-center justify-center gap-3 mb-4">
//                             <div className="w-3 h-3 bg-red-600 rounded-full"></div>
//                             <h3 className="text-2xl lg:text-3xl font-bold text-white">Sign In</h3>
//                             <div className="w-3 h-3 bg-red-600 rounded-full"></div>
//                         </div>
//                         <p className="text-gray-400">Enter your credentials to access your account</p>
//                     </div>

//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         {/* Email Field */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
//                                 Email Address
//                             </label>
//                             <div className="relative group">
//                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                                     <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
//                                 </div>
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     {...register('email', {
//                                         required: 'Email is required',
//                                         pattern: {
//                                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                             message: 'Invalid email address',
//                                         },
//                                     })}
//                                     className="block w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
//                                     placeholder="Enter your email"
//                                 />
//                             </div>
//                             {errors.email && (
//                                 <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
//                                     <span>•</span>
//                                     {errors.email.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Password Field */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
//                                 Password
//                             </label>
//                             <div className="relative group">
//                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                                     <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
//                                 </div>
//                                 <input
//                                     id="password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     {...register('password', {
//                                         required: 'Password is required',
//                                         minLength: {
//                                             value: 6,
//                                             message: 'Password must be at least 6 characters',
//                                         },
//                                     })}
//                                     className="block w-full pl-12 pr-12 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
//                                     placeholder="Enter your password"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={togglePasswordVisibility}
//                                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200"
//                                 >
//                                     {showPassword ? (
//                                         <FaEyeSlash className="h-5 w-5" />
//                                     ) : (
//                                         <FaEye className="h-5 w-5" />
//                                     )}
//                                 </button>
//                             </div>
//                             {errors.password && (
//                                 <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
//                                     <span>•</span>
//                                     {errors.password.message}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Remember Me & Forgot Password */}
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                                 <input
//                                     id="remember-me"
//                                     type="checkbox"
//                                     {...register('rememberMe')}
//                                     className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-600 rounded bg-gray-700/50"
//                                 />
//                                 <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
//                                     Remember me
//                                 </label>
//                             </div>
//                             <button
//                                 type="button"
//                                 className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200 font-medium"
//                             >
//                                 Forgot password?
//                             </button>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
//                         >
//                             {isLoading ? (
//                                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             ) : (
//                                 <>
//                                     <FaPlay className="w-4 h-4" />
//                                     Sign In
//                                 </>
//                             )}
//                         </button>

//                         {/* Social Login */}

//                     </form>

//                     {/* Sign Up Link */}
//                     <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
//                         <p className="text-sm text-gray-400">
//                             Don't have an account?{' '}
//                             <Link 
//                                 to="/register" 
//                                 className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-200"
//                             >
//                                 Create Account
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Floating Elements */}
//             <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
//             <div className="absolute top-10 left-10 w-24 h-24 bg-red-600/5 rounded-full blur-2xl"></div>
//         </div>
//     );
// };

// export default LoginPage;



import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHeart, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight, FaUserPlus, FaAmbulance, FaShieldAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const LoginPage = () => {
    const { SignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');

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
        setAuthError('');
        try {
            await SignIn(data.email, data.password);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            setAuthError(error.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen mt-15 bg-gradient-to-br from-red-300 via-red-400 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating Blood Cells */}
            <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
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
                {/* Left Side - Branding & Information */}
                <div className="text-center lg:text-left space-y-8">
                    {/* Logo & Brand */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                        <div className="bg-white p-4 rounded-2xl shadow-2xl">
                            <FaHeart className="w-8 h-8 text-red-600 animate-pulse" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">
                            Blood<span className="text-red-200">Donor</span>
                        </h1>
                    </div>

                    {/* Hero Text */}
                    <div className="space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                            Welcome Back, <br />
                            <span className="text-red-200">Life Saver</span>
                        </h2>

                        <p className="text-red-100 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                            Continue your journey of saving lives. Your single donation can save up to 3 people.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                        {[
                            { icon: FaShieldAlt, text: 'Secure & Verified Donors' },
                            { icon: FaAmbulance, text: '24/7 Emergency Service' },
                            { icon: FaHeart, text: 'Save Lives Instantly' },
                            { icon: FaUserPlus, text: 'Join 50K+ Donors' }
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 text-red-100 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                <feature.icon className="w-5 h-5 text-white" />
                                <span className="text-sm lg:text-base">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto lg:mx-0">
                        <div className="flex items-center gap-3 mb-3">
                            <FaAmbulance className="w-6 h-6 text-white" />
                            <h3 className="text-lg font-semibold text-white">Emergency Need Blood?</h3>
                        </div>
                        <p className="text-red-100 text-sm mb-3">Call our 24/7 emergency helpline</p>
                        <div className="bg-red-500 text-white px-4 py-3 rounded-xl text-center">
                            <div className="text-2xl font-bold">106</div>
                            <div className="text-xs opacity-90">Available 24/7</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-white">Sign In</h3>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <p className="text-red-100">Access your donor dashboard</p>
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
                                        placeholder="Enter your password"
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        {...register('rememberMe')}
                                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200 font-medium"
                                >
                                    Forgot password?
                                </button>
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
                                        <FaArrowRight className="w-4 h-4" />
                                        Sign In to Dashboard
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                New to BloodDonor?{' '}
                                <Link
                                    to="/register"
                                    className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                                >
                                    Join as Donor
                                </Link>
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                            <div className="bg-red-50 rounded-xl p-3">
                                <div className="text-lg font-bold text-red-600">50K+</div>
                                <div className="text-xs text-gray-600">Lives Saved</div>
                            </div>
                            <div className="bg-red-50 rounded-xl p-3">
                                <div className="text-lg font-bold text-red-600">25K+</div>
                                <div className="text-xs text-gray-600">Active Donors</div>
                            </div>
                            <div className="bg-red-50 rounded-xl p-3">
                                <div className="text-lg font-bold text-red-600">24/7</div>
                                <div className="text-xs text-gray-600">Service</div>
                            </div>
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

export default LoginPage;