import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import MenuContainer from './menu/MenuContainer';
import BillContainer from './bill/BillContainer';
import TableContainer from './TableContainer';
import SeatContainer from './seats/SeatContainer';
import Axios from 'axios';

import './Home.scss';

export default function Home(props) {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState({});
  const [seat, setSeat] = useState({});
  useEffect(() => {
    Axios.get('/api/menu').then((res) => {
      setMenu(res.data);
    });
    Axios.get('/api/tables').then((res) => {
      setTables(res.data);
    });
  }, []);

  if (!user.auth) {
    return <Redirect to="/login" />;
  }
  console.log(seat);
  return (
    <div>
      <div className="home-main">
        <div className="logged-in">
          <h1>Hello, {user.name}!</h1>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="container">
          <BillContainer
            bill={props.bill}
            tableInfo={table}
            menu={menu}
            setBill={props.setBill}
            setTable={setTable}
          />
          <MenuContainer
            menu={menu}
            setBill={props.setBill}
            bill={props.bill}
          />
          <div className="table-selectors">
            <TableContainer
              tables={tables}
              setTable={setTable}
              setBill={props.setBill}
              table={table}
            />
            <SeatContainer setSeat={setSeat} table={table} seat={seat} />
          </div>
        </div>
      </div>
    </div>
  );
}
