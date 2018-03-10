import { h, render, Component } from 'preact';
import './style.css';

import { HomeFeed } from '../pages/home-feed';

render(<HomeFeed />, document.body);

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW is registered 🔥');
  });
}
