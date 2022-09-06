import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import Select from 'react-select';
import config from '../config/api';
import { addCharge, createActivity, getActivity } from '../store/activities';
import styles from '../StyleSheets/CreateActivity.module.css';
import ChargePage from './ChargePage';
import { getAllCountries } from '../store/countriesShow';
import ActivityCard from './ActivityCard';

export default function CreateActivity() {
  const dispatch = useDispatch();

  const initialError = {
    name: '',
    countries: '',
    dif: '',
    dura: '',
    season: ''
  }

  let [name, setName] = useState('');
  let [dif, setDif] = useState('');
  let [dura, setDura] = useState('');
  let [season, setSeason] = useState('');
  let [country, setCountry] = useState([]);
  let [error, setError] = useState(initialError)

  const countriesShow = useSelector(state => state.countriesShow.countries)
  // .map(e => { return { value: e.id, label: e.name } });
  const loadStatus = useSelector(state => state.countriesShow.load_status);
  const chargeStatus = useSelector(state => state.activities.charge);
  const activities = useSelector(state => state.activities.activities);

  const validation = (prop, value) => {
    if (prop === 'name') {
      if (!/^[a-zA-Z ]{3,20}$/.test(value)) {
        setError(state => { return { ...state, name: 'Name has to have only letters, min 3 o max 20 letters' } })
      }
      else if (activities.map(e => e.name).includes(value.toUpperCase())) {
        setError(state => {
          return {
            ...state, name: "Activity's name already exists"
          }
        })
      }
      else setError(state => { return { ...state, name: '' } });
    }
    else if (prop === 'dif') {
      if (!/^([1-5])$/.test(value)) {
        setError(state => { return { ...state, dif: 'Only numbers, min 1, max 5' } })
      } else {
        setError(state => { return { ...state, dif: '' } })
      }
    }
    else if (prop === 'dura') {
      if (!/^([1-5])$/.test(value)) {
        setError(state => { return { ...state, dura: 'Only numbers, min 1, max 5' } })
      } else {
        setError(state => { return { ...state, dura: '' } })
      }
    }
    else if (prop === 'season') {
      if (!['spring','autumn','winter','summer'].includes(value)) {
        setError(state => { return { ...state, season: 'Please, enter a valid season' } })
      } else {
        setError(state => { return { ...state, season: '' } })
      }
    }
  }


  const handleChange = (e, cb) => {
    validation(e.target.name, e.target.value);
    cb(e.target.value);
  }
  const handleName = (e) => {
    validation(e.target.name, e.target.value);
    setName(e.target.value);
  }


  const disableSubmit = () => {
    if (name.length < 3 || !dif || !dura || !season || country.length === 0) return true;
    else return false;
  }
  const disableClear = () => {
    if (name.length > 0 || dif || dura || season || country.length > 0) return false;
    else return true;
  }

  const onClick = () => {
    setName('');
    setDif('');
    setDura('');
    setSeason('');
    setCountry([]);
    setError(initialError)
  }

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      name: name,
      difficulty: dif,
      duration: dura,
      season: season,
      countries: country
    }
    if (error.countries.length > 0 || error.dif.length > 0 || error.dura.length > 0 || error.name.length > 0 || error.season.length > 0) {
      return alert('Should fix errors to create an activity')
    }
    dispatch(getActivity());
    // if (validation(data)) {
    dispatch(
      createActivity(data)
    )
    dispatch(addCharge());
    onClick();
  }

  const handleCountries = (e) => {
    setCountry(state => [...state, e.target.value]);
  }

  useEffect(() => {
    if (country.length >6) {
      setError(state => {
        return {
          ...state, countries: 'Select max 6 countries for activity'
        }
      })
    }
    else setError(state => {
      return {
        ...state, countries: ''
      }
    });

    if (!loadStatus) {
      dispatch(getAllCountries())
      onClick();
    }
    else dispatch(getActivity());


  }, [ dispatch, loadStatus, country])

  return (
    chargeStatus ? <div className={styles.charge}><ChargePage /></div> :
      <div className={styles.main}>
        <div className={styles.create}>
          <h1 className={styles.list}>CreateActivity</h1>
          <form className={styles.form} onSubmit={onSubmit}>

            <label className={styles.label} htmlFor='name' >Name: </label>
            <input type="text"
              className={styles.name}
              value={name} id='name'
              name='name'
              onChange={handleName}
              // pattern='^[a-zA-Z ]{3,20}$'
              placeholder="Type an activity's name, min 3 letters"
            />
            <label className={styles.error}>{error.name}</label>

            <label className={styles.label}>Difficulty: </label>
            {/* <Select
              value={dif}
              placeholder='Select activity difficulty'
              className={styles.diff}
              pattern='^[1-5]+'
              options={config.dificulty}
              onChange={(e) => handleChange(e, setDif)}
            /> */}
            <select
              value={dif}
              name='dif'
              // id='pages'
              className={styles.diff}
              // options={config.dificulty}
              onChange={(e) => handleChange(e, setDif)}
            >
              <option hidden>Select activity Difficulty</option>
              {config.dificulty.map(dif => (<option value={dif.value}>{dif.label}</option>))}
            </select>
            <label className={styles.error}>{error.dif}</label>

            <label className={styles.label}>Duration: </label>
            {/* <Select
              value={dura}
              placeholder='Select activity duration'
              className={styles.duration}
              options={config.duration}
              onChange={(e) => handleChange(e, setDura)}
            /> */}
            <select
              value={dura}
              name='dura'
              // id='pages'
              className={styles.duration}
              // options={config.duration}
              onChange={(e) => handleChange(e, setDura)}
            >
              <option hidden>Select activity Duration</option>
              {config.duration.map(dura => (<option value={dura.value}>{dura.label}</option>))}
            </select>
            <label className={styles.error}>{error.dura}</label>

            <label className={styles.label}>Season: </label>
            {/* <Select
              value={season}
              placeholder='Select activity season'
              className={styles.season}
              options={config.seasonsOptions}
              onChange={(e) => handleChange(e, setSeason)}
            /> */}
            <select
              value={season}
              name='season'
              // id='pages'
              className={styles.season}
              // options={config.seasonsOptions}
              onChange={(e) => handleChange(e, setSeason)}
            >
              <option hidden>Select activity Season</option>
              {config.seasonsOptions.map(season => (<option value={season.value}>{season.label}</option>))}
            </select>
            <label className={styles.error}>{error.season}</label>

            <label className={styles.label}>Countries: </label>
            {/* <Select
              value={country}
              placeholder='Select countries where can practice this'
              className={styles.season}
              options={countriesShow}
              closeMenuOnSelect={false}
              isMulti
              onChange={(e) => handleChange(e, setCountry)}
            /> */}
            <select
              value={'Select countries where can practice this'}
              // id='pages'
              className={styles.season}
              name='countries'
              // multiple
              // size={10}
              // options={countriesShow}
              onChange={handleCountries}
            >
              <option hidden>Select countries where can practice this</option>
              {countriesShow.filter((e) => !country.includes(e.id))
                .map(c => (<option value={c.id}>{c.name}</option>))}
            </select>
            <label className={styles.error}>{error.countries}</label>

            <div className={styles.btns}>
              <button
                className={disableSubmit() ? styles.block : styles.button}
                disabled={disableSubmit()}
              >Create</button>
              <button
                type='submit'
                className={disableClear() ? styles.block : styles.button}
                disabled={disableClear()}
                onClick={() => onClick()}>Clear</button>
            </div>
          </form>
          {/*Paises Seleccionados */}
          <div className={styles.cSelect}>
            {
              country.length > 0 && country.map(e => (
                <div style={{ display: 'flex', border: '2px solid black', padding: '2px', gap: '2px' }}>
                  <img className={styles.cShow} src={countriesShow.find(f => f.id === e).imgFlag} title={countriesShow.find(f => f.id === e).name} alt='flag' />
                  <button onClick={() => {
                    if (country.length === 6) setError(state => {
                      return {
                        ...state, countries: ''
                      }
                    })
                    setCountry(state => state.filter(j => j !== e))
                  }} className={styles.xbtn}>x</button>
                </div>))
            }
          </div>


        </div>
        <div className={styles.showAct}>
          <h1 className={styles.list}>List of Activities</h1>
          <div className={styles.countries}>
            {
              activities.length > 0
              &&
              activities.map(activity => {
                return (
                  <div key={activity.id}>
                    <ActivityCard data={activity} />
                  </div>
                )
              }
              )
            }
          </div>
        </div>
      </div>
  )
}
