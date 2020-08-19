import React from 'react';
import Position from './Position';

export default function Candidate(props) {
  const { candidate, position } = props;
  const { name, votes, percentage } = candidate;
  return (
    <div>
      <Position>{position}</Position>
      {name}-{votes}
    </div>
  );
}

// Parei na Aula 10.5 - Desafio 3 (Parte 5)
