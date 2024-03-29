import React from 'react';
import css from './spinner.module.css';

export default function Spinner({ title }) {
  return (
    <div className={css.flexRow}>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div>
        <span className={css.title}>{title}</span>
      </div>
    </div>
  );
}
