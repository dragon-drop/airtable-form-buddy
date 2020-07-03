import React from 'react';
import { FormField } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Textarea = ({ field, validationConfig }) => {
  let description = '';

  if (validationConfig.minLength && !validationConfig.maxLength) {
    description = `At least ${validationConfig.minLength} characters.`;
  } else if (validationConfig.minLength && validationConfig.maxLength) {
    description = `Between ${validationConfig.minLength} and ${validationConfig.maxLength} characters.`;
  } else if (!validationConfig.minLength && validationConfig.maxLength) {
    description = `Less than ${validationConfig.maxLength} characters.`;
  }

  return (
    <FormField
      htmlFor={field.name}
      label={getFieldLabel(field, validationConfig)}
      description={description}
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
