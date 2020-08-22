import React, { Component } from 'react';
import Header from './components/header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
      previousCandidates: [],
    };
    this.interval = null;
    this.URLServico = 'http://localhost:8080/votes';
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch(this.URLServico).then((res) => {
        const { time } = this.state;
        const previousVotes = this.state.candidates.map(
          ({ id, votes, percentage }) => {
            return { id, votes, percentage };
          }
        );

        return res.json().then((json) => {
          this.setState({
            candidates: json.candidates,
            previousCandidates: previousVotes,
            time: time + 1,
          });
        });
      });
    }, 1000);
  }

  render() {
    const { previousCandidates: previousVotes, candidates } = this.state;

    if (candidates.length === 0) {
      return <Spinner description="Carregando.." />;
    }
    return (
      <div className="container">
        <Header>Votação</Header>
        <Candidates previousVotes={previousVotes} candidates={candidates} />
      </div>
    );
  }
}
