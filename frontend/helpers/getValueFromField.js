const getValueFromField = (field, existingValue) => {
  const { type, value, checked } = field;

  switch (type) {
  case 'checkbox': return checked;
  case 'radio': return checked? value : existingValue;
  default: return value;
  }
};

export default getValueFromField;
