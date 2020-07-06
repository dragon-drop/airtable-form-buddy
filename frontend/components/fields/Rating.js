import React, { useState } from "react";
import PubSub from 'pubsub-js';
import { Icon, FormField, colorUtils } from "@airtable/blocks/ui";
import getFieldLabel from '../../helpers/getFieldLabel';

const Rating = ({ field, validationConfig }) => {
  const options = [];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  PubSub.subscribe('resetForm', () => {
    setSelectedIndex(null);
    setHoveredIndex(null);
  });

  // unselected, unhovered, grey all
  // hovered, grey after this one
  // selected, grey after this one

  for (let i = 1; i <= field.options.max; i++) {
    const isHighlighted = hoveredIndex && hoveredIndex >= i || selectedIndex && selectedIndex >= i;

    options.push(
      <React.Fragment key={i}>
        <label
          htmlFor={`${field.name}-${i}`}
          className={isHighlighted? 'rating__option--selected' : 'rating__option'}
          onMouseOver={() => setHoveredIndex(i)}
          onMouseOut={() => setHoveredIndex(null)}
        >
          <Icon name={field.options.icon} fillColor={colorUtils.getHexForColor(field.options.color)} />
        </label>
        <input
          type="radio"
          name={field.name}
          value={i}
          id={`${field.name}-${i}`}
          className="visuallyhidden"
          onChange={() => setSelectedIndex(i)}
        />
      </React.Fragment>
    );
  }
  
  return (
    <FormField label={getFieldLabel(field, validationConfig)} className="rating">
      <div className="rating__options">
        {options}
      </div>
    </FormField>
  );
};

export default Rating;
