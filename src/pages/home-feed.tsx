import { h, Component } from 'preact';

import { CollectionReference } from '@firebase/firestore-types';
import { User } from '@firebase/auth-types';

import { firestore } from './firebase-init';

import { firebase } from '@firebase/app';

import { FeedItem, Card } from '../components/card';
import { Header } from '../components/header';
import { PhotoCapture } from '../components/photo-capture';

export interface HomeFeedState {
  user?: User;
  feedItems: FeedItem[];
  menuVisible: boolean;
}

export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: any;

  constructor() {
    super();
    this.state = {
      user: null,
      feedItems: [],
      menuVisible: false,
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
    const { user, feedItems, menuVisible } = this.state;
    const follow = !!user;
    const cards = feedItems.map(item => <Card follow={follow} item={item} />);
    const captureComp = follow ? <PhotoCapture /> : '';
    return (
      <div class="root">

        <Header 
          user={user} 
          menuVisible={menuVisible}
          profileClick={() => {
            this.setState({ 
              ...this.state, 
              menuVisible: !this.state.menuVisible 
            });
          }} />

        <div className="sp-container">
          {cards}
        </div>
        {captureComp}
      </div>
    );
  }

}
