import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchFilter } from '../../redux/filterSlice';
import { removeTickets } from '../../redux/ticketSlice';

import classes from './filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.filter.filter);
  const onClickFilter = (payload) => {
    dispatch(switchFilter(payload));
    dispatch(removeTickets());
  };
  return (
    <div className={classes['filter__btns']}>
      <button
        className={`${classes['filter__btn']} ${activeFilter === 'price' ? classes['blue'] : ''}`}
        onClick={() => onClickFilter('price')}
      >
        <h3>САМЫЙ ДЕШЕВЫЙ</h3>
      </button>
      <button
        className={`${classes['filter__btn']} ${activeFilter === 'duration' ? classes['blue'] : ''}`}
        onClick={() => onClickFilter('duration')}
      >
        <h3>САМЫЙ БЫСТРЫЙ</h3>
      </button>
      <button
        className={`${classes['filter__btn']} ${activeFilter === 'opti' ? classes['blue'] : ''}`}
        onClick={() => onClickFilter('opti')}
      >
        <h3>ОПИТМАЛЬНЫЙ</h3>
      </button>
    </div>
  );
};

export default Filter;
