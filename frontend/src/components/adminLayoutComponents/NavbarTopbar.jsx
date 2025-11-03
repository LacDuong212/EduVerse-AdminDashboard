'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import useToggle from '@/hooks/useToggle';
import { useLayoutContext } from '@/context/useLayoutContext';
import logoImg from '@/assets/images/logo/logo.svg';

const NavbarTopbar = () => {
  const { isTrue, toggle: toggles } = useToggle();
  const { appMenuControl } = useLayoutContext();

  return (
    <nav className="navbar top-bar navbar-light border-bottom py-2">
      <Container fluid className="p-0">
        <div className="d-flex align-items-center w-100 px-4">

          {/* Sidebar toggle */}
          <div className="navbar-expand-xl sidebar-offcanvas-menu">
            <button
              className="navbar-toggler me-auto"
              onClick={appMenuControl.toggle}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasSidebar"
              aria-controls="offcanvasSidebar"
              aria-expanded="false"
              aria-label="Toggle navigation"
              data-bs-auto-close="outside"
            >
              <BsList className="bi bi-text-right fa-fw h2 lh-0 mb-0 rtl-flip" />
            </button>
          </div>

          
          <Link href="/admin/dashboard" className='d-none d-xl-block mx-auto'>
            <Image src={logoImg} alt="logo" width={120} height={40} />
          </Link>
          
        </div>
      </Container>
    </nav>
  );
};

export default NavbarTopbar;
