import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '../tabs';
import Filter from '../filter';
import TicketList from '../tiketsList';
import { fetchId, fetchTickets } from '../../redux/ticketSlice';

import clasess from './app.module.scss';
const App = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.tickets.id);
  useEffect(() => {
    dispatch(fetchId());
  }, []);
  let t = 0;
  useEffect(() => {
    if (id && t === 0) {
      dispatch(fetchTickets(id));
      t++;
    }
  }, [id]);
  return (
    <div className={clasess.app}>
      <div className={clasess['app__img']}>
        <img src="/imgs/Logotype.svg" alt="logo"></img>
      </div>
      <div className={`${clasess['app__container']} ${clasess.container}`}>
        <Tabs />
        <div className={clasess['app__miniContainer']}>
          <Filter />
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default App;
