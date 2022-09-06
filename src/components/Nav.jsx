import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetShow } from '../store/countriesShow';
import SearchBar from './SearchBar';
import styles from '../StyleSheets/Nav.module.css';
import Filters from './Filters'

export default function Nav() {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const disabled = (path) => {
    if (location.pathname === `/${path}`) {
      return true;
    }
    else return false;
  }
  const handleClick = (path) => {
    dispatch(
      resetShow()
    )
    // dispatch(
    //   resetFilters()
    // )
    navigate(`/${path}`);
  }

  return (
    <div className={styles.cont}>
      <div className={styles.cont2}>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div className={styles.btns}>
          <button
            className={disabled('home') ? styles.block : styles.h3}
            disabled={disabled('home')}
            onClick={(e) => handleClick('home')}>HOME</button>
          <button
            className={disabled('create') ? styles.block : styles.h3}
            disabled={disabled('create')}
            onClick={(e) => handleClick('create')}>ACTIVITY CREATOR</button>
        </div>
      </div> 
      <Filters />
    </div>
  )
}
