import { h, ComponentProps } from 'preact';
import './avatar.css';

import { AppUser } from '../interfaces';

export interface AvatarProps { 
  user?: AppUser;
  profileClick?: () => void;
};

export const Avatar = ({ user, profileClick }: AvatarProps) =>
  user === null || typeof user === 'undefined' ?
    <div className="sp-avatar"></div> :
    <img 
      className="sp-avatar sp-avatar-pointer" 
      src={user.photoURL} 
      onClick={profileClick} />;
