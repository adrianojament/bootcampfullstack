import React, { useState, Fragment, useEffect } from 'react';
import * as api from './api/apiService.js';
import Spinner from './components/Spinner.js';
import GradesControl from './components/GradesControl.js';
import ModalGrade from './components/ModalGrade.js';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectGrade, setSelectGrade] = useState({});
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

  const handleDelete = async (grade) => {
    const isDeleted = await api.deleteGrade(grade);
    if (isDeleted) {
      const deleteGradeIndex = allGrades.findIndex((gr) => gr.id === grade.id);
      const newGrades = Object.assign([], allGrades);
      newGrades[deleteGradeIndex].isDeleted = true;
      newGrades[deleteGradeIndex].value = 0;
      setAllGrades(newGrades);
    }
  };
  const handlePersist = (grade) => {
    setSelectGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = (formData) => {
    const { id, newValue } = formData;
    const newGrades = Object.assign([], allGrades);
    const gradetoPersist = newGrades.find((gr) => gr.id === id);
    gradetoPersist.value = newValue;

    if (gradetoPersist.isDeleted) {
      gradetoPersist.isDeleted = false;
      const insertGrade = async () => {
        await api.insertGrade(gradetoPersist);
      };
      insertGrade();
    } else {
      const updateGrade = async () => {
        await api.updateGrade(gradetoPersist);
      };
      updateGrade();
    }
    setAllGrades(newGrades);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
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
        {isModalOpen && (
          <ModalGrade
            onSave={handlePersistData}
            onClose={handleClose}
            selectGrade={selectGrade}
          />
        )}
      </div>
    </Fragment>
  );
}
