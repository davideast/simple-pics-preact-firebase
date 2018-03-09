import { h } from 'preact';
import './avatar.css';

import { User } from '@firebase/auth-types';

export const Avatar = ({ user }: { user?: User }) =>
  user === null || typeof user === 'undefined' ?
    <div class="sp-avatar"></div> :
    <img class="sp-avatar" src={user.photoURL} />;
