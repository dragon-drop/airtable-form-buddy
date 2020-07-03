import React, { useState } from 'react';
import { FormField, Input } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const formatDate = (date) => {
  return date.toJSON().slice(0,10);
};

const relativeDays = (date, numDays) => {
  date.setDate(date.getDate() + numDays);
  return formatDate(date);
};

const DateField = ({ field, validationConfig }) => {
  const [value, setValue] = useState('');
  
  let min, max;

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
      }
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
      }
    }
  }

  return (
    <FormField label={getFieldLabel(field, validationConfig)}>
      <input
        type="date"
        className="airtable-input"
        name={field.name}
        min={min}
        max={max}
        required={validationConfig.required}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </FormField>
  )
};

export default DateField;
