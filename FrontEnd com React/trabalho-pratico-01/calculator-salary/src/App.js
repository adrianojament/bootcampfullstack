import React, { Component, Fragment } from 'react';
import Salary from './components/Salary/Salary';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <h1 style={styles.centeredTitle}>React Salário</h1>
          <Salary />
        </div>
      </Fragment>
    );
  }
}
const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
