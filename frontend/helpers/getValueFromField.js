const getValueFromField = (field, existingValue) => {
  let { type, value, checked } = field;

  // get type from class attr because some of the Airtable inputs don't allow data attrs
  ['multiple-records', 'percent', 'barcode', 'rating', 'duration']
    .forEach(classType => {
      if (field.classList.contains(classType)) type = classType;
    });

  switch (type) {
  case 'checkbox': return checked;
  case 'radio': return checked? value : existingValue;
  case 'select-one': return value ? { id: value } : value;
  case 'multiple-records': return value ? value.split(',').map(id => ({ id })) : null;
  case 'number': return parseFloat(value);
  case 'barcode': return { text: value };
  case 'rating': return checked? parseInt(value, 10) : parseInt(existingValue, 10);
  case 'percent': return parseFloat(value / 100);
  }

  return value;
};

export default getValueFromField;
