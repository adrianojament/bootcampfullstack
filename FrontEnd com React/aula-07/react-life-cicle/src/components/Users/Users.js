import React, { Component } from 'react';
import User from './User';

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      secondsVisible: 0,
    };

    this.interval = null;
  }

  componentDidMount() {
    console.log('componentDidMount de users.js');

    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({
        secondsVisible: secondsVisible + 1,
      });
    }, 1000);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate do users.js');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount do users.js');
    clearInterval(this.interval);
  }

  render() {
    const { users } = this.props;
    const { secondsVisible } = this.state;

    return (
      <div>
        <p>Componente Users visivel por {secondsVisible} segundos</p>
        <ul>
          {users.map((user) => {
            const { login, name, picture } = user;
            return (
              <li key={login.uuid}>
                <User oName={name} oPicture={picture} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// Parei aki -> Aula 7.3 - Ciclo de vida de Class Components
