import React from 'react';

import { FieldType } from '@airtable/blocks/models';

import Checkbox from './fields/Checkbox';
import Date from './fields/Date';
import Email from './fields/Email';
// import Select from './fields/Select';
import SingleLineText from './fields/SingleLineText';
import Textarea from './fields/Textarea';
import RecordList from './fields/RecordList';

const FieldControl = ({ field, validationConfig }) => {
  if (field.isComputed) return null;

  const { type, name } = field;

  switch (type) {
  // case FieldType.AUTO_NUMBER: return null;
  case FieldType.BARCODE: return <SingleLineText field={field} validationConfig={validationConfig} />;
  // case FieldType.BUTTON: return null;
  case FieldType.CHECKBOX: return <Checkbox field={field} validationConfig={validationConfig} />;
  // case FieldType.COUNT: return null;
  // case FieldType.CREATED_BY: return null;
  // case FieldType.CREATED_TIME: return null;
  // case FieldType.CURRENCY: return null;
  case FieldType.DATE: return <Date field={field} validationConfig={validationConfig} />;
  // case FieldType.DATE_TIME: return null;
  // case FieldType.DURATION: return null;
  case FieldType.EMAIL: return <Email field={field} validationConfig={validationConfig} />;
  // case FieldType.FORMULA: return null;
  // case FieldType.LAST_MODIFIED_BY: return null;
  // case FieldType.LAST_MODIFIED_TIME: reFixinturn null;
  case FieldType.MULTILINE_TEXT: return <Textarea field={field} validationConfig={validationConfig} />;
  // case FieldType.MULTIPLE_ATTACHMENTS: return null;
  // case FieldType.MULTIPLE_COLLABORATORS: return null;
  // case FieldType.MULTIPLE_LOOKUP_VALUES: return null;
  case FieldType.MULTIPLE_RECORD_LINKS: return <RecordList field={field} validationConfig={validationConfig} />;
  // case FieldType.MULTIPLE_SELECTS: return null;
  // case FieldType.NUMBER: return null;
  // case FieldType.PERCENT: return null;
  // case FieldType.PHONE_NUMBER: return null;
  // case FieldType.RATING: return null;
  // case FieldType.RICH_TEXT: return null;
  // case FieldType.ROLLUP: return null;
  // case FieldType.SINGLE_COLLABORATOR: return null;
  case FieldType.SINGLE_LINE_TEXT: return <SingleLineText field={field} validationConfig={validationConfig} />;
  // case FieldType.SINGLE_SELECT: return <Select field={field} />;
  // case FieldType.URL: return null;
  default: return null
  }
};

export default FieldControl;
