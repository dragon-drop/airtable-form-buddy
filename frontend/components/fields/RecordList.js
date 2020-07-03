import {
  RecordCardList,
  TextButton,
  useRecords,
  FormField,
  useBase,
  Text,
  Box
} from '@airtable/blocks/ui';
import React, { useState } from 'react';
import getFieldLabel from '../../helpers/getFieldLabel';
import removeDuplicates from '../../helpers/removeDuplicates';

const RecordList = ({ field, validationConfig }) => {
  const { linkedTableId } = field.options;
  const base = useBase();
  const table = base.getTableByIdIfExists(linkedTableId);
  const queryResult = table.selectRecords();
  const records = useRecords(queryResult);

  const [showRecords, setShowRecords] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);

  window.addEventListener('resetForm', () => {
    setShowRecords(false);
    setSelectedRecords([]);
  });

  // to remove ones already added
  const filteredRecords = records.filter(el => selectedRecords.map(record => record.id).indexOf(el.id) === -1)

  return (
    <FormField label={getFieldLabel(field, validationConfig)}>
      {selectedRecords.length > 0 && (
        <React.Fragment>
          <Text textColor="light">Click record to remove.</Text>

          <input type="hidden" name={field.name} data-multiple-record-links required={validationConfig.required} defaultValue={selectedRecords.map(record => record.id).join(',')} />

          <Box height={`${Math.min(selectedRecords.length * 100, 300)}px`} border="thick" backgroundColor="lightGray1" marginTop={2} marginBottom={2}>
            <RecordCardList records={selectedRecords} onRecordClick={record => {
              const updatedRecords = selectedRecords.filter(el => el.id !== record.id);
              setSelectedRecords(updatedRecords);
            }} />
          </Box>
        </React.Fragment>
      )}

      <TextButton icon="plus" onClick={() => setShowRecords(true)} style={{ display: 'inline' }}>Link to a record from Related</TextButton>

      {showRecords && (
        <Box height={`${Math.min(filteredRecords.length * 100, 300)}px`} border="thick" backgroundColor="lightGray1" marginTop={2}>
          <RecordCardList records={filteredRecords} onRecordClick={record => {
            const updatedRecords = [...selectedRecords];
            updatedRecords.push(record);
            setSelectedRecords(removeDuplicates(updatedRecords, 'id'));
            setShowRecords(false);
          }} />
        </Box>
      )}
    </FormField>
  );
};

export default RecordList;
