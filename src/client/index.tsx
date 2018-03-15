import { h, render, Component } from 'preact';
import Router, { route } from 'preact-router';
import './style.css';

import { HomeView, HomeViewProps } from '../views/home';
import { MediaView, ViewName } from '../views/media';

import { AppUser } from '../components/interfaces';
import { CapturedPhoto } from '../components/camera';
import { FeedItem } from '../components/card';
import { AddFeedItem } from '../views/capture';

export interface AppState {
  user?: AppUser;
  feedItems: FeedItem[];
  view?: ViewName;
  stream?: MediaStream;
}

class App extends Component<any, AppState> {

  state = { 
    user: null,
    view: 'feed' as ViewName,
    feedItems: [{
      user: {
        displayName: 'David East',
        photoURL: 'https://lh5.googleusercontent.com/-4aPtsf44t70/AAAAAAAAAAI/AAAAAAAAAFU/g4bLHgPKesg/photo.jpg'
      },
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/simple-pics.appspot.com/o/feed%2FcEgimB3blRupmYdTNdzT?alt=media&token=3cf0dec2-84c6-4bac-ae13-6a473c12ccda',
      timestamp: ''
    }, {
      user: {
        displayName: 'David East',
        photoURL: 'https://lh5.googleusercontent.com/-4aPtsf44t70/AAAAAAAAAAI/AAAAAAAAAFU/g4bLHgPKesg/photo.jpg'
      },
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/simple-pics.appspot.com/o/feed%2FmFnDMnRM0Mzc7Hu6jFLn?alt=media&token=eaae5e55-671a-44d6-beeb-bc90d03d1850',
      bucketLocation: '',
      timestamp: ''
    }, {
      user: {
        displayName: 'David East',
        photoURL: 'https://lh5.googleusercontent.com/-4aPtsf44t70/AAAAAAAAAAI/AAAAAAAAAFU/g4bLHgPKesg/photo.jpg'
      },
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/simple-pics.appspot.com/o/feed%2FZig2WcCSdKxsOrTki1Hz?alt=media&token=4a2ee30a-8ce3-4782-8c7b-55d8aa804bb1',
      timestamp: ''
    }, {
      user: {
        displayName: 'David East',
        photoURL: 'https://lh5.googleusercontent.com/-4aPtsf44t70/AAAAAAAAAAI/AAAAAAAAAFU/g4bLHgPKesg/photo.jpg'
      },
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/simple-pics.appspot.com/o/feed%2FcEgimB3blRupmYdTNdzT?alt=media&token=3cf0dec2-84c6-4bac-ae13-6a473c12ccda',
      timestamp: ''
    }],
  };

  actions = {
    onToggleMenu(menuVisible: boolean) {
      this.setState({ ...this.state, menuVisible });
    },
    gotoView(view: ViewName) {
      this.setState({ ...this.state, view });
    },
    async onStreamOpen() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      this.setState({ ...this.state, stream });
      route('/camera', true)
    },
    onCameraOpen() {
      this.setState({ ...this.state, isCameraOpen: true });
    },
    onCameraClose() {
      this.state.stream.getTracks()[0].stop();
      this.setState({ ...this.state, isCameraOpen: false, stream: null, view: 'camera' });
      route('/', true);
    },
    onSendPhoto(item: AddFeedItem) {
      this.state.stream.getTracks()[0].stop();
      const feedItems = [item, ...this.state.feedItems];
      this.setState({ ...this.state, feedItems, stream: null, view: 'camera', isCameraOpen: false });
      route('/', true);
    },
    onCameraPhoto({ lowRes, imageHeight, imageWidth }: CapturedPhoto) {
      this.setState({
        ...this.state,
        isCameraOpen: true,
        view: 'capture',
        lowRes,
        imageHeight,
        imageWidth
      });
    }
  };

  render() {
    return (
      <Router>
        <HomeView 
          path="/" 
          {...this.state} 
          onToggleUserMenu={this.actions.onToggleMenu.bind(this)} 
          onStreamOpen={this.actions.onStreamOpen.bind(this)}
        />
        <MediaView 
          path="/camera" 
          { ...this.state } 
          gotoView={this.actions.gotoView.bind(this)}
          onCameraOpen={this.actions.onCameraOpen.bind(this)}
          onCameraClose={this.actions.onCameraClose.bind(this)}
          onCameraPhoto={this.actions.onCameraPhoto.bind(this)}
          onSendPhoto={this.actions.onSendPhoto.bind(this)}
        />
      </Router>
    );
  }

}

render(<App />, document.body);

function showRefreshUI(registration: ServiceWorkerRegistration) {
  const button = document.createElement('button');
  button.style.position = 'sticky';
  button.style.bottom = '24px';
  button.style.left = '24px';
  button.textContent = 'NEW VERSION! REFRESH TO UPDATE';
  button.classList.add('sp-btn', 'sp-btn-full');

  button.addEventListener('click', e => {
    // tell the SW to skipWaiting
    // first check if waiting exists
    if(!registration.waiting) {
      return;
    }

    // sends a message to the service worker
    registration.waiting.postMessage('skipWaiting');
  });

  document.body.appendChild(button);
}

function onNewServiceWorker(registration: ServiceWorkerRegistration, callback) {
  // is there a SW waiting?
  if(registration.waiting) {
    return callback();
  }

  // listen for the installed state change
  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', (e: any) => {
      if(e.target.state === 'installed') {
        callback();
      }
    });
  }

  if(registration.installing) {
    listenInstalledStateChange();
  }
  
  // Add a listener for a new SW
  registration.addEventListener('updatefound', listenInstalledStateChange);
}

window.addEventListener('load', () => {

  if('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/sw.js').then(registration => {
      
      if(!navigator.serviceWorker.controller) {
        // new service worker that will active immediately
        return;
      }

      var preventDevToolsLoop;
      navigator.serviceWorker.addEventListener('controllerchange', e => {
        if (preventDevToolsLoop) return;
        preventDevToolsLoop = true;
        window.location.reload();
      });

      onNewServiceWorker(registration, () => {
        // show a refresh page button
        showRefreshUI(registration);
      });
      
    });

  }

});