import AdminLayout from '../components/AdminLayout';
import Courses from './components/Courses';
import CoursesStat from './components/CoursesStat';
const AllCourses = () => {
  return <>
    <AdminLayout>
      <div className='p-4'>
        <CoursesStat />
        <Courses /> 
      </div>
    </AdminLayout>
    </>;
};
export default AllCourses;
