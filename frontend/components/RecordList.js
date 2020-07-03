import {
  RecordCardList,
  useRecords,
  useBase,
  Box
} from '@airtable/blocks/ui';
import React from 'react';

const RecordList = ({ field }) => {
  const { linkedTableId } = field.options;
  const base = useBase();
  const table = base.getTableByIdIfExists(linkedTableId);
  const queryResult = table.selectRecords();
  const records = useRecords(queryResult);

  return (
    <Box height="300px" border="thick" backgroundColor="lightGray1">
      <RecordCardList records={records} />
    </Box>
  );
};

export default RecordList;
