import React, { useState } from 'react';
import { FormField } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';
import PubSub from 'pubsub-js';

const formatDate = (date) => {
  return date.toJSON().slice(0,10);
};

const relativeDays = (date, numDays) => {
  date.setDate(date.getDate() + numDays);
  return formatDate(date);
};

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const DateField = ({ field, validationConfig, onChange }) => {
  const [sharedState, setSharedState] = useState({});
  const forceUpdate = useForceUpdate();

  PubSub.subscribe('updatedState', (msg, data) => {
    setSharedState(data);
    forceUpdate();
  });

  let min, max;

  PubSub.subscribe('resetForm', () => {
    min = null;
    max = null;
  });

  if (validationConfig.dateRange) {
    if (validationConfig.dateRange === 'after') {
      if (validationConfig.date === 'today') {
        if (validationConfig.includeToday) {
          min = formatDate(new Date());
        } else {
          min = relativeDays(new Date(), 1);
        }
      } else if (validationConfig.date === 'fixedDate') {
        min = validationConfig.theDate;
      } else if (validationConfig.date === 'dateField') {
        min = sharedState[validationConfig.theField.id];
      }
      description = `Must be after ${min}`;
    }
    if (validationConfig.dateRange === 'before') {
      if (validationConfig.date === 'today') {
        if (validationConfig.includeToday) {
          max = formatDate(new Date());
        } else {
          max = relativeDays(new Date(), -1);
        }
      } else if (validationConfig.date === 'fixedDate') {
        max = validationConfig.theDate;
      } else if (validationConfig.date === 'dateField') {
        max = sharedState[validationConfig.theField.id];
      }
    }
  }

  let description = '';
  
  if (min) description = `Must be ${min} or later`;
  if (max) description = `Must be ${max} or earlier`;

  return (
    <FormField label={getFieldLabel(field, validationConfig)} description={description}>
      <input
        type="date"
        className="airtable-input"
        name={field.name}
        min={min}
        max={max}
        required={validationConfig.required}
        onChange={e => {
          const value = e.target.value;
          onChange(value);
        }}
      />
    </FormField>
  )
};

export default DateField;
