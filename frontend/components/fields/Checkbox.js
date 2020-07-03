import React, { useState } from 'react';
import { FormField, Input, Icon, colorUtils } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Checkbox = ({ field, validationConfig }) => {
  const [checked, setChecked] = useState(false);

  return (
    <FormField
      label={getFieldLabel(field, validationConfig)}
    >
      <div className={`checkbox${checked? ' checkbox--is-checked' : ''}`}>
        <Input
          type="checkbox"
          name={field.name}
          required={validationConfig.required}
          value="1"
          onChange={event => setChecked(event.target.checked)}
        />
        <Icon name={field.options.icon} fillColor={colorUtils.getHexForColor(field.options.color)} />
      </div>
    </FormField>
  )
};

export default Checkbox;
