import { h } from 'preact';
import './header.css';

import { firebase } from '@firebase/app';
import { AppUser } from '../interfaces';

import { Button } from '../button';
import { Avatar, AvatarProps } from '../avatar';
import { Menu } from '../menu';

export interface UserButtonProps extends AvatarProps {
  menuVisible: boolean;
  profileClick: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export interface HeaderProps extends UserButtonProps { }

export const Header = (props: HeaderProps) => {
  const { user, menuVisible, profileClick, onSignIn, onSignOut } = props;
  return (
    <header class="sp-header">
      <div class="sp-header-logo">Simple pics</div>
      <UserButton 
        user={user} 
        menuVisible={menuVisible} 
        profileClick={profileClick}
        onSignIn={onSignIn}
        onSignOut={onSignOut} />
    </header>
  );
}

export const UserButton = (props: UserButtonProps) => {
  const { user, menuVisible, profileClick, onSignIn, onSignOut } = props;
  const menuVisibleClass = menuVisible ? 'full-opacity' : 'no-opacity';
  const UserMenu = ({ user }: { user?: AppUser }) => (
    <div class="sp-user-menu">
      <Avatar user={user} profileClick={profileClick} />
      <Menu className={menuVisibleClass}>
        <button onClick={onSignOut}>
          Sign Out
        </button>
      </Menu>
    </div>
  );

  return user !== null ?
    <UserMenu user={user} /> :
    <Button text="Login" onClick={onSignIn} />;
};
