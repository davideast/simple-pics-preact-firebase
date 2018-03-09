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
  feedItems: FeedItem[]
}

export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: any;

  constructor() {
    super();
    this.state = {
      user: null,
      feedItems: []
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
    const { user, feedItems } = this.state;
    const cards = feedItems.map(item => <Card item={item} />);
    return (
      <div class="root">
      <Header user={user} />
      <div className="sp-container">
        {cards}
      </div>
      <PhotoCapture />
    </div>
    )
  }

}
