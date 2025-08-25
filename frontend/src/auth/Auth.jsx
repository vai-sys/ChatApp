import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log("Auth check:", res.data);
    } catch (err) {
      console.log("CheckAuth error:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      console.log("Signup success:", res.data);
      return res.data;
    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
      throw err.response?.data || err;
    } finally {
      set({ isSigningUp: false });
    }
  },
}));





// import {create } from "zustand"
// import {axiosInstance} from "../lib/axios.js"

// export const useAuthStore= create((set)=>({
// authUser:null,
// isSigningUp:false,
// isLoggingIn:false,
// isUpdatingProfile:false,

// isCheckingAuth:true,
// checkAuth:async()=>{
//     try{
//      const res=await axiosInstance.get("/auth/check");
//      set({authUser:res.data})
//      console.log(res);
//     }
//     catch(err){
//     console.log(err);
//      set({authUser:null})
//     }
//     finally{
//          set({isCheckingAuth:false})
//     }
// }
// ,

// signUp:async (data)=>{

// }
// }));


