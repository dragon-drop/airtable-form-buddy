const getValueFromField = (field, existingValue) => {
  let { type, name, value, checked } = field;

  if (field.getAttribute('data-multiple-record-links')) {
    type = 'multiple-record-links';
  }

  switch (type) {
  case 'checkbox': return checked;
  case 'radio': return checked? value : existingValue;
  case 'select-one': return value ? { id: value } : value;
  case 'multiple-record-links': return value.split(',').map(id => ({ id }));
  }

  switch (name) {
    case 'Barcode': return { text: value };
  }

  return value;
};

export default getValueFromField;
