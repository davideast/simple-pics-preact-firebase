import { h } from 'preact';
import './photo-capture.css';

import { Button } from '../button';

export const PhotoCapture = ({ onClick }) => {
  return (
    <div className="sp-photo-capture">
      <Button text="" className="sp-take-photo" onClick={onClick} />
    </div>
  );
}

