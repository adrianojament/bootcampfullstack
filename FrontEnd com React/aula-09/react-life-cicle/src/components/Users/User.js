import React from 'react';
import css from './user.module.css';

export default function User(props) {
  const { oName, oPicture } = props;
  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={oPicture.large} alt={oName.first} />
      <span>{oName.first}</span>
    </div>
  );
}
