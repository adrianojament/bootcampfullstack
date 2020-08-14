import React, { Component } from 'react';

export default class Users extends Component {
  componentDidMount() {
    console.log('componentDidMount de users.js');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate do users.js');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount do users.js');
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        {users.map((user) => {
          const { login, name, picture } = user;
          return <p key={login.uuid}>{name.first}</p>;
        })}
      </div>
    );
  }
}

// Parei aki -> Aula 7.3 - Ciclo de vida de Class Components
