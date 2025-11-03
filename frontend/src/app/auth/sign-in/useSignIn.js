"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "@/redux/authSlice";

export default function useSignIn() {
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [loading, setLoading] = useState(false);

  const login = handleSubmit(async (data) => {
    setLoading(true);
    try {
      // 1. XÓA BỎ LOGIC COOKIE
      // axios.defaults.withCredentials = true; // <-- BỎ DÒNG NÀY

      // 2. Gọi API login (không cần config)
      const response = await axios.post(`${backendUrl}/api/admin/login`, data);

      if (response.data.success && response.data.token) {
        // 3. LẤY TOKEN TỪ RESPONSE VÀ LƯU VÀO LOCALSTORAGE
        const { token, user } = response.data;
        localStorage.setItem('adminToken', token); // <-- QUAN TRỌNG NHẤT

        // 4. Dispatch thông tin user (nếu backend trả về)
        if (user) {
           dispatch(setLogin(user));
        } else {
           // Nếu backend không trả user, bạn có thể gọi /api/user/profile
           // NHƯNG phải dùng token mới
           const profileConfig = {
             headers: { Authorization: `Bearer ${token}` }
           };
           const profile = await axios.get(`${backendUrl}/api/user/profile`, profileConfig);
           if (profile.data.success) {
             dispatch(setLogin(profile.data.user));
           }
        }
       
        toast.success("Login successful!");
        router.push("/admin/dashboard");
      } else {
        toast.error(response.data.message || "Invalid credentials or token missing");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
      reset();
    }
  });

  return {
    loading,
    login,
    control,
  };
}