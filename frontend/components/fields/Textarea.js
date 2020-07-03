import React from 'react';
import { FormField } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Textarea = ({ field, validationConfig }) => {
  return (
    <FormField
      htmlFor={field.name}
      label={getFieldLabel(field, validationConfig)}
    >
      <textarea
        id={field.name}
        className="airtable-input"
        name={field.name}
        minLength={validationConfig.minLength}
        maxLength={validationConfig.maxLength}
        required={validationConfig.required}
      ></textarea>
    </FormField>
  )
};

export default Textarea;
