import { coursesData } from '@/assets/data/products';
import { Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { BsEnvelopeFill, BsPencilSquare, BsThreeDots, BsTrash } from 'react-icons/bs';
import { FaAngleLeft, FaAngleRight, FaBook, FaListUl, FaRegStar, FaSearch, FaStar, FaStarHalfAlt, FaThLarge, FaUserGraduate } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';
import Courses from './components/Courses';

const InstructorsCard = ({
  name,
  category,
  avatar,
  students,
  totalCourses,
  rating
}) => {
  return <Col md={6} xxl={4}>
    <Card className="bg-transparent border h-100">
      <CardHeader className="bg-transparent border-bottom d-flex align-items-sm-center justify-content-between">
        <div className="d-sm-flex align-items-center">
          <div className="avatar avatar-md flex-shrink-0">
            <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
          </div>
          <div className="ms-0 ms-sm-2 mt-2 mt-sm-0">
            <h5 className="mb-0">
              <a href="#">{name}</a>
            </h5>
            <p className="mb-0 small">{category}</p>
          </div>
        </div>
        <Dropdown drop="down" align="end">
          <DropdownToggle className="btn btn-sm btn-light btn-round small mb-0 arrow-none">
            <BsThreeDots />
          </DropdownToggle>
          <DropdownMenu className="dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded">
            <DropdownItem href="#">
              <BsPencilSquare className="me-2" />
              Edit
            </DropdownItem>
            <DropdownItem href="#">
              <BsTrash className="me-2" />
              Remove
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle flex-shrink-0">
              <FaUserGraduate />
            </div>
            <h6 className="mb-0 ms-2 fw-light">Total Students</h6>
          </div>
          <span className="mb-0 fw-bold">{students}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0">
              <FaBook />
            </div>
            <h6 className="mb-0 ms-2 fw-light">Total Courses</h6>
          </div>
          <span className="mb-0 fw-bold">{totalCourses}</span>
        </div>
      </CardBody>
      <CardFooter className="bg-transparent border-top">
        <div className="d-flex justify-content-between align-items-center">
          <ul className="list-inline mb-0">
            {Array(Math.floor(rating.star)).fill(0).map((_star, idx) => <li key={idx} className="list-inline-item me-1 small">
              <FaStar size={14} className="text-warning" />
            </li>)}
            {!Number.isInteger(rating.star) && <li className="list-inline-item me-1 small">

              <FaStarHalfAlt size={14} className="text-warning" />
            </li>}
            {rating.star < 5 && Array(5 - Math.ceil(rating.star)).fill(0).map((_star, idx) => <li key={idx} className="list-inline-item me-1 small">
              <FaRegStar size={14} className="text-warning" />
            </li>)}
          </ul>
        </div>
      </CardFooter>
    </Card>
  </Col>;
};
const InstructorsPage = () => {
  return <>
    <AdminLayout>
      <div className="pb-4">
        <h1 className="h3 mb-3">Instructors</h1>
        <Courses />
      </div>
    </AdminLayout>
  </>;
};
export default InstructorsPage;
