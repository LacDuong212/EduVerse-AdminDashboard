'use client';

import dynamic from 'next/dynamic';
import { Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { BsGearFill, BsGlobe, BsPower } from 'react-icons/bs';
import useViewPort from '@/hooks/useViewPort';
import { useLayoutContext } from '@/context/useLayoutContext';
import AppMenu from '@/components/admin/AppMenu';

const NavbarTopbar = dynamic(
  () => import('@/components/adminLayoutComponents/NavbarTopbar'),
  { ssr: false }
);

const AdminLayout = ({ children }) => {
  const { width } = useViewPort();
  const { appMenuControl } = useLayoutContext();

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div
          className="col-xl-2 col-auto p-0 bg-dark position-sticky top-0 vh-100 d-flex flex-column"
          style={{ zIndex: 1020 }}
        >
          {width >= 1200 ? (
            <>
              <AppMenu />
              <div className="mt-auto px-3 py-3 d-flex justify-content-between text-primary-hover">
                <Link href="/admin/dashboard"><BsGearFill /></Link>
                <Link href="/admin/dashboard"><BsGlobe /></Link>
                <Link href="/auth/sign-in"><BsPower /></Link>
              </div>
            </>
          ) : (
            <Offcanvas show={appMenuControl.open} placement="start" onHide={appMenuControl.toggle}>
              <Offcanvas.Body className="d-flex flex-column bg-dark">
                <AppMenu />
                <div className="mt-auto px-3 py-3 d-flex justify-content-between text-primary-hover">
                  <Link href="/admin/dashboard"><BsGearFill /></Link>
                  <Link href="/admin/dashboard"><BsGlobe /></Link>
                  <Link href="/auth/sign-in"><BsPower /></Link>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          )}
        </div>

        {/* Main content */}
        <div
          className="col p-0 d-flex flex-column"
          style={{
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          {/* Topbar */}
          <NavbarTopbar />

          {/* Page content */}
          <div className="page-content-wrapper flex-grow-1 p-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
