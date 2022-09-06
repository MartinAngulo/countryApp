import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
// import Select from 'react-select'
import config from '../config/api'
import styles from '../StyleSheets/Filters.module.css';
import { addFilter, filter, filterSeason, resetFilters, resetPage } from '../store/countriesShow';

export default function Filters() {

  const initialValues = {
    name: '',
    population: '',
    area: '',
    continent: '',
    season: '',
  }

  const dispatch = useDispatch();
  const location = useLocation();

  const countries = useSelector(state => state.countriesShow.countries)
  const [values, setValues] = useState(initialValues)
  

  const onClear = () => {
    setValues(initialValues);
    
    dispatch(resetFilters());
  };

  const disable=()=>{
    if(location.pathname==='/home')return false;
    else{ 
      return true};
  }

  const handleChange = (e, prop) => {

    setValues({ ...initialValues, [prop]: e.target.value });

    if (['name', 'population', 'area'].includes(prop)) {
      dispatch(resetPage());
      return dispatch(filter({ order: e.target.value, para: prop }))
    }
    else if (prop === 'continent') {
      dispatch(resetPage());
      const filters = config.contFilter(countries, e.target.value);
      return dispatch(addFilter(filters));
    }
    else if (prop === 'season') {
      dispatch(resetPage());
      return dispatch(filterSeason(e.target.value));
    }

  }

  return (
    <div className={styles.cont}>
      {/* <Select
        value={values.name}
        className={styles.select}
        placeholder='Filter by Name'
        options={config.namefilter}
        isDisabled={disable()}
        onChange={(e) => handleChange(e, 'name')}
      /> */}
      <select
      value={values.name}
      className={styles.select}
      placeholder='Select one'
      // options={config.namefilter}
      disabled={disable()}
      onChange={(e) => handleChange(e, 'name')}
      >
        <option hidden>Filter by Name</option>
        {config.namefilter.map(name=>(<option value={name.value}>{name.label}</option>))}
      </select>
      {/* <Select
        value={values.population}
        className={styles.select}
        placeholder='Filter by population'
        options={config.populationFilter}
        isDisabled={disable()}
        onChange={(e) => handleChange(e, 'population')}
      /> */}
      <select
      value={values.population}
      className={styles.select}
      // options={config.populationFilter}
      disabled={disable()}
      onChange={(e) => handleChange(e, 'population')}
      >
        <option key='aa' hidden>Filter by Population</option>
        {config.populationFilter.map((popu,i)=>(<option key={`${i}-popu`}value={popu.value}>{popu.label}</option>))}
      </select>
      {/* <Select
        value={values.area}
        className={styles.select}
        placeholder='Filter by Area'
        options={config.sizeFilter}
        isDisabled={disable()}
        onChange={(e) => handleChange(e, 'area')}
      /> */}
      <select
      value={values.area}
      className={styles.select}
      // options={config.sizeFilter}
      disabled={disable()}
      onChange={(e) => handleChange(e, 'area')}
      >
        <option key='aaa' hidden>Filter by Area</option>
        {config.sizeFilter.map((area,i)=>(<option key={`${i}-area`} value={area.value}>{area.label}</option>))}
      </select>
      {/* <Select
        value={values.continent}
        className={styles.select}
        placeholder='Filter by continent'
        options={config.continentFilter}
        isDisabled={disable()}
        onChange={(e) => handleChange(e, 'continent')}
      /> */}
      <select
      value={values.continent}
      className={styles.select}
      // options={config.continentFilter}
      disabled={disable()}
      onChange={(e) => handleChange(e, 'continent')}
      >
        <option key='aaa' hidden>Filter by Continent</option>
        {config.continentFilter.map((conti,i)=>(<option key={`${i}-conti`} value={conti.value}>{conti.label}</option>))}
      </select>
      {/* <Select
        value={values.season}
        className={styles.select}
        placeholder='Filter by Activity'
        options={config.seasonsOptions}
        isDisabled={disable()}
        onChange={(e) => handleChange(e, 'season')}
      /> */}
      <select
      value={values.season}
      className={styles.select}
      // options={config.seasonsOptions}
      disabled={disable()}
      onChange={(e) => handleChange(e, 'season')}
      >
        <option key='aaaa' hidden>Filter by Season</option>
        {config.seasonsOptions.map((season,i)=>(<option key={`${i}-season`} value={season.value}>{season.label}</option>))}
      </select>
      <button 
      className={disable()?styles.block:styles.clear}
      disabled={disable()}
      onClick={onClear}>Clear</button>
    </div>
  )
}
