import React, { useState } from 'react';
import { FormField, Input } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Email = ({ field, validationConfig }) => {
  const [value, setValue] = useState("");

  return (
    <FormField label={getFieldLabel(field, validationConfig)}>
      <Input
        type="email"
        name={field.name}
        required={validationConfig.required}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </FormField>
  )
};

export default Email;
