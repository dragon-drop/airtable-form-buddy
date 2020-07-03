import React, { useState } from 'react';
import { FormField, Input } from "@airtable/blocks/ui";
import getPattern from '../../helpers/getPattern';
import getFieldLabel from '../../helpers/getFieldLabel';

const SingleLineText = ({ field, validationConfig }) => {
  const patternConfig = getPattern(validationConfig.pattern);
  const [value, setValue] = useState("");

  return (
    <FormField
      label={getFieldLabel(field, validationConfig)}
      description={patternConfig.description}
    >
      <Input
        name={field.name}
        minLength={validationConfig.minLength}
        maxLength={validationConfig.maxLength}
        required={validationConfig.required}
        pattern={patternConfig.regex}
        value={value}
        onChange={e => {
          console.log('SingleLineText onChange', e.target.value, e)
          setValue(e.target.value)
        }}
      />
    </FormField>
  )
};

export default SingleLineText;
