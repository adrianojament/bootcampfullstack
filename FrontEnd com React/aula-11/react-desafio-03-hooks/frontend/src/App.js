import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousCandidates, setPreviousCandidates] = useState([]);
  const URLServico = 'http://localhost:8080/votes';

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(URLServico)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const localPreviousCandidates = candidates.map(
            ({ id, votes, percentage }) => {
              return { id, votes, percentage };
            }
          );
          setCandidates(json.candidates);
          setPreviousCandidates(localPreviousCandidates);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [candidates]);

  if (candidates.length === 0) {
    return <Spinner description="Carregando.." />;
  }
  return (
    <div className="container">
      <Header>Votação</Header>
      <Candidates previousVotes={previousCandidates} candidates={candidates} />
    </div>
  );
}
