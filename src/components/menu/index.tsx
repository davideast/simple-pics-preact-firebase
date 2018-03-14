import { h, ComponentProps } from 'preact';

import './menu.css';

export interface MenuProps {
  children?: JSX.Element[];
  className: string;
}

export const Menu = ({ children, className }: MenuProps) => {
  const lis = children.map(c => <li>{c}</li>);
  const menuClassName = `sp-menu ${className || ''}`;
  return (
    <ul className={menuClassName}>
      {lis}
    </ul>
  );
}
