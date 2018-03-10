import { h, ComponentProps } from 'preact';
import './avatar.css';

import { User } from '../interfaces';

export interface AvatarProps { 
  user?: User;
  profileClick?: () => void;
};

export const Avatar = ({ user, profileClick }: AvatarProps) =>
  user === null || typeof user === 'undefined' ?
    <div className="sp-avatar"></div> :
    <img 
      className="sp-avatar sp-avatar-pointer" 
      src={user.photoURL} 
      onClick={profileClick} />;
