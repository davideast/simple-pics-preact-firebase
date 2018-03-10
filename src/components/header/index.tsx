import { h } from 'preact';
import './header.css';

import { firebase } from '@firebase/app';
import { User } from '../interfaces';

import { Button } from '../button';
import { Avatar, AvatarProps } from '../avatar';
import { Menu } from '../menu';

export interface UserButtonProps extends AvatarProps {
  menuVisible: boolean;
}

export interface HeaderProps extends UserButtonProps { }

export const Header = ({ user, menuVisible, profileClick }: HeaderProps) => {
  return (
    <header class="sp-header">
      <div class="sp-header-logo">Simple pics</div>
      <UserButton 
        user={user} 
        menuVisible={menuVisible} 
        profileClick={profileClick} />
    </header>
  );
}

export const UserButton = ({ user, menuVisible, profileClick }: UserButtonProps) => {
  const menuVisibleClass = menuVisible ? 'full-opacity' : 'no-opacity';
  const UserMenu = ({ user }: { user?: User }) => (
    <div class="sp-user-menu">
      <Avatar user={user} profileClick={profileClick} />
      <Menu className={menuVisibleClass}>
        <button onClick={async () => {
          await import('firebase/auth');
          firebase.auth().signOut();
        }}>
          Sign Out
        </button>
      </Menu>
    </div>
  );

  return user !== null ?
    <UserMenu user={user} /> :
    <Button text="Login" onClick={async () => {
      await import('@firebase/auth');
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }} />;
};
