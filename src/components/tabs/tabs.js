import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteTab, switchTab } from '../../redux/tabsSlice';

import classes from './tabs.module.scss';

const Tabs = () => {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const allTabs = ['without', 'onePer', 'twoPer', 'threePer'];
  const onTabsClick = (payload) => {
    if (tabs.includes(payload)) {
      dispatch(deleteTab(payload));
    } else {
      dispatch(switchTab(payload));
    }
  };
  const onAllClick = () => {
    if (tabs.length === 4) {
      tabs.forEach((element) => {
        dispatch(deleteTab(element));
      });
    } else {
      allTabs.forEach((element) => {
        if (!tabs.includes(element)) {
          dispatch(switchTab(element));
        }
      });
    }
  };
  return (
    <div className={`${classes['app__tabs']} ${classes.tabs}`}>
      <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <div className={classes['tabs__list']}>
        <label className={classes['tabs__label']}>
          <input
            type="checkBox"
            className={classes['tabs__input']}
            checked={tabs.length === 4}
            onClick={() => onAllClick()}
          ></input>
          <span className={classes['tabs__fakeInput']}></span>
          <span className={classes['tabs__span']}>Все</span>
        </label>
        <label className={classes['tabs__label']}>
          <input
            type="checkBox"
            className={classes['tabs__input']}
            checked={tabs.includes('without')}
            onClick={() => onTabsClick('without')}
          ></input>
          <span className={classes['tabs__fakeInput']}></span>
          <span className={classes['tabs__span']}>Без пересадок</span>
        </label>
        <label className={classes['tabs__label']}>
          <input
            type="checkBox"
            className={classes['tabs__input']}
            checked={tabs.includes('onePer')}
            onClick={() => onTabsClick('onePer')}
          ></input>
          <span className={classes['tabs__fakeInput']}></span>
          <span className={classes['tabs__span']}>1 пересадка</span>
        </label>
        <label className={classes['tabs__label']}>
          <input
            type="checkBox"
            className={classes['tabs__input']}
            checked={tabs.includes('twoPer')}
            onClick={() => onTabsClick('twoPer')}
          ></input>
          <span className={classes['tabs__fakeInput']}></span>
          <span className={classes['tabs__span']}>2 пересадки</span>
        </label>
        <label className={classes['tabs__label']}>
          <input
            type="checkBox"
            className={classes['tabs__input']}
            checked={tabs.includes('threePer')}
            onClick={() => onTabsClick('threePer')}
          ></input>
          <span className={classes['tabs__fakeInput']}></span>
          <span className={classes['tabs__span']}>3 пересадки</span>
        </label>
      </div>
    </div>
  );
};

export default Tabs;
