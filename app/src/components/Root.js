

import React from 'react';
import styles from './root.scss';
import 'babel-polyfill';
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
      users: [],
      selected: {}
    };
  }

  componentDidMount() {
    this.updateUsers(this.state.spec);
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
            {this._renderUserList()}
          </div>
          <div className="col-sm-6">

          </div>
        </div>
      </div>
    </Layout>;
  }

  _renderUserList() {
    return this.state.users.map((user)=>
      <UserCard {...user} key={user.id} onClick={()=>this.toggleSelection(user.id)}
                          selected={this.state.selected[user.id]} />
    );
  }

  reset() {
    this.setState({
      spec: {},
      users: [],
      selected: {}
    });
  }

  async updateUsers(spec) {
    this.reset();
    let response = await axios.get('/users', spec);
    let usersHash = {};
    for (let userId of response.data) {
      usersHash[userId] = false;
    }
    this.setState({spec, users: response.data, selected: usersHash});
  }

  toggleSelection(userId) {
    this.setState({selected: {
      ...this.state.selected,
      [userId]: !this.state.selected[userId]
    }});
  }
}


function UserCard({id, image, url, name, selected, onClick}) {
  return <div className={selected ? styles.profileSelected : styles.profile} onClick={()=>onClick()}>
    <img src="http://www.clipartbest.com/cliparts/RiA/yB6/RiAyB6GMT.png" alt="" className="checkmark pull-right" />

    <img src={image} alt="" className="img-thumbnail pull-left" />
    <div className="content">
      <h3 className="title">{name}</h3>
      <a href={url} target="_blank">Check profile</a>
    </div>
    <div className="clearfix"></div>
  </div>;
}


