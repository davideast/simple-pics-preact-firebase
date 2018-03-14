import { h } from 'preact';
import './card.css';

import { Button } from '../button';
import { Avatar } from '../avatar';
import { AppUser } from '../interfaces';

export interface FeedItem {
  user: AppUser;
  imgURL?: string;
  timestamp: string;
  lowRes?: string;
}

export interface CardProps { 
  item: FeedItem; 
}

export function Card(props: CardProps) {
  const { item } = props;
  const src = !item.imgURL ? item.lowRes : item.imgURL;
  return (
    <div className="sp-card">
      
      <div className="sp-card-topbar">
        <div className="sp-card-author">
          <Avatar user={item.user} />
          <div className="sp-card-user">{item.user.displayName}</div>
        </div>
      </div>

      <div className="sp-card-content">
        <img src={src} alt="Photo" />
      </div>
      
    </div>
  );
}
