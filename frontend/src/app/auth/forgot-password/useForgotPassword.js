"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useForgotPassword(onForgotSuccess) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email) => {
    if (loading) return;
    setLoading(true);

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/forgot-password`, { email });

      if (data.success) {
        toast.success(data.message || "OTP has been sent to your email.");
        if (onForgotSuccess) onForgotSuccess(email);
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgotPassword };
}
