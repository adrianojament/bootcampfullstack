import React, { Component } from 'react';
import Header from './components/header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
    };
    this.interval = null;
    this.URLServico = 'http://localhost:8080/votes';
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch(this.URLServico).then((res) => {
        const { time } = this.state;
        return res.json().then((json) => {
          this.setState({
            candidates: json.candidates,
            time: time + 1,
          });
        });
      });
    }, 1000);
  }

  render() {
    const { candidates } = this.state;
    if (candidates.length === 0) {
      return <Spinner description="Carregando.." />;
    }
    return (
      <div>
        <Header>Votação</Header>
        <Candidates candidates={candidates} />
      </div>
    );
  }
}
