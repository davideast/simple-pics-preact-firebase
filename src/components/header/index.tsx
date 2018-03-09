import { h } from 'preact';
import './header.css';

import { Button } from '../button';
import { Avatar } from '../avatar';

export const Header = ({ user }) => {
  
  return (
    <header class="sp-header">
      <div class="sp-header-logo">Simple pics</div>
      <UserButton user={user} />
    </header>
  );
}

export const UserButton = ({ user }) => {
  return user !== null ?
    <Avatar /> :
    <Button text="Login" onClick={() => { }} />;
};

