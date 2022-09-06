import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../StyleSheets/LoadingPage.module.css';

export default function LoadingPage({ url }) {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            if (url) navigate(url);
        }, 3000);
    }, [navigate, url])

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
