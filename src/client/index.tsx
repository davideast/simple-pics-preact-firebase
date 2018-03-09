import { h, render } from 'preact';
import './style.css';

import { Header } from '../components/header';
import { Card } from '../components/card';
import { PhotoCapture } from '../components/photo-capture';

const user = null;

const Home = () => (
  <div class="root">
    <Header user={user} />
    <div className="sp-container">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    <PhotoCapture />
  </div>
);

render(<Home />, document.body);
