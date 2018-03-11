import { h, Component } from 'preact';

import { CollectionReference } from '@firebase/firestore-types';
import { User } from '@firebase/auth-types';

import { firestore } from './firebase-init';

import { firebase } from '@firebase/app';

import { FeedItem, Card } from '../components/card';
import { Header } from '../components/header';
import { PhotoCapture } from '../components/photo-capture';
import { Camera } from '../components/camera';
import { Button } from '../components/button';

type ViewName = 'feed' | 'camera' | 'caption';

export interface HomeFeedState {
  user?: User;
  feedItems: FeedItem[];
  menuVisible: boolean;
  view: ViewName;
  isCameraOpen: boolean;
  capturedPhotoDataURL?: string;
}

export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: any;
  capturedImage: HTMLElement;

  constructor() {
    super();
    this.state = {
      user: null,
      feedItems: [],
      menuVisible: false,
      view: 'feed',
      isCameraOpen: false,
      capturedPhotoDataURL: null,
    };
  }

  async componentWillMount() {
    this.feedCol = firestore.collection('feed');
    this.feedCol
      .orderBy('timestamp')
      .onSnapshot(snap => {
        const feedItems = snap.docs.map(d => d.data() as FeedItem);
        this.setState({ ...this.state, feedItems })
      });

    await import('@firebase/auth');
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ ...this.state, user });
    });
  }

  onCameraOpen() {
    this.setState({ ...this.state, isCameraOpen: true });
  }

  onCameraClose() {
    this.setState({ ...this.state, isCameraOpen: false, view: 'feed' });
  }

  onCameraPhoto(capturedPhotoDataURL: string) {
    this.setState({ 
      ...this.state, 
      isCameraOpen: true, 
      view: 'caption', 
      capturedPhotoDataURL,  
    });
  }

  gotoView(view: ViewName, state = this.state) {
    this.setState({ ...state, view });
  }

  render() {
    const { user, feedItems, menuVisible, view, isCameraOpen, capturedPhotoDataURL } = this.state;
    const { history } = this.props;
    const viewClass = `view-holder show-${view}-view`;
    const isAuthed = !!user;
    const cards = feedItems.map(item => <Card follow={isAuthed} item={item} />);
    
    const captureComp = isAuthed ? 
      <PhotoCapture onClick={() => {
        this.gotoView('camera');
      }} /> : '';

    const cameraComp = view === 'camera' ?
      <Camera 
        isCameraOpen={isCameraOpen} 
        onCameraOpen={this.onCameraOpen.bind(this)} 
        onCameraClose={this.onCameraClose.bind(this)}
        onCameraPhoto={this.onCameraPhoto.bind(this)}/> : '';

    const captionComp =
      <div className="sp-caption">
        <div className="sp-photo-frame">
          <img src={capturedPhotoDataURL} />
        </div> 
        <div className="sp-camera-bar">
          <input placeholder="Caption" class="sp-caption-text" type="text" />
          <Button className="sp-btn-hollow" text="Cancel" onClick={() => {
            this.gotoView('camera');
          }} />

          <Button text="Save" onClick={() => {
            // Cloud Storage for Firebase
          }} />
        </div>
      </div>;

    return (
      <div className="root">

        <Header
          user={user}
          menuVisible={menuVisible}
          profileClick={() => {
            this.setState({
              ...this.state,
              menuVisible: !this.state.menuVisible
            });
          }} />

        <div className={viewClass}>
        
          <div className="sub-view feed-view">

            <div className="sp-container">
              {cards}
            </div>
            {captureComp}
          </div>

          <div class="sub-view camera-view">
          <Camera 
            isCameraOpen={isCameraOpen} 
            onCameraOpen={this.onCameraOpen.bind(this)} 
            onCameraClose={this.onCameraClose.bind(this)}
            onCameraPhoto={this.onCameraPhoto.bind(this)}/>
          </div>

          <div class="sub-view caption-view">
            {captionComp}
          </div>

        </div>
      </div>
    );
  }

}
