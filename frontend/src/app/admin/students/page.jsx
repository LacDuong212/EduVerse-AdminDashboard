"use client"; // 1. Thêm "use client"

import PageMetaData from '@/components/PageMetaData';
import { Col, Row } from 'react-bootstrap';
import AllStudents from './components/AllStudents'; // 2. Đảm bảo đường dẫn này đúng
import AdminLayout from '../components/AdminLayout';

const StudentPage = () => {
  return <>
    <AdminLayout>
      <PageMetaData title="Student" />
      <Row>
        <Col xs={12}>
          <h1 className="h3 mb-2 mb-sm-0">Students</h1>
        </Col>
      </Row>
      <AllStudents />
    </AdminLayout>
  </>;
};
export default StudentPage;