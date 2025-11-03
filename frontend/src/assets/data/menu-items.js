import { BsBasket, BsHouse, BsLock } from 'react-icons/bs';
import { FaChartBar, FaRegCommentDots, FaUserCog } from 'react-icons/fa';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa6';

export const ADMIN_MENU_ITEMS = [{
  key: 'admin',
  label: 'Dashboard',
  icon: BsHouse,
  url: '/admin/dashboard'
}, {
  key: 'courses',
  label: 'Courses',
  icon: BsBasket,
  url: '/admin/courses'
}, {
  key: 'students',
  label: 'Students',
  icon: FaUserGraduate,
  url: '/admin/students'
}, {
  key: 'instructors',
  label: 'Instructors',
  icon: FaUserTie,
  url: '/admin/instructors'
}, {
  key: 'admins',
  label: 'Admins',
  icon: FaUserTie,
  url: '/admin/admins'
}, {
  key: 'earnings',
  label: 'Earnings',
  icon: FaChartBar,
  url: '/admin/earnings'
}];
