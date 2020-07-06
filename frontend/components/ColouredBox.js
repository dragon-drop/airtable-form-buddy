import {
  colorUtils,
  Box,
} from '@airtable/blocks/ui';
import React from 'react';

const ColouredBox = ({ colour, children, ...opts }) => {
  return (
    <Box backgroundColor={colour} style={{ color: colorUtils.shouldUseLightTextOnColor(colour) ? 'white' : 'inherit' }} {...opts}>
      {children}
    </Box>
  );
};

export default ColouredBox;
