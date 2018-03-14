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
}

class App extends Component<any, AppState> {

  state = { 
    user: null,
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
    onCameraOpen() {
      this.setState({ ...this.state, isCameraOpen: true });
    },
    onCameraClose() {
      route('/', true);
    },
    onSendPhoto(item: AddFeedItem) {
      debugger;
      const feedItems = [...this.state.feedItems, item];
      this.setState({ ...this.state, feedItems });
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
