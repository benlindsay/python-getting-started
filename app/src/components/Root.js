

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';
import {fetchBussiness} from "../yelp";
import axios from 'axios'

// Top layout component
export function Layout({children}) {
  return <div className="container">
    <div className={styles.container}>
      {children}
    </div>
  </div>
}


export function Checkbox({label, checked = false, onChange}) {
  return <div className="checkbox">
    <label>
      <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.value)} /> {label}
    </label>
  </div>;
}


export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spec: {},
      users: []
    };
  }

  render () {
    return <Layout>
      <div>
        <h2 className={styles.title}>Find the hottest spots</h2>
        <form className="form-inline">
          <div className="form-group">
            <label>City</label>
            <select className="form-control" selected="0" onChange={(e) => this.updateUsers({...this.state.spec, city: e.target.value})}>
              <option value="0" disabled>Please select a city</option>
              <option value="1">New York</option>
              <option value="2">Philly</option>
              <option value="3">Chicago</option>
            </select>
          </div>

          <Checkbox label="Restaurants" checked={!!this.state.spec.restaurants} onChange={(x)=>this.updateUsers({...this.state.spec, restaurant: x})} />
          <Checkbox label="Museums"/>
          <Checkbox label="Clothes Stores"/>
          <Checkbox label="Bowling Alleys"/>
          <Checkbox label="Antique Stores"/>
        </form>

        <hr/>

        <div className="row">
          <div className="col-sm-6">
            {this.state.users.map((user)=><UserCard {...user} onClick={(rating)=>this.updateRatings(user.id, rating)} />)}
          </div>
          <div className="col-sm-6">

          </div>
        </div>
      </div>
    </Layout>;
  }

  async updateUsers(spec) {
    let response = await axios.get('/users', spec);
    this.setState({spec, users: response.data});
  }

}


function UserCard({id, image, url, name, onClick}) {
  return <div className={styles.userCard}>
    <img src={image} alt="" className="img-thumbnail pull-left" />
    <div>
      <h3>{name}</h3>
      <a href={`https://www.yelp.com/user_details?userid=${id}`}>Check profile</a>
    </div>
    <div className="clearfix"></div>
  </div>;
}


