import React, { Fragment } from 'react';
import Action from './Action';

import css from './gradescontrol.module.css';

export default function GradesControl({ grades, onDelete, onPersist }) {
  const tableGrades = AgruparAlunos(grades);

  const handleActionClick = (id, type) => {
    const grade = grades.find((g) => g.id === id);
    if (type === 'delete') {
      onDelete(grade);
      return;
    }

    onPersist(grade);
  };

  return (
    <Fragment>
      {tableGrades.map(({ id, grades }) => {
        const typeFinal = grades.reduce((acc, curr) => acc + curr.value, 0);
        const gradeStyle = typeFinal >= 70 ? css.goodGrade : css.badGrade;
        return (
          <table className={`striped ${css.table}`} key={id}>
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
            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <span className={gradeStyle}>{typeFinal}</span>
                </td>
                <td>&nbsp;</td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </Fragment>
  );
}

function AgruparAlunos(grades) {
  let tableGrades = [];
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
  return tableGrades;
}
