import React from "react";
import { FormField } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const SelectControl = ({ field, validationConfig }) => {
  return (
    <FormField label={getFieldLabel(field, validationConfig)}>
      <select className="airtable-input" name={field.name} required={validationConfig.required}>
        <option></option>
        {field.options.choices.map(choice =>
          <option key={choice.id} value={choice.id}>{choice.name}</option>
        )}
      </select>
    </FormField>
  );
};

export default SelectControl;
