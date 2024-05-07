import React from 'react';

import classes from './ticket.module.scss';

const Ticket = ({ price, segments, carrier }) => {
  const renderTransfers = () => {
    return segments.map((transfer, index) => {
      const departureTime = new Date(transfer.date);
      const arrivalTime = new Date(departureTime.getTime() + transfer.duration * 60000);
      return (
        <div key={index} className={classes['ticket__bottom']}>
          <div>
            <h3>
              {transfer.origin} – {transfer.destination}
            </h3>
            <p>
              {`${departureTime.getHours().toString().padStart(2, '0')}:${departureTime.getMinutes().toString().padStart(2, '0')} - `}
              {`${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`}
            </p>
          </div>
          <div>
            <h3>В ПУТИ</h3>
            <p> {`${Math.floor(transfer.duration / 60)}ч ${transfer.duration % 60}м`}</p>
          </div>
          <div>
            <h3>{transfer.stops.length} ПЕРЕСАДКИ</h3>
            <p> {transfer.stops.join(', ')}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes['app__ticket']}>
      <div className={classes['ticket__top']}>
        <h2>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} Р</h2>
        <img alt="comapny logo" src={`https://pics.avs.io/110/36/${carrier}.png`}></img>
      </div>
      <div>{renderTransfers()} </div>
    </div>
  );
};

export default Ticket;
