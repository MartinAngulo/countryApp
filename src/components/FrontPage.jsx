import React, { Component} from 'react';
import { connect} from 'react-redux';
import styles from '../StyleSheets/FrontPage.module.css'
import { getAllCountries } from '../store/countriesShow';
import LoadingPage from './LoadingPage';
import config from '../config/api';



function mapDispatchToProps(dispatch) {
  return {
    getAllCountries: () => dispatch(getAllCountries())
  };
}

class FrontPage extends Component {

  constructor(props) {
    super(props);
    this.state = { load: false }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getAllCountries();
  }
  handleClick() {
    this.setState(state => state.load = true);
  }

  handleLink(link) {
    this.props.history.push(link)
  }

  render() {
  
    return (
      <div className={styles.container} >
        {this.state.load ? <LoadingPage url={'/home'} />
          : <>
            <p className={styles.gif} ></p>
            <div className={styles.lateral}>
              <h1 className={styles.h1}>Welcome to my Country App</h1>
              <button className={styles.start} onClick={this.handleClick}>Let's Go</button>
              <div className={styles.btnsgroup}>
                <p className={styles.by}>By Martin Angulo</p>
                <a className={styles.socialmediagit} href={config.links.github} rel="noreferrer" target='_blank'> </a>
                <a className={styles.socialmedialin} href={config.links.lin} rel="noreferrer" target='_blank'> </a>
                <a className={styles.socialmediafb} href={config.links.fb} rel="noreferrer" target='_blank'> </a>
                <a className={styles.socialmediaig} href={config.links.ig} rel="noreferrer" target='_blank'> </a>
              </div>
            </div>
          </>}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(FrontPage);