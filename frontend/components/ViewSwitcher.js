import {
  SelectButtons,
} from '@airtable/blocks/ui';
import React from 'react';
import scrollTop from '../helpers/scrollTop';

export const VIEWS = {
  form: 'form',
  settings: 'settings'
};

const ViewSwitcher = ({ value, onChange }) => {
  const options = [
    { value: VIEWS.form, label: 'Form' },
    { value: VIEWS.settings, label: 'Validation rules' }
  ];

  return (
    <SelectButtons
      value={value}
      onChange={value => {
        onChange(value);
        scrollTop();
      }}
      options={options}
    />
  );
};

export default ViewSwitcher;
