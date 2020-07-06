import React from 'react';

import { FieldType } from '@airtable/blocks/models';

import Checkbox from './fields/Checkbox';
import Date from './fields/Date';
import Email from './fields/Email';
import Number from './fields/Number';
import PhoneNumber from './fields/PhoneNumber';
import Rating from './fields/Rating';
import RecordList from './fields/RecordList';
import Select from './fields/Select';
import SingleLineText from './fields/SingleLineText';
import Textarea from './fields/Textarea';
import Url from './fields/Url';

const FieldControl = ({ field, validationConfig, sharedState, setSharedState }) => {
  if (field.isComputed) return null;

  const updateState = value => {
    sharedState[field.id] = value;
    setSharedState(sharedState);
  }

  const { type } = field;

  switch (type) {
  // case FieldType.AUTO_NUMBER: return null;
  case FieldType.BARCODE: return <SingleLineText field={field} validationConfig={validationConfig} />;
  // case FieldType.BUTTON: return null;
  case FieldType.CHECKBOX: return <Checkbox field={field} validationConfig={validationConfig} />;
  // case FieldType.COUNT: return null;
  // case FieldType.CREATED_BY: return null;
  // case FieldType.CREATED_TIME: return null;
  // case FieldType.CURRENCY: return null;
  case FieldType.DATE: return <Date field={field} validationConfig={validationConfig} onChange={updateState} />;
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
  case FieldType.NUMBER: return <Number field={field} validationConfig={validationConfig} />;
  case FieldType.PERCENT: return <Number field={field} validationConfig={validationConfig} />;
  case FieldType.PHONE_NUMBER: return <PhoneNumber field={field} validationConfig={validationConfig} />;
  case FieldType.RATING: return <Rating field={field} validationConfig={validationConfig} />;
  // case FieldType.RICH_TEXT: return null;
  // case FieldType.ROLLUP: return null;
  // case FieldType.SINGLE_COLLABORATOR: return null;
  case FieldType.SINGLE_LINE_TEXT: return <SingleLineText field={field} validationConfig={validationConfig} />;
  case FieldType.SINGLE_SELECT: return <Select field={field} validationConfig={validationConfig} />;
  case FieldType.URL: return <Url field={field} validationConfig={validationConfig} />;
  default: return null
  }
};

export default FieldControl;
