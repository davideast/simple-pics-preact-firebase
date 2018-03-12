import { h, render, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import './style.css';

import { HomeFeed } from '../pages/home-feed';

const App = () => {
  return (
    <Router>
      <HomeFeed path="/" />
      <AsyncRoute
        path="/camera"
        getComponent={ async () => {
          const { CameraView } = await import('../pages/camera-view');
          return CameraView;
        }}
      />
    </Router>
  );
};


render(<App />, document.body);

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW is registered 🔥');
  });
}
