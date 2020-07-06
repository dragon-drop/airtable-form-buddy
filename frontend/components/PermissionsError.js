import {
  colors,
  Icon,
} from '@airtable/blocks/ui';
import React from 'react';
import ColouredBox from './ColouredBox';

const PermissionsError = ({ message }) => {
  return (
    <div className="wrapper">
      <ColouredBox colour={colors.RED_LIGHT_2} padding={3}>
        <div className="message">
          <Icon name="warning" size={16} />
          <div>{message}</div>
        </div>
      </ColouredBox>
    </div>
  );
};

export default PermissionsError;
