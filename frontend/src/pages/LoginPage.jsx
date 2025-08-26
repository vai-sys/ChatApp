// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../auth/Auth";
// import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const { login, isLoggingIn } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.email.trim()) return "Email is required";
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid";
//     if (!formData.password) return "Password is required";
//     if (formData.password.length < 6) return "Password must be at least 6 characters";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setError("");
//       await login(formData);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
        
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg">
//             <MessageSquare className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to continue your conversations</p>
//         </div>

       
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
           
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

         
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   required
//                   className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-black bg-green-500 focus:bg-white text-gray-900"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   required
//                   className="block w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-black bg-green-500 focus:bg-white text-gray-900"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>

          
//             <div className="flex items-center justify-end">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-emerald-600 hover:text-emerald-500 font-medium"
//               >
//                 Forgot your password?
//               </Link>
//             </div>

            
//             <button
//               type="submit"
//               disabled={isLoggingIn}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6">
//             <Link
//               to="/signup"
//               className="w-full flex justify-center py-3 px-4 border border-emerald-500 rounded-lg shadow-sm text-sm font-medium text-emerald-500 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
//             >
//               Create new account
//             </Link>
//           </div>
//         </div>

      
//         <div className="text-center mt-8">
//           <p className="text-xs text-gray-500">
//             By signing in, you agree to our{" "}
//             <a href="#" className="text-emerald-500 hover:text-emerald-600 transition-colors">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-emerald-500 hover:text-emerald-600 transition-colors">
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setIsLoggingIn(true);
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Login successful!");
      setIsLoggingIn(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your conversations</p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
           
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

         
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-gray-400 bg-emerald-50 focus:bg-white text-gray-900 hover:bg-white"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  className="block w-full pl-10 pr-10 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-gray-400 bg-emerald-50 focus:bg-white text-gray-900 hover:bg-white"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-emerald-500" />
                  )}
                </button>
              </div>
            </div>

          
            <div className="flex items-center justify-end">
              <button className="text-sm text-emerald-600 hover:text-emerald-500 font-medium">
                Forgot your password?
              </button>
            </div>

            
            <button
              type="submit"
              disabled={isLoggingIn}
              onClick={handleSubmit}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex justify-center py-3 px-4 border border-emerald-500 rounded-lg shadow-sm text-sm font-medium text-emerald-500 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
              Create new account
            </button>
          </div>
        </div>

      
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-emerald-500 hover:text-emerald-600 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-500 hover:text-emerald-600 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;