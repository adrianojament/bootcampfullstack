import React, { Component } from 'react';

export default class Bar extends Component {
  render() {
    const { value, color = 'black' } = this.props;

    return (
      <div
        style={{
          marginTop: '0px',
          width: value + '%',
          height: '20px',
          backgroundColor: color,
        }}
      />
    );
  }
}
