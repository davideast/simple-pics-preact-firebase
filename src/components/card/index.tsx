import { h } from 'preact';
import './card.css';

import { FieldValue } from '@firebase/firestore-types';

import { Button } from '../button';
import { Avatar } from '../avatar';
import { User } from '../interfaces';

export interface FeedItem {
  user: User;
  caption: string;
  imgURL: string;
  bucketLocation: string;
  timestamp: FieldValue;
}

export const Card = ({ item }: { item: FeedItem }) => {
  return (
    <div class="sp-card">
      <div class="sp-card-topbar">
        <div class="sp-card-author">
          <Avatar user={item.user} />
          <div class="sp-card-user">{item.user.displayName}</div>
        </div>
        <div class="sp-card-topbar-actions">
          <Button className="sp-btn-hollow" text="Follow" onClick={() => {}} />
        </div>
      </div>
      <div class="sp-card-content">
        <img src={item.imgURL} alt={item.caption} />
      </div>
      <div class="sp-card-caption">
        <p>
          {item.caption}
        </p>
      </div>
    </div>
  );
}
