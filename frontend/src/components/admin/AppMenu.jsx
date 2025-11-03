'use client';

import { findAllParent, findMenuItem, getAdminMenuItems, getMenuItemFromURL } from '@/helpers/menu';
import useToggle from '@/hooks/useToggle';
import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuItem = ({ item, itemClassName, linkClassName }) => {
  const Icon = item.icon;
  return (
    <li className={itemClassName}>
      <Link href={item.url ?? ''} target={item.target} className={linkClassName}>
        <div className="d-flex align-items-center text-light">
          {Icon && <Icon className="me-2" />}
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <Badge className="ms-2 rounded-circle" bg="success">
            {item.badge}
          </Badge>
        )}
      </Link>
    </li>
  );
};

const AdminMenu = () => {
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const menuItems = getAdminMenuItems();
  const pathname = usePathname();

  const activeMenu = useCallback(() => {
    const trimmedURL = pathname?.replaceAll('', '');
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);
    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([activeMt.key, ...findAllParent(menuItems, activeMt)]);
      }
    }
  }, [pathname, menuItems]);

  useEffect(() => {
    activeMenu();
  }, [activeMenu, menuItems]);

  return (
    <ul className="navbar-nav flex-column py-5 px-5">
      {(menuItems ?? []).map((item, idx) => (
        <div key={idx + item.key}>
          <br />
          <Fragment>
            {item.isTitle ? (
              <li className="nav-item ms-2 my-2">{item.label}</li>
            ) : (
              <MenuItem
                item={item}
                activeMenuItems={activeMenuItems}
                itemClassName="nav-item"
                linkClassName={clsx('nav-link', { active: activeMenuItems.includes(item.key) })}
              />
            )}
          </Fragment>
        </div>
      ))}
    </ul>
  );
};

export default AdminMenu;
