

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';
import {fetchBussiness} from "../yelp";


// Top layout component
export function Layout({children}) {
  return <div className="container">
    <div className={styles.container}>
      {children}
    </div>
  </div>
}


export function Checkbox({label, checked = false}) {
  return <div className="checkbox">
    <label>
      <input type="checkbox" checked={checked} /> {label}
    </label>
  </div>;
}


export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      business: []
    };
  }

  render () {
    return <Layout>
      <div>
        <h2 className={styles.title}>Find the hottest spots</h2>
        <form className="form-inline">
          <div className="form-group">
            <label>City</label>
            <select className="form-control" selected="0" onChange={(e) => this.updateBussiness({city: e.target.value})}>
              <option value="0" disabled>Please select a city</option>
              <option value="1">New York</option>
              <option value="2">Philly</option>
              <option value="3">Chicago</option>
            </select>
          </div>

          <Checkbox label="Restaurants" checked={true}/>
          <Checkbox label="Museums"/>
          <Checkbox label="Clothes Stores"/>
          <Checkbox label="Bowling Alleys"/>
          <Checkbox label="Antique Stores"/>
        </form>

        <hr/>

        <div className="row">
          <div className="col-sm-6">
            {this.state.business.map((business)=><BussinessRating {...business} onRate={(rating)=>this.updateRatings(business.id, rating)} />)}
          </div>
          <div className="col-sm-6">

          </div>
        </div>
      </div>
    </Layout>;
  }

  async updateBussiness(bussinesSpec) {
    let business = await fetch('/business');
    this.setState({business});
  }
}


function BusinessCard({}) {
  return <div className={styles.businessCard}>

  </div>
}



class BussinessRating extends React.Component {
  componentDidMount () {
    this.fetchBusinesData();
  }

  render () {
    return <div>
      DATA
    </div>;
  }

  async fetchBusinesData() {
    await fetchBussiness('2aFiy99vNLklCx3T_tGS9A');
  }

}




