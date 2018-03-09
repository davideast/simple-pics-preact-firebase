import { h } from 'preact';
import './header.css';

import { User } from '@firebase/auth-types';

import { Button } from '../button';
import { Avatar } from '../avatar';

export const Header = ({ user }: { user?: User }) => {
  
  return (
    <header class="sp-header">
      <div class="sp-header-logo">Simple pics</div>
      <UserButton user={user} />
    </header>
  );
}

export const UserButton = ({ user }: { user?: User }) => {
  return user !== null ?
    <Avatar /> :
    <Button text="Login" onClick={() => { }} />;
};

