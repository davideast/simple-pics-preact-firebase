import { h, Component } from 'preact';

import { CollectionReference } from '@firebase/firestore-types';
import { User } from '@firebase/auth-types';

import { firestore } from './firebase-init';

import { FeedItem, Card } from '../components/card';
import { Header } from '../components/header';
import { PhotoCapture } from '../components/photo-capture';

export interface HomeFeedState {
  user?: User;
  feedItems: FeedItem[]
}

export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: CollectionReference;

  constructor() {
    super();
    this.state = {
      user: null,
      feedItems: []
    };
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
