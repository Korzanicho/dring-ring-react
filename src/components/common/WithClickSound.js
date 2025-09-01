import React from 'react';
import { playSound, Sounds } from '../../utils/soundUtils';

/**
 * Higher-Order Component that adds click sound to any clickable element
 * @param {React.Component} WrappedComponent - The component to enhance with click sound
 * @param {string} soundType - Type of sound to play (default: BUTTON_CLICK)
 */
const withClickSound = (WrappedComponent, soundType = Sounds.BUTTON_CLICK) => {
  const WithClickSound = (props) => {
    const handleClick = (e) => {
      if (props.onClick) {
        props.onClick(e);
      }
      
      if (!e.defaultPrevented) {
        playSound(soundType);
      }
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };

  // Set display name for better debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithClickSound.displayName = `WithClickSound(${displayName})`;

  return WithClickSound;
};

export default withClickSound;
