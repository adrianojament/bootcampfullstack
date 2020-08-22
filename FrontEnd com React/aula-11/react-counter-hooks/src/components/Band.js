import React, { Fragment } from 'react';
const BANDNAME = 'Rush';
const BANDMEMBERS = [
  {
    id: 1,
    name: 'Neil Peart',
    instrument: 'Bateria',
  },
  {
    id: 2,
    name: 'Alex Lifeson',
    instrument: 'Guitarra',
  },
  {
    id: 3,
    name: 'Geddy Lee',
    instrument: 'Baixo',
  },
];

export default function Band() {
  // eslint-disable-next-line
  const [bandMembers, setbandMembers] = React.useState(BANDMEMBERS);
  // eslint-disable-next-line
  const [bandName, setbandName] = React.useState(BANDNAME);
  return (
    <Fragment>
      <h4>{bandName}</h4>
      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li key={id}>
              {name} - {instrument}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}
