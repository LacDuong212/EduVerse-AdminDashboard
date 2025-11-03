"use client"; // 1. Thêm "use client" (vì file này dùng localStorage)

import axios from "axios";

// 2. Thay đổi biến môi trường
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// --- CÁC HÀM GỌI API (Đã sửa backendUrl, giữ nguyên logic localStorage) ---

export const getAllStudents = async (page = 1, search = "") => {
  try {
    const token = localStorage.getItem("adminToken"); // Giữ nguyên
    const response = await axios.get(`${backendUrl}/api/admin/students?page=${page}&limit=5&search=${encodeURIComponent(search)}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return response.data;
    }
    return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
  } catch (error) {
    console.error("Error fetching students:", error);
    return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
  }
};
export const getAllInstructors = async (page = 1, search = "") => {
  try {
    const token = localStorage.getItem("adminToken"); // Giữ nguyên
    const response = await axios.get(`${backendUrl}/api/admin/instructors?page=${page}&limit=5&search=${encodeURIComponent(search)}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return response.data;
    }
    return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
  } catch (error) {
    console.error("Error fetching instructor:", error);
    return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
  }
};
export const getAllAdminitrators = async (page = 1, search = "") => {
  try {
    const token = localStorage.getItem("adminToken"); // Giữ nguyên
    const response = await axios.get(`${backendUrl}/api/admin/admins?page=${page}&limit=7&search=${encodeURIComponent(search)}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      return response.data;
    }
    return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
  } catch (error) {
    console.error("Error fetching administrators:", error);
    return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken"); // Giữ nguyên
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const blockStudent = async (id) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/api/admin/students/${id}/block`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error blocking student:", error);
    return { success: false, message: error.message };
  }
};

export const unblockStudent = async (id) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/api/admin/students/${id}/unblock`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error unblocking student:", error);
    return { success: false, message: error.message };
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/admin/students/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, message: error.message };
  }
};

export const blockInstructor = async (id) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/api/admin/instructors/${id}/block`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error blocking instructor:", error);
    return { success: false, message: error.message };
  }
};

export const unblockInstructor = async (id) => {
  try {
    const response = await axios.patch(
      `${backendUrl}/api/admin/instructors/${id}/unblock`,
      {},
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error unblocking instructor:", error);
    return { success: false, message: error.message };
  }
};