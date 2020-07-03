import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { FormField, Icon, colorUtils } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Checkbox = ({ field, validationConfig }) => {
  const [checked, setChecked] = useState(false);

  PubSub.subscribe('resetForm', () => {
    setChecked(false);
  });

  return (
    <FormField
      label={getFieldLabel(field, validationConfig)}
    >
      <div className={`checkbox${checked? ' checkbox--is-checked' : ''}`}>
        <input
          type="checkbox"
          id={field.id}
          name={field.name}
          className="visuallyhidden"
          required={validationConfig.required}
          value="1"
          onChange={event => setChecked(event.target.checked)}
        />
        <label className="airtable-input" htmlFor={field.id}><Icon name={field.options.icon} fillColor={colorUtils.getHexForColor(field.options.color)} /></label>
      </div>
    </FormField>
  )
};

export default Checkbox;
