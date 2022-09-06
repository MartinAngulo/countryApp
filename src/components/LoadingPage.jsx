import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../StyleSheets/LoadingPage.module.css';

export default function LoadingPage() {
    const navigate = useNavigate();
    const load_status = useSelector(state=>state.countriesShow.load_status);
    useEffect(() => {
        setTimeout(() => {
            if(load_status){
                navigate('/home');
            }
        }, 1500);
    }, [navigate, load_status])
    

    return (
        <div className={styles.cont}>
            <i className={styles.loader}></i>
            <div className={styles.cont2}>
                <h3>Loading the App</h3>
                <h3>Please wait a moment</h3>
            </div>
        </div>
    )
}
