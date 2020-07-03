const getValueFromField = (field, existingValue) => {
  let { type, value, checked } = field;

  if (field.getAttribute('data-multiple-record-links')) {
    type = 'multiple-record-links';
  }

  switch (type) {
  case 'checkbox': return checked;
  case 'radio': return checked? value : existingValue;
  case 'multiple-record-links': return value.split(',').map(id => ({ id }));
  default: return value;
  }
};

export default getValueFromField;
