import React, { useState, Fragment, useEffect } from 'react';
import * as api from './api/apiService.js';
import Spinner from './components/Spinner.js';
import GradesControl from './components/GradesControl.js';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  // eslint-disable-next-line
  const [selectGrade, setSelectGrade] = useState({});
  // eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 1500);
    };
    getGrades();
  }, []);

  const handleDelete = () => {
    console.log('Handle Delete');
  };
  const handlePersist = () => {
    console.log('Handle Persist');
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="center">Controle de Notas</h1>
        {allGrades.length === 0 && (
          <Spinner title="Buscando notas. Aguarde..." />
        )}
        {allGrades.length > 0 && (
          <GradesControl
            grades={allGrades}
            onDelete={handleDelete}
            onPersist={handlePersist}
          />
        )}
      </div>
    </Fragment>
  );
}
