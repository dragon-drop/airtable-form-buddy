import React, { useState } from 'react';
import {
  Box,
  Text,
  Select,
  Heading,
  useBase,
  FieldIcon,
  useGlobalConfig,
} from '@airtable/blocks/ui';
import { FieldType } from '@airtable/blocks/models';

import { patterns } from '../helpers/getPattern';

const customError = (message) => event => event.target.setCustomValidity(message)

const validationField = (type, { id }, validationConfig) => {
  const value = validationConfig[type];
  const fieldName = (name) => `${id}[${name}]`;

  const Pattern = () => {
    const options = [
      { value: '', label: '' },
      ...Object.keys(patterns).map(id => ({ value: id, label: patterns[id].name }))
    ];
    const [value, setValue] = useState(options[0].value);

    return (
      <Select data-scope={id} name={fieldName(type)} value={value} options={options} onChange={newValue => setValue(newValue)} />
    )
  };

  const FieldChooser = () => {
    const base = useBase();
    const globalConfig = useGlobalConfig();
    const tableId = globalConfig.get('selectedTableId');
    const table = base.getTableByIdIfExists(tableId);
    // If table is null or undefined, the FieldPicker will not render.
    return (
      <select>
        {table.fields.map(field => {
          if (field.type === 'date' && field.id !== id) {
            return <option value={field.id}>{field.name}</option>;
          }
          return null;
        })}
      </select>
    );
  };

  const DateRange = () => {
    const [rangeType, setRangeType] = useState(!!value);
    const [dateOrigin, setDateOrigin] = useState(validationConfig.date);

    return (
      <React.Fragment>
        <div className="rule">
          <Heading size="xsmall">Applicable days</Heading>
          <Text textColor="light">Date selection can be restricted to a specific period. This can be based on another field, today's date, or a fixed date.</Text>

          <div className="fields" style={{ justifyContent: 'space-between' }}>
            <label>
              Allow any date:
              <input type="radio" name={fieldName('dateRange')} value="" defaultChecked={!value} onChange={event => setRangeType(event.target.value)} />
            </label>
            <label>
              Before a date:
              <input type="radio" name={fieldName('dateRange')} value="before" defaultChecked={value === 'before'} onChange={event => setRangeType(event.target.value)} />
            </label>
            <label>
              After a date:
              <input type="radio" name={fieldName('dateRange')} value="after" defaultChecked={value === 'after'} onChange={event => setRangeType(event.target.value)} />
            </label>
          </div>
        </div>
        {rangeType && (
          <React.Fragment>
            <Text textColor="light" style={{ marginTop: '16px' }}>2. Ok, where will this date come from?</Text>

            <div className="fields" style={{ justifyContent: 'space-between' }}>
              <label>
                A record:
                <input type="radio" name={fieldName('date')} value="dateField" defaultChecked={validationConfig.date === 'dateField'} onChange={event => setDateOrigin(event.target.value)} />
              </label>
              <label>
                Today's date:
                <input type="radio" name={fieldName('date')} value="today" defaultChecked={validationConfig.date === 'today'} onChange={event => setDateOrigin(event.target.value)} />
              </label>
              <label>
                Fixed date:
                <input type="radio" name={fieldName('date')} value="fixedDate" defaultChecked={validationConfig.date === 'fixedDate'} onChange={event => setDateOrigin(event.target.value)} />
              </label>
            </div>
          </React.Fragment>
        )}
        {rangeType && dateOrigin === 'dateField' && (
          <React.Fragment>
            <Text textColor="light" style={{ marginTop: '16px' }}>3. Specify the field.</Text>
            <div className="fields">
              <FieldChooser />
            </div>
          </React.Fragment>
        )}
        {rangeType && dateOrigin === 'fixedDate' && (
          <React.Fragment>
            <Text textColor="light" style={{ marginTop: '16px' }}>3. Specify the date.</Text>
            <div className="fields">
              <input type="date" name={fieldName('theDate')} defaultValue={validationConfig.theDate} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  switch (type) {
    case 'required': return (
      <div className="rule">
        <Heading size="xsmall">Required? <input type="checkbox" name={fieldName('required')} defaultChecked={value} /></Heading>
        <Text textColor="light">If required you won't be able to submit the form without completing this field.</Text>
      </div>
    );
    case 'length': return (
      <div className="rule">
        <Heading size="xsmall">Min/Max length</Heading>
        <Text textColor="light">Set the minimum and maximum number of characters that can be entered. You don't need to set both fields.</Text>
        <div className="fields">
          <input type="tel" name={fieldName('minLength')} defaultValue={validationConfig.minLength} placeholder="Min e.g. 6" pattern="[0-9]+" onInvalid={customError('Numbers only please')} />
          <span>to</span>
          <input type="tel" name={fieldName('maxLength')} defaultValue={validationConfig.maxLength} placeholder="Max e.g. 12" pattern="[0-9]+" onInvalid={customError('Numbers only please')} />
        </div>
      </div>
    );
    case 'pattern': return (
      <div className="rule">
        <Heading size="xsmall">Custom value</Heading>
        <Text textColor="light">Configure this field to only accept these types of value.</Text>
        <div className="fields">
          <Pattern />
        </div>
      </div>
    );
    case 'dateRange': return <DateRange />;
    default: return null;
  }
};

const FieldConfig = ({ field, validationConfig }) => {
  if (field.isComputed) return null;

  const { type } = field;
  let validations = null;

  switch (type) {
  case FieldType.BARCODE: validations = ['required', 'length']; break;
  case FieldType.CHECKBOX: validations = ['required']; break;
  // case FieldType.CURRENCY: validations = null; break;
  case FieldType.DATE: validations = ['required', 'dateRange']; break;
  // case FieldType.DATE_TIME: validations = null; break;
  // case FieldType.DURATION: validations = null; break;
  case FieldType.EMAIL: validations = ['required']; break;
  case FieldType.MULTILINE_TEXT: validations = ['required', 'length']; break;
  // case FieldType.MULTIPLE_ATTACHMENTS: validations = null; break;
  // case FieldType.MULTIPLE_COLLABORATORS: validations = null; break;
  // case FieldType.MULTIPLE_LOOKUP_VALUES: validations = null; break;
  // case FieldType.MULTIPLE_RECORD_LINKS: validations = ['required']; break;
  // case FieldType.MULTIPLE_SELECTS: validations = null; break;
  // case FieldType.NUMBER: validations = null; break;
  // case FieldType.PERCENT: validations = null; break;
  // case FieldType.PHONE_NUMBER: validations = null; break;
  // case FieldType.RATING: validations = null; break;
  // case FieldType.RICH_TEXT: validations = null; break;
  // case FieldType.ROLLUP: validations = null; break;
  // case FieldType.SINGLE_COLLABORATOR: validations = null; break;
  case FieldType.SINGLE_LINE_TEXT: validations = ['required', 'length']; break;
  // case FieldType.SINGLE_SELECT: validations = ['required']; break;
  // case FieldType.URL: validations = null; break;
  default: validations = null;
  }

  if (!validations) return null;

  return (
    <Box
      border="default"
      backgroundColor="white"
      padding={3}
      style={{ marginBottom: "16px" }}
    >
      <Heading className="with-icon"><FieldIcon field={field} /> {field.name}</Heading>
      
      {validations.map(validation => validationField(validation, field, validationConfig))}
    </Box>
  );
};

export default FieldConfig;
