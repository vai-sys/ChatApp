import React, { useState } from "react";
import { useAuthStore } from "../auth/Auth";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signUp(formData);
      setSuccess("Account created successfully!");
      setFormData({ fullName: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900" style={{backgroundColor: '#0b141a'}}>
      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
          
           
          </div>
          <h1 className="text-2xl font-light text-white mb-2">WhatsApp</h1>
          <p className="text-gray-400 text-sm">Create your account to get started</p>
        </div>

        {/* Form Container */}
        <div className="rounded-lg p-6" style={{backgroundColor: '#202c33'}}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{backgroundColor: '#2a1810', color: '#ff6b6b'}}>
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{backgroundColor: '#0f2419', color: '#00d4aa'}}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-0 transition-all"
                style={{
                  backgroundColor: '#2a3942',
                  focusRingColor: '#00a884'
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-0 transition-all"
                style={{
                  backgroundColor: '#2a3942',
                  focusRingColor: '#00a884'
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 border-0 transition-all"
                style={{
                  backgroundColor: '#2a3942',
                  focusRingColor: '#00a884'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full py-3 rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{
                backgroundColor: isSigningUp ? '#4a5258' : '#00a884'
              }}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs leading-relaxed">
              By creating an account, you agree to WhatsApp's{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>

        
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <span className="text-blue-400 hover:underline cursor-pointer font-medium">
              <Link to="/login" >Sign in here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;