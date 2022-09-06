import React, { useEffect } from 'react';
import CountryShow from './CountryShow';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from '../StyleSheets/Home.module.css';
import { changePage } from '../store/countriesShow';

export default function Home() {
    const countries = useSelector(state => state.countriesShow.countries);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changePage(1));
    }, [countries, dispatch])

    return (
        countries.length === 0
            ? <Navigate to={'/'} />
            :
            <div className={styles.cont}>
                <p className={styles.baner}>This is my country App</p>
                <CountryShow />
            </div>
    )
}
