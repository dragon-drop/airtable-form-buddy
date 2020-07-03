const getValueFromField = (field, existingValue) => {
  let { type, name, value, checked } = field;

  if (field.getAttribute('data-multiple-record-links')) {
    type = 'multiple-record-links';
  }

  if (field.classList.contains('percent')) {
    type = 'percent';
  }

  console.log('getAttribute', field, type);

  switch (name) {
  case 'Barcode': return { text: value };
  case 'Rating': return parseInt(value);
}

switch (type) {
  case 'checkbox': return checked;
  case 'radio': return checked? value : existingValue;
  case 'select-one': return value ? { id: value } : value;
  case 'multiple-record-links': return value ? value.split(',').map(id => ({ id })) : null;
  case 'number': return parseFloat(value);
  case 'percent': return parseFloat(value / 100);
  }

  return value;
};

export default getValueFromField;
