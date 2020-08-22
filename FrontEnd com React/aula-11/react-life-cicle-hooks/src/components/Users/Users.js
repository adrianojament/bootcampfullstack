import React, { useState, useEffect } from 'react';
import User from './User';

export default function Users(props) {
  const [secondsVisible, setSecondsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [secondsVisible]);

  const { users } = props;

  return (
    <div>
      <p>Componente Users visivel por {secondsVisible} segundos</p>
      <ul>
        {users.map((user) => {
          const { login, name, picture } = user;
          return (
            <li key={login.uuid}>
              <User oName={name} oPicture={picture} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
