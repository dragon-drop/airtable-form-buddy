import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { FormField, Input } from "@airtable/blocks/ui";
import getPattern from '../../helpers/getPattern';
import getFieldLabel from '../../helpers/getFieldLabel';

const optionalParse = value => value ? parseInt(value, 10) : null

const SingleLineText = ({ field, validationConfig }) => {
  const patternConfig = getPattern(validationConfig.pattern);
  const [value, setValue] = useState("");

  PubSub.subscribe('resetForm', () => {
    setValue('');
  });

  let description = patternConfig.description || '';

  if (validationConfig.minLength && !validationConfig.maxLength) {
    description = `At least ${validationConfig.minLength} characters.`;
  } else if (validationConfig.minLength && validationConfig.maxLength) {
    description = `Between ${validationConfig.minLength} and ${validationConfig.maxLength} characters.`;
  } else if (!validationConfig.minLength && validationConfig.maxLength) {
    description = `Less than ${validationConfig.maxLength} characters.`;
  }

  return (
    <FormField
      label={getFieldLabel(field, validationConfig)}
      description={description}
    >
      <Input
        name={field.name}
        minLength={optionalParse(validationConfig.minLength)}
        maxLength={optionalParse(validationConfig.maxLength)}
        required={validationConfig.required}
        pattern={patternConfig.regex}
        value={value}
        className={field.type}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
    </FormField>
  )
};

export default SingleLineText;
