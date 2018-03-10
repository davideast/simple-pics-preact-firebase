import { h, Component } from 'preact';

import { CollectionReference } from '@firebase/firestore-types';
import { User } from '@firebase/auth-types';

import { firestore } from './firebase-init';

import { firebase } from '@firebase/app';

import { FeedItem, Card } from '../components/card';
import { Header } from '../components/header';
import { PhotoCapture } from '../components/photo-capture';
import { Camera } from '../components/camera';

export interface HomeFeedState {
  user?: User;
  feedItems: FeedItem[];
  menuVisible: boolean;
  view: 'feed' | 'camera';
}
export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: any;

  constructor() {
    super();
    this.state = {
      user: null,
      feedItems: [],
      menuVisible: false,
      view: 'feed',
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

  render() {
    const { user, feedItems, menuVisible, view } = this.state;
    const { history } = this.props;
    const viewClass = `view-holder show-${view}-view`;
    const follow = !!user;
    const cards = feedItems.map(item => <Card follow={follow} item={item} />);
    const captureComp = follow ? 
      <PhotoCapture onClick={() => {
        this.setState({ ...this.state, view: 'camera' });
      }} /> : '';
    const cameraComp = view === 'camera' ?
      <Camera /> : '';
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
            {cameraComp}
          </div>
        </div>
      </div>
    );
  }

}
