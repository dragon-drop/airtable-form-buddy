import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { FormField, Input } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const PhoneNumber = ({ field, validationConfig }) => {
  const [value, setValue] = useState("");

  PubSub.subscribe('resetForm', () => {
    setValue('');
  });

  return (
    <FormField label={getFieldLabel(field, validationConfig)} description="Can contain numbers, spaces, and any of ()-+">
      <Input
        type="tel"
        name={field.name}
        required={validationConfig.required}
        value={value}
        minLength={8}
        onChange={e => setValue(e.target.value)}
        pattern="[-+\d\s\(\)x]+"
      />
    </FormField>
  )
};

export default PhoneNumber;
