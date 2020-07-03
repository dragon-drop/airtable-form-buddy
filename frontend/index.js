import {
  loadCSSFromString,
  initializeBlock,
  useGlobalConfig,
  SelectButtons,
  TablePicker,
  colorUtils,
  useBase,
  Loader,
  Button,
  colors,
  Icon,
  Box,
} from '@airtable/blocks/ui';
import React, { useState } from 'react';

import { createRecord } from './api/table';
import FieldConfig from './components/FieldConfig';
import FieldControl from './components/FieldControl';
import getValueFromField from './helpers/getValueFromField';

import styles from './styles.js';
loadCSSFromString(styles);

const ColouredBox = ({ colour, children, ...opts }) => {
  return (
    <Box backgroundColor={colour} style={{ color: colorUtils.shouldUseLightTextOnColor(colour) ? 'white' : 'inherit' }} {...opts}>
      {children}
    </Box>
  );
};

const VIEWS = {
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
      onChange={onChange}
      options={options}
    />
  );
};

const SexyFormBlock = () => {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get('selectedTableId');
  const table = base.getTableByIdIfExists(tableId);

  const validationConfig = globalConfig.get(`validationConfig-${tableId}`) || {};
  const hasConfiguration = Object.keys(validationConfig).length > 0;

  const [feedback, setFeedback] = useState('');
  const [view, setView] = useState(hasConfiguration ? VIEWS.form : VIEWS.settings);

  if (!table) {
    return (
      <Box padding={3}>
        <TablePicker
          onChange={newTable => globalConfig.setAsync('selectedTableId', newTable.id)}
          style={{ fontSize: '20px' }}
        />
      </Box>
    );
  }

  // console.log({ table, validationConfig, fields: table.fields })

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const fields = form.querySelectorAll('[name]');
    const fieldsArray = Array.from(fields);
    const json = fieldsArray.reduce(
      (obj, field) => { obj[field.name] = getValueFromField(field); return obj }, {}
    );

    setFeedback(<Loader />);
    
    createRecord(table, json, () => {
      setFeedback('Record created');
      setTimeout(() => setFeedback(''), 2000);

      form.reset();
      // reset React inputs
      // https://github.com/facebook/react/issues/11488#issuecomment-347775628
      fieldsArray.forEach(input => {
        let lastValue = input.value;
        
        if (input.type === 'checkbox') {
          input.checked = false;
        } else {
          input.value = '';
        }

        const theEvent = new Event('input', { bubbles: true });
        // hack
        theEvent.simulated = true;
        // hack
        let tracker = input._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        input.dispatchEvent(theEvent);

        window.dispatchEvent(new CustomEvent('resetForm'));
      })
    });
  };

  const savePreferences = async (event) => {
    event.preventDefault();

    const form = event.target;
    const fields = form.querySelectorAll('[name]');
    const fieldsArray = Array.from(fields);
    const json = fieldsArray.reduce(
      (obj, field) => {
        let [scope, name] = field.name.split('[');
        name = name.split(']')[0];
        obj[scope] = obj[scope] || {};
        // we pass in the existing value in case one has already been set, e.g. radios
        obj[scope][name] = getValueFromField(field, obj[scope][name]);
        return obj;
      }, {}
    );

    setFeedback(<Loader />);

    await globalConfig.setAsync(`validationConfig-${tableId}`, json);

    setFeedback('Config saved');
    setTimeout(() => setFeedback(''), 2000);
    setView(VIEWS.form);
  };

  return (
    <div className="wrapper">
      {feedback ? <div className="notification">{feedback}</div> : null}
      <Box padding={3}>
        <TablePicker
          table={table}
          onChange={newTable => globalConfig.setAsync('selectedTableId', newTable.id)}
          style={{ fontSize: '20px' }}
        />

        <ViewSwitcher value={view} onChange={view => setView(view)} />
      </Box>

      {view === VIEWS.form && (
        <Box padding={3}>
          <form onSubmit={onSubmit}>
            <p>Fields marked with * are required.</p>
            
            {table.fields.map(field => {
              const validationRules = validationConfig[field.id] || {};
              return (
                <FieldControl key={field.id} field={field} validationConfig={validationRules} />
              );
            })}

            <Button type="submit" variant="primary">Save</Button>
          </form>
        </Box>
      )}

      {view === VIEWS.settings && (
        <Box padding={3} backgroundColor={colors.GRAY_LIGHT_2}>

          {!hasConfiguration && (
            <ColouredBox colour={colors.BLUE_LIGHT_2} padding={3}>
              <div className="message">
                <Icon name="info" size={16} />
                <div>
                  <p>Complete the rules below to configure the validation settings for your form.</p>
                  <p>When done you can switch to the form using the control above.</p>
                </div>
              </div>
            </ColouredBox>
          )}

          <form onSubmit={savePreferences}>
            {table.fields.map(field => {
              const validationRules = validationConfig[field.id] || {};
              return (<FieldConfig key={field.id} field={field} validationConfig={validationRules} />)
            })}
            
            <Button type="submit" variant="primary">Save preferences</Button>
          </form>
        </Box>
      )}
    </div>
  );
}

initializeBlock(() => <SexyFormBlock />);
