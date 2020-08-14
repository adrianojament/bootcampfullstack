import React, { Component, Fragment } from 'react';
import Users from './components/Users/Users';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );

    const json = await res.json();
    this.setState({
      users: json.results,
    });
    console.log('componentDidMount do App.js');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate do App.js');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount do App.js');
  }

  handleShowUsers = (event) => {
    this.setState({
      showUsers: event.target.checked,
    });
  };

  render() {
    const { showUsers, users } = this.state;
    return (
      <Fragment>
        <div className="switch">
          <label>
            Mostrar Usuarios
            <input type="checkbox" onChange={this.handleShowUsers} />
            <span className="lever"></span>
          </label>
        </div>
        <hr />
        {/* Para ocultar elemento */}
        {showUsers && <Users users={users} />}
      </Fragment>
    );
  }
}
