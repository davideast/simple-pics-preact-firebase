import { h } from 'preact';
import './photo-capture.css';

import { Button } from '../button';

export const PhotoCapture = ({ onClick }) => {
  return (
    <div className="sp-photo-capture">
      <div className="sp-take-photo" onClick={onClick}>
        <img 
          src="/images/camera.png" 
          alt="Take Photo" />
      </div>
    </div>
  );
}

