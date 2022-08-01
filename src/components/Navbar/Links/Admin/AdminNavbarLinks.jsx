import React, { useState } from 'react';
import { NavLink } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { ADMIN_NAVBAR_LINKS } from '../../../../services/constants/AdminNavbarLinks';

const AdminNavbarLinks = ({ onOpened }) => {
  let params = useParams();
  let navigate = useNavigate();

  const [active, setActive] = useState(ADMIN_NAVBAR_LINKS.findIndex((items) => items.link === params.client));

  return (
    <>
      {console.log()}
      {ADMIN_NAVBAR_LINKS.map((item, index) => {
        return (
          <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            icon={<item.icon size={16} />}
            onClick={() => {
              setActive(index);
              navigate(`/client/${item.link}`);
              onOpened();
            }}
          />
        );
      })}
    </>
  );
};

export default AdminNavbarLinks;
