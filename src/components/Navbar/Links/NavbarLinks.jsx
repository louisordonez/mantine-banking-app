import React, { useState, useEffect } from 'react';
import { NavLink } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { getRole } from '../../../services/utilities/getRole';
import { ADMIN_NAVBAR_LINKS_DATA, USER_NAVBAR_LINKS_DATA } from '../../../services/constants/navbarLinksData';

const NavbarLinks = ({ onOpened }) => {
  let params = useParams();
  let navigate = useNavigate();
  let navData;

  getRole() === 'admin' ? (navData = ADMIN_NAVBAR_LINKS_DATA) : (navData = USER_NAVBAR_LINKS_DATA);

  const [active, setActive] = useState(null);

  useEffect(() => {
    const findIndex = navData.findIndex((items) => items.link === params.client);

    if (findIndex === -1) {
      setActive(0);
    } else {
      setActive(findIndex);
    }
  }, [navData, params.client]);

  return (
    <>
      {navData.map((item, index) => {
        return (
          <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            icon={<item.icon size={16} />}
            onClick={() => {
              setActive(index);
              navigate(`/${item.link}`);
              onOpened();
            }}
            color="green"
          />
        );
      })}
    </>
  );
};

export default NavbarLinks;
