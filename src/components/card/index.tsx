import { h } from 'preact';
import './card.css';

import { Button } from '../button';
import { Avatar } from '../avatar';

export const Card = ({ }) => {
  return (
    <div class="sp-card">
      <div class="sp-card-topbar">
        <div class="sp-card-author">
          <Avatar />
          <div class="sp-card-user">David East</div>
        </div>
        <div class="sp-card-topbar-actions">
          <Button className="sp-btn-hollow" text="Follow" onClick={() => {}} />
        </div>
      </div>
      <div class="sp-card-content">
        <img src="carbon.png" alt="Code is cool" />
      </div>
      <div class="sp-card-caption">
        <p>
          Observables and Custom Elements are really cool.
        </p>
      </div>
    </div>
  );
}
