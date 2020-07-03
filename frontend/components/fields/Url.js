import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { FormField, Input } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Url = ({ field, validationConfig }) => {
  const [value, setValue] = useState("");

  PubSub.subscribe('resetForm', () => {
    setValue('');
  });

  return (
    <FormField label={getFieldLabel(field, validationConfig)} description="E.g. https://www.airtable.com">
      <Input
        type="text"
        name={field.name}
        required={validationConfig.required}
        value={value}
        onChange={e => setValue(e.target.value)}
        pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
      />
    </FormField>
  )
};

export default Url;
