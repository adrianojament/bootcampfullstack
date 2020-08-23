import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as api from '../api/apiService';
import css from './modalgrade.module.css';

Modal.setAppElement('#root');
export default function ModalGrade({ onSave, onClose, selectGrade }) {
  const { id, student, value, type, subject } = selectGrade;

  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getGradeValidation = async () => {
      const validation = await api.getValidationFormGradeType(type);
      setGradeValidation(validation);
    };
    getGradeValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;

    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }
    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleOnClose();
    }
  };

  const handleOnClose = () => {
    onClose(null);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id,
      newValue: gradeValue,
    };
    onSave(formData);
  };
  const handleGradeChange = (event) => {
    // para fazer cast usar + para inteiro
    setGradeValue(+event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div className={css.flexRow}>
          <span className={css.title}>Manutenção de Notas</span>
          <button
            className="btn-floating btn-small waves-effect waves-light red"
            onClick={handleOnClose}
          >
            <i className="material-icons left">close</i>
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" value={student} readOnly />
            <label className="active" htmlFor="inputName">
              Nome do Aluno
            </label>
          </div>
          <div className="input-field">
            <input id="inputSubject" type="text" value={subject} readOnly />
            <label className="active" htmlFor="inputSubject">
              Disciplina
            </label>
          </div>
          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo de Avaliação
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              value={gradeValue}
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota
            </label>
          </div>

          <div className={`${css.flexRow}`}>
            <span className={css.ErrorMessage}>{errorMessage}</span>
            <button
              className="btn waves-effect waves-light blue darken-2"
              type="submit"
              name="action"
              disabled={errorMessage.trim() !== ''}
            >
              Salvar
              <i className="material-icons right">save</i>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
