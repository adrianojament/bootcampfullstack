import React from 'react';

export default function Toggle(props) {
  const handleChange = (event) => {
    const { onToggle } = props;
    const isChecked = event.target.checked;
    onToggle(isChecked);
  };

  const { enabled, description } = props;
  let newDescription = 'Titulo nao informado';

  if (description) {
    newDescription = description;
  }

  return (
    <div className="switch">
      <label>
        {newDescription}
        <input type="checkbox" checked={enabled} onChange={handleChange} />
        <span className="lever"></span>
      </label>
    </div>
  );
}
