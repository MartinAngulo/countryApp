import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom';
import { resetPage, resetShow, searchCountries } from '../store/countriesShow';
import styles from '../StyleSheets/SearchBar.module.css'


export default function SearchBar() {

  let [input, setInput] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const OnSubmit = (data) => {
    dispatch(
      searchCountries(data)
    )
    setInput('')
  };
  const onChange = (e) => {
    let input = e.target.value;
    setInput(input)
  };
  const disable=()=>{
    if(location.pathname==='/home')return false;
    else return true;
  }

  const enter = (e)=>{
    if(e.key==='Enter')e.preventDefault();
    // return dispatch(searchCountries(input))
  }

  useEffect(() => {
    dispatch(resetPage());
    const OnSubmit = (data) => {
      dispatch(
        searchCountries(data)
      )
    }
    if (input.length > 0) OnSubmit(input);
    if (input === '') {
      dispatch(
        resetShow()
      );
    }
  }, [input, dispatch])

  return (
    <form onSubmit={() => OnSubmit(input)} className={styles.cont}>
      <input
        className={styles.input}
        disabled={disable()}
        type="search"
        name='name'
        onKeyDown={enter}
        onChange={onChange}
        value={input}
        pattern='^[a-zA-Z ]*$'
        placeholder='Type a country name to search' />
      {/* {input.length > 0 &&
        <button
        className={styles.clear}
        onClick={()=>{setInput('')}}
        ></button>} */}
    </form>
  )
}
