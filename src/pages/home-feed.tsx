import { h, Component } from 'preact';
import { route } from 'preact-router';

import { CollectionReference } from '@firebase/firestore-types';
import { User } from '@firebase/auth-types';

import { firebase } from '@firebase/app';
import { firestore } from './firebase-init';

import { FeedItem, Card } from '../components/card';
import { Header } from '../components/header';
import { PhotoCapture } from '../components/photo-capture';

export interface HomeFeedState {
  user?: User;
  feedItems: FeedItem[];
  menuVisible: boolean;
}

export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: CollectionReference;

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
      }, console.error);

    await import('@firebase/auth');
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ ...this.state, user });
    });
  }

  toggleUserMenu() {
    this.setState({
      ...this.state,
      menuVisible: !this.state.menuVisible
    });
  }

  render() {
    const { user, feedItems, menuVisible } = this.state;
    const { history } = this.props;
    const isAuth = !!user;
    const cards = feedItems.map(item => <Card follow={isAuth} item={item} />);

    const captureComp = isAuth ?
      <PhotoCapture onClick={() => route('/camera', true)} /> : '';

    return (
      <div className="sp-root">

        <Header
          user={user}
          menuVisible={menuVisible}
          profileClick={() => this.toggleUserMenu.bind(this)} />

        <div className="sp-sub-view sp-feed-view">

          <div className="sp-container">
            {cards}
          </div>

          {captureComp}
        </div>
      </div>
    );
  }
}

/*
    match /feed/{itemId} {
    	allow create: if request.auth.uid != null;
      allow update, delete: if request.auth.uid == resource.data.user.uid; 
    }

*/