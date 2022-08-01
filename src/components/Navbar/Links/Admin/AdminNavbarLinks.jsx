import React, { useState, useEffect } from 'react';
import { NavLink } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { ADMIN_NAVBAR_LINKS_DATA } from '../../../../services/constants/adminNavbarLinksData';

const AdminNavbarLinks = ({ onOpened }) => {
  let params = useParams();
  let navigate = useNavigate();

  const [active, setActive] = useState(null);

  useEffect(() => {
    const findIndex = ADMIN_NAVBAR_LINKS_DATA.findIndex(
      (items) => items.link === params.client
    );

    if (findIndex === -1) {
      setActive(0);
    } else {
      setActive(findIndex);
    }
  }, []);

  return (
    <>
      {console.log(active)}
      {ADMIN_NAVBAR_LINKS_DATA.map((item, index) => {
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

export default AdminNavbarLinks;
