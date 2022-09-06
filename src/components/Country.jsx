import React from 'react';
import styles from '../StyleSheets/Country.module.css'
import { useNavigate } from 'react-router-dom';
// import ScrollReveal from 'scrollreveal';
import { useRef } from 'react';
// import { useEffect } from 'react';

export default function Country({ data }) {
  const { id, name, continent, imgFlag } = data;
  const navigate = useNavigate();
  const cardRef = useRef();

  const redirect = ()=>{
    navigate(`/detail/${id}`);
  }

  return (
    <div className={styles.container} onClick={redirect} ref={cardRef}>
      <img src={imgFlag} className={styles.img} alt='Flag' />
      <div className={styles.container2}>
        <h1 className={styles.h1}>{name}</h1>
        <h4 className={styles.h4}>from:<br/>{continent}</h4>
      </div>
    </div>
  )
}


