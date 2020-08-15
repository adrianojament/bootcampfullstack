import React, { Component } from 'react';
import css from './user.module.css';

export default class User extends Component {
  render() {
    const { oName, oPicture } = this.props;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={oPicture.large} alt={oName.first} />
        <span>{oName.first}</span>
      </div>
    );
  }
}
