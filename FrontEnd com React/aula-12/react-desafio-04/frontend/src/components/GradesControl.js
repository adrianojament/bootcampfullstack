import React, { Fragment } from 'react';
import Action from './Action';
// Aulas 12.12 - Desafio Guiado 4 (Parte 12)
export default function GradesControl({ grades, onDelete, onPersist }) {
  const tableGrades = [];

  let _StudentGrades = [];
  let id = 0;
  let _novo = false;
  let old = Object.assign([], grades[0]);

  for (let index = 0; index < grades.length; index++) {
    let grade = grades[index];
    if (typeof grades[index + 1] === 'undefined') {
      _novo = true;
      _StudentGrades.push(Object.assign([], grade));
    } else {
      _novo = old.subject.localeCompare(grade.subject) !== 0;
    }
    if (_novo) {
      tableGrades.push({
        id: ++id,
        student: old.student,
        subject: old.subject,
        grades: Object.assign([], _StudentGrades),
      });
      _StudentGrades = [];
    }
    _StudentGrades.push(Object.assign([], grade));
    old = Object.assign([], grade);
  }

  const handleActionClick = (id, type) => {
    console.log(id + ' ' + type);
  };

  return (
    <Fragment>
      {tableGrades.map(({ id, grades }) => {
        console.log();
        return (
          <table className="striped" key={id}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, student, subject, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action
                            onActionClick={handleActionClick}
                            id={id}
                            type={isDeleted ? 'add' : 'edit'}
                          />
                          {!isDeleted && (
                            <Action
                              onActionClick={handleActionClick}
                              id={id}
                              type="delete"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot></tfoot>
          </table>
        );
      })}
    </Fragment>
  );
}
