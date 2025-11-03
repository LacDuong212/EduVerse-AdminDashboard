"use client"; // 1. Thêm "use client"

import Counter from './components/Counter';
import Earnings from './components/Earnings';
import AdminLayout from '../components/AdminLayout';

const AdminDashboardPage = () => {
  return <>
    <AdminLayout>
      <div className='p-4'>
        <h1 className="h3 mb-3">Dashboard</h1>
        <Counter />
        <Earnings />
      </div>
      
    </AdminLayout>
    
  </>;
};
export default AdminDashboardPage;