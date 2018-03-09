import { h } from 'preact';
import './photo-capture.css';

import { Button } from '../button';

export const PhotoCapture = () => {
  return (
    <div className="sp-photo-capture">
      <Button text="" className="sp-take-photo" onClick={() => {}} />
    </div>
  );
}

