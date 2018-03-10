import { h } from 'preact';
import './header.css';

import { firebase } from '@firebase/app';

import { User } from '../interfaces';

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
    <Avatar user={user} /> :
    <Button text="Login" onClick={async () => {
      await import('@firebase/auth');
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }} />;
};
