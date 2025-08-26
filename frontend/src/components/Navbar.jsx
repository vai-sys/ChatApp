


// import { Link } from "react-router-dom";
// import { useAuthStore } from "../auth/Auth";
// import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();

//   return (
//     <header className="bg-emerald-500 border-b border-emerald-600 fixed w-full top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 hover:opacity-90 transition-all"
//         >
//           <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
//             <MessageSquare className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-xl font-bold text-white">Chatty</h1>
//         </Link>

//         {/* Menu Items */}
//         <div className="flex items-center gap-2">
//           {authUser ? (
//             <>
//               <Link
//                 to="/settings"
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all"
//               >
//                 <Settings className="w-4 h-4" />
//                 <span className="hidden sm:inline">Settings</span>
//               </Link>

//               <Link
//                 to="/profile"
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all"
//               >
//                 <User className="w-4 h-4" />
//                 <span className="hidden sm:inline">Profile</span>
//               </Link>

//               <button
//                 onClick={logout}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-all"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { useAuthStore } from "../auth/Auth";
import { LogOut, MessageSquare, Settings, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-emerald-500 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Chatty</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {authUser ? (
              <>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-white text-emerald-500 hover:bg-emerald-50 font-medium transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {authUser ? (
                <>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-white/10 text-white font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg bg-white text-emerald-500 font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;