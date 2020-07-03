import React from 'react';

const Select = ({ field }) => {
  return (
    <select name={field.name}>
      <option></option>
      {field.options.choices.map(choice =>
        <option key={choice.id} value={choice.id}>{choice.name}</option>
      )}
    </select>
  )
};

export default Select;
