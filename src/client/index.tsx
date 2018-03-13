import { h, render, Component } from 'preact';
import Router, { route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Provider from 'preact-context-provider';
import './style.css';
import { getAuthenticatedUser, asyncAuthListener } from '../pages/firebase-init';

import { User } from '@firebase/auth-types';

import { HomeFeed } from '../pages/home-feed';

export interface AppState {
  user?: User;
}

class App extends Component<any, any> {

  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount() {
    asyncAuthListener(this);
  }

  handleRoute(e) {
    if (e.url === '/camera' && this.state.user === null) {
      route('/', true);
    }
  }

  render() {
    const { user } = this.state
    return (
      <Router onChange={this.handleRoute.bind(this)}>
        <HomeFeed path="/" />
        <AsyncRoute
          path="/camera" {...this.state}
          getComponent={async () => {
            const { MediaView } = await import('../pages/media-view');
            return props => <MediaView {...props} user={this.state.user} />;
          }} />
      </Router>
    );
  }
}


/*
const App = () => {
  return (
    <Router>
      <HomeFeed path="/" />
      <AsyncRoute
        path="/camera"
        getComponent={ async () => {
          const { MediaView } = await import('../pages/media-view');
          return MediaView;
        }}
      />
    </Router>
  );
};
*/

render(<App />, document.body);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW is registered 🔥');
  });
}
