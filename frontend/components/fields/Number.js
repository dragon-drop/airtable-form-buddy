import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { FormField, Input } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Number = ({ field, validationConfig }) => {
  const [value, setValue] = useState("");

  PubSub.subscribe('resetForm', () => {
    setValue('');
  });

  let description = 'Must be a number';

  if (validationConfig.min && !validationConfig.max) {
    description = `At least ${validationConfig.min}.`;
  } else if (validationConfig.min && validationConfig.max) {
    description = `Between ${validationConfig.min} and ${validationConfig.max}.`;
  } else if (!validationConfig.min && validationConfig.max) {
    description = `Less than ${validationConfig.max}.`;
  }

  return (
    <FormField label={getFieldLabel(field, validationConfig)} description={description}>
      <Input
        type="number"
        name={field.name}
        required={validationConfig.required}
        value={value}
        min={validationConfig.min}
        max={validationConfig.max}
        onChange={e => setValue(e.target.value)}
        className={field.type}
        step={field.type === 'percent' ? '0.00000001' : null}
      />
    </FormField>
  )
};

export default Number;
