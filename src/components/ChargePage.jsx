import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getActivity, resetCharge } from '../store/activities'
import styles from  '../StyleSheets/ChargePage.module.css'


export default function ChargePage() {

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetCharge());
    }, 2000);

    return function (){dispatch(getActivity())};
  }, [dispatch])

  return (
    <div className={styles.cont}>
      <i className={styles.animation}></i>
      <h1 className={styles.title}>Creando Actividad</h1>
    </div>
  )
}
