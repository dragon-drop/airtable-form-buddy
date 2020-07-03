import React from "react";
import { FormField } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const SelectControl = ({ field, validationConfig }) => {
  let options = null;

  if (field.options.choices) {
    options = field.options.choices.map(choice =>
      <option key={choice.id} value={choice.id}>{choice.name}</option>
    );
  } else if (field.options.max) {
    options = [];
    for (let i = 1; i <= field.options.max; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
  }
  
  return (
    <FormField label={getFieldLabel(field, validationConfig)}>
      <select className="airtable-input" name={field.name} required={validationConfig.required}>
        <option></option>
        {options}
      </select>
    </FormField>
  );
};

export default SelectControl;
