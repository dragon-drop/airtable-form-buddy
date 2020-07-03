import React, { useState } from 'react';

import { FormField, Input } from "@airtable/blocks/ui";

const Field = (field) => {
  const [value, setValue] = useState("");
  return (
    <FormField label="Text field">
      <Input value={value} onChange={e => setValue(e.target.value)} />
    </FormField>
  );
};

export default Field;
