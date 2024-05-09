import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import Ticket from '../ticket';
import { filterTicketsPrice, filterTicketsDuration, addTickets } from '../../redux/ticketSlice';

import classes from './ticketList.module.scss';

const TicketList = () => {
  let itemId = 100;
  const status = useSelector((state) => state.tickets.status);
  const error = useSelector((state) => state.tickets.error);
  const data = useSelector((state) => state.tickets.tickets);
  const filter = useSelector((state) => state.filter.filter);
  const filteredDataPrice = useSelector((state) => state.tickets.filteredTicketsPrice);
  const filteredDataDuration = useSelector((state) => state.tickets.filteredTicketsDuration);
  const filteredData = filter === 'price' ? filteredDataPrice : filteredDataDuration;
  const selectedTabs = useSelector((state) => state.tabs.tabs);
  const ticketsNumber = useSelector((state) => state.tickets.ticketsNumber);
  const dispatch = useDispatch();
  const filterTicketsByTabs = (tickets, selectedTabs) => {
    return tickets.filter((ticket) => {
      if (selectedTabs.includes('without') && ticket.segments[0].stops.length === 0) {
        return true;
      }
      if (selectedTabs.includes('onePer') && ticket.segments[0].stops.length === 1) {
        return true;
      }
      if (selectedTabs.includes('twoPer') && ticket.segments[0].stops.length === 2) {
        return true;
      }
      if (selectedTabs.includes('threePer') && ticket.segments[0].stops.length === 3) {
        return true;
      }
      return false;
    });
  };
  const onButtonLoadClick = () => {
    dispatch(addTickets());
  };
  useEffect(() => {
    dispatch(filterTicketsPrice());
    dispatch(filterTicketsDuration());
  }, [data]);
  const resultData = filterTicketsByTabs(filteredData, selectedTabs).slice(0, ticketsNumber);
  if (status === 'loading' && data.length === 0) {
    return <Spin />;
  }
  if (status === 'error') {
    return <div>{error}</div>;
  }
  if (selectedTabs.length === 0) {
    return <div className={classes['list__without']}>Таких билетов нет</div>;
  }
  const items = resultData.map((element) => {
    const { ...itemProps } = element;

    return (
      <li key={itemId++}>
        <Ticket {...itemProps} />
      </li>
    );
  });

  return (
    <div>
      {status === 'loading' && (
        <div className={classes['tickets__loading']}>
          {' '}
          <Spin />
        </div>
      )}
      <ul className={classes['tickets__list']}>{items}</ul>
      <button className={classes['tickets__btn']} onClick={() => onButtonLoadClick()}>
        <h3 className={classes['tickets__h3']}>ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!</h3>
      </button>
    </div>
  );
};

export default TicketList;
