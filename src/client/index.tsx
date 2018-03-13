import { h, render, Component } from 'preact';
import Router, { route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import './style.css';
import { asyncAuthListener } from '../pages/firebase-init';

import { HomeFeed } from '../pages/home-feed';
import { AppUser } from '../components/interfaces';

export interface AppState {
  user?: AppUser;
}

class App extends Component<any, AppState> {

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

render(<App />, document.body);

function createRefreshButton(registration: ServiceWorkerRegistration) {
  const button = document.createElement('button');
  button.style.position = 'sticky';
  button.style.bottom = '24px';
  button.style.left = '24px';
  button.textContent = 'NEW VERSION! REFRESH TO UPDATE';
  button.classList.add('sp-btn', 'sp-btn-full');
  button.addEventListener('click', function() {
    if (!registration.waiting) {
      // Just to ensure registration.waiting is available before
      // calling postMessage()
      return;
    }
    button.disabled = true;
    registration.waiting.postMessage('skipWaiting');
  });
  return button;
}

function showRefreshUI(registration) {
  // TODO: Display a toast or refresh UI.

  // This demo creates and injects a button.

  var button = createRefreshButton(registration);

  button.addEventListener('click', function() {
    if (!registration.waiting) {
      // Just to ensure registration.waiting is available before
      // calling postMessage()
      return;
    }

    button.disabled = true;

    registration.waiting.postMessage('skipWaiting');
  });

  document.body.appendChild(button);
};

function onNewServiceWorker(registration, callback) {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback();
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', function(event) {
      if (event.target.state === 'installed') {
        // A new service worker is available, inform the user
        callback();
      }
    });
  };

  if (registration.installing) {
    return listenInstalledStateChange();
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
}

window.addEventListener('load', function() {
  navigator.serviceWorker.register('/sw.js')
  .then(function (registration) {
      // Track updates to the Service Worker.
    if (!navigator.serviceWorker.controller) {
      // The window client isn't currently controlled so it's a new service
      // worker that will activate immediately
      return;
    }

    // When the user asks to refresh the UI, we'll need to reload the window
    var preventDevToolsReloadLoop;
    navigator.serviceWorker.addEventListener('controllerchange', function(event) {
      // Ensure refresh is only called once.
      // This works around a bug in "force update on reload".
      if (preventDevToolsReloadLoop) return;
      preventDevToolsReloadLoop = true;
      console.log('Controller loaded');
      window.location.reload();
    });

    onNewServiceWorker(registration, function() {
      showRefreshUI(registration);
    });
  });
});
