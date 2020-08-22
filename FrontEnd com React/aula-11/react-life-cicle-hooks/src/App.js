import React, { Fragment, useState, useEffect } from 'react';
import Users from './components/Users/Users';
import Toggle from './components/toggle/Toggle';

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        'https://randomuser.me/api/?seed=rush&nat=br&results=10'
      );
      const json = await res.json();
      setUsers(json.results);
    };
    fetchUsers();
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  return (
    <Fragment>
      <h3>React LifeCycle</h3>
      <Toggle
        description="Mostrar usuários"
        enabled={showUsers}
        onToggle={handleShowUsers}
      />
      <hr />
      {/* Para ocultar elemento */}
      {showUsers && <Users users={users} />}
    </Fragment>
  );
}
