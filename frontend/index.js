import {
  useSettingsButton,
  loadCSSFromString,
  initializeBlock,
  useGlobalConfig,
  TablePicker,
  useBase,
  Loader,
  Button,
  colors,
  Text,
  Icon,
  Box,
  Heading,
} from '@airtable/blocks/ui';
import React, { useState } from 'react';
import PubSub from 'pubsub-js';

import { createRecord } from './api/table';
import ColouredBox from './components/ColouredBox';
import FieldConfig from './components/FieldConfig';
import FieldControl from './components/FieldControl';
import PermissionsError from './components/PermissionsError';
import ViewSwitcher, { VIEWS } from './components/ViewSwitcher';
import getValueFromField from './helpers/getValueFromField';
import scrollTop from './helpers/scrollTop';

import styles from './styles.js';
loadCSSFromString(styles);

const SexyFormBlock = () => {
  const base = useBase();
  const globalConfig = useGlobalConfig();
  const tableId = globalConfig.get('selectedTableId');
  const table = base.getTableByIdIfExists(tableId);

  const validationConfig = globalConfig.get(`validationConfig-${tableId}`) || {};
  const hasConfiguration = Object.keys(validationConfig).length > 0;

  const [feedback, setFeedback] = useState({});
  const [isShowingSettings, setIsShowingSettings] = useState(!hasConfiguration);
  useSettingsButton(() => {
    setIsShowingSettings(true);
    scrollTop();
  });

  const [sharedState, setSharedState] = useState({});
  let permissionsError = '';
  const checkPermissions = permissionObject => {
    if (!permissionObject.hasPermission) {
      permissionsError = permissionObject.reasonDisplayString;
    }
  };

  checkPermissions(globalConfig.checkPermissionsForSet('selectedTableId'));

  if (table) {
    checkPermissions(table.checkPermissionsForCreateRecords());
  }

  if (permissionsError) {
    return <PermissionsError message={permissionsError} />
  }

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

  // console.log({ base, table, validationConfig, fields: table.fields })

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const fields = form.querySelectorAll('[name]');
    const fieldsArray = Array.from(fields);
    const json = fieldsArray.reduce(
      (obj, field) => {
        const value = getValueFromField(field, obj[field.name]);
        if (value) {
          obj[field.name] = value;
        }
        return obj;
      }, {}
    );

    scrollTop();
    setFeedback({ message: <Loader /> });

    // console.log({ json });
    // return console.log({ json });
    
    createRecord(table, json, () => {
      setFeedback({ message: 'Record created', timesout: true });

      form.reset();
      PubSub.publish('resetForm');
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

    setFeedback({ message: <Loader /> });

    await globalConfig.setAsync(`validationConfig-${tableId}`, json);

    setFeedback({ message: 'Config saved', timesout: true });
    setIsShowingSettings(false);
    scrollTop();
  };

  return (
    <div className="wrapper">
      {feedback.message ? <div className={`notification${feedback.timesout? ' notification--timesout': ''}`}>{feedback.message}</div> : null}

      <Box padding={3}>
        <TablePicker
          table={table}
          onChange={newTable => globalConfig.setAsync('selectedTableId', newTable.id)}
        />

        <Heading marginTop={3}>{table.name}</Heading>

        <ViewSwitcher value={isShowingSettings ? VIEWS.settings : VIEWS.form} onChange={view => setIsShowingSettings(view === VIEWS.settings)} />
      </Box>

      {!isShowingSettings && (
        <Box padding={3}>
          <Text textColor="light"><Icon name="info" size={12} /> Fields marked with * are required.</Text>
        
          <form className="spaced" onSubmit={onSubmit}>
            {table.fields.map(field => {
              const validationRules = validationConfig[field.id] || {};
              return (
                <FieldControl key={field.id} field={field} validationConfig={validationRules} sharedState={sharedState} setSharedState={(value) => {
                  setSharedState(value);
                  PubSub.publish('updatedState', value);
                }} />
              );
            })}

            <Button type="submit" variant="primary">Save</Button>
          </form>
        </Box>
      )}

      {isShowingSettings && (
        <Box padding={3} backgroundColor={colors.GRAY_LIGHT_2}>

          {!hasConfiguration && (
            <ColouredBox colour={colors.BLUE_LIGHT_2} padding={3} marginBottom={3}>
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
            <Button type="submit" variant="primary">Save rules</Button>

            {table.fields.map(field => {
              const validationRules = validationConfig[field.id] || {};
              return (<FieldConfig key={field.id} field={field} validationConfig={validationRules} />)
            })}

            <Text textColor="light" marginTop={3}>Fin.</Text>
          </form>
        </Box>
      )}
    </div>
  );
}

initializeBlock(() => <SexyFormBlock />);
