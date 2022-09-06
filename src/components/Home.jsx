import React, { useEffect } from 'react';
import CountryShow from './CountryShow';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from '../StyleSheets/Home.module.css';
import { changePage, getAllCountries } from '../store/countriesShow';

export default function Home() {
    const countries = useSelector(state => state.countriesShow.countries);
    // const [scroll, setScroll] = useState(0);
    const dispatch = useDispatch();

    // const infiniteScroll = ()=>{
    //     if(scroll>)
    // }

    // useEffect(()=>{
    //     let interval = setInterval(()=>{
    //         setScroll((window.scrollY))
    //     }, 1000);

    //     return function(){clearInterval(interval)};
    // },[]);
    useEffect(() => {
        if(countries.length===0)dispatch(getAllCountries());
        dispatch(changePage(1));
    }, [countries, dispatch])

    return (
        countries.length === 0
            ? <Navigate to={'/'} />
            :
            <div className={styles.cont}>
                <p className={styles.baner}>This is my country App</p>
                <CountryShow />
                {/* <div>
                    <img
                    src='https://cdn-icons-png.flaticon.com/512/44/44603.png'
                    alt='up'
                    />
                </div> */}
            </div>
    )
}
