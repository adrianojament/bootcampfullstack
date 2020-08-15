import React, { Component, Fragment } from 'react';
import Users from './components/Users/Users';
import Toggle from './components/toggle/Toggle';

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
  }

  handleShowUsers = (isChecked) => {
    this.setState({
      showUsers: isChecked,
    });
  };

  render() {
    const { showUsers, users } = this.state;
    return (
      <Fragment>
        <h3>React LifeCycle</h3>
        <Toggle
          description="Mostrar usuários"
          enabled={showUsers}
          onToggle={this.handleShowUsers}
        />
        <hr />
        {/* Para ocultar elemento */}
        {showUsers && <Users users={users} />}
      </Fragment>
    );
  }
}
