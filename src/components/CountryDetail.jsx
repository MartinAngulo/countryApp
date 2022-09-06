import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { countryDetail, resetDetail } from '../store/countriesShow';
import styles from '../StyleSheets/CountryDetail.module.css';
import ActivityCard from './ActivityCard';

export default function CountryDetail() {
  const { countryId } = useParams();
  const dispatch = useDispatch();
  const country = useSelector(state => state.countriesShow.detail);
  const detailStatus = useSelector(state => state.countriesShow.detailStatus);
  useEffect(() => {

    dispatch(
      countryDetail(countryId)
    )

    return () => {
      dispatch(resetDetail())
    }
  }, [countryId, dispatch])

  return detailStatus === 'success' && (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <h1 className={styles.name}>{country.name} DETAILS</h1>
          <img className={styles.flag} src={country.imgFlag} alt={country.name} title={country.name}/>
        </div>
        <div className={styles.detail}>
          <div className={styles.parra}>
            <p className={styles.text}>ID: {country.id}</p>
            <p className={styles.text}>CONTINENT: {country.continent}</p>
            <p className={styles.text}>CAPITAL: {country.capital}</p>
            <p className={styles.text}>SUBREGION: {country.subregion}</p>
            <p className={styles.text}>AREA: {country.area} Km²</p>
            <p className={styles.text}>POPULATION: {country.population} people</p>
          </div>
          <iframe title={`${country.name} map`} className={styles.iframe} src={`https://maps.google.com/?ll=${country.latlng[0]},${country.latlng[1]}&z=5&t=k&output=embed`}></iframe>
        </div>
        <div className={styles.atv}>
          <p className={styles.turis}>Turist Activitites:</p>
          <div className={styles.grid}>
            {country.TurisActivities.length > 0
              && country.TurisActivities.map(actv => (
                <ActivityCard data={actv}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

/* {
  "id": "PER",
  "name": "PERU",
  "imgFlag": "https://flagcdn.com/w320/pe.png",
  "continent": "Americas",
  "capital": "Lima",
  "subregion": "South America",
  "area": 1285216,
  "population": 32971846,
  "latlng": [
        -10,
        -76
    ],
  "TurisActivities": []
} */
