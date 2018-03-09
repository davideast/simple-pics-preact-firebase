import { h } from 'preact';
import './button.css';

export const Button = ({ text, onClick, className = "sp-btn-full" }) => 
  <button 
    className={`sp-btn ${className}`} 
    onClick={onClick}>
    {text}
  </button>
