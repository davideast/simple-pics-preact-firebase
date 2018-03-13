import { h, Component } from 'preact';
import { route } from 'preact-router';

import { CollectionReference } from '@firebase/firestore-types';
import { UserProp, AppUser } from '../components/interfaces';

import { firebase } from '@firebase/app';
import { firestore, asyncAuthListener } from './firebase-init';

import { FeedItem, Card } from '../components/card';
import { Header } from '../components/header';
import { PhotoCapture } from '../components/photo-capture';

export interface HomeFeedState {
  user?: AppUser;
  feedItems: FeedItem[];
  menuVisible: boolean;
}

const CardList = ({ cards }) => (
  <div className="sp-container">
    {cards}
  </div>
);

const CaptureButton = ({ isAuth }) => isAuth ?
  <PhotoCapture onClick={() => route('/camera', true)} /> :
  <span></span>;


export class HomeFeed extends Component<any, HomeFeedState> {
  feedCol: CollectionReference;
  authUnlisten: () => void;

  constructor() {
    super();
    this.state = {
      feedItems: [],
      menuVisible: false,
    };
  }

  async componentWillMount() {
    this.feedCol = firestore.collection('feed');
    this.feedCol
      .orderBy('timestamp', 'desc')
      .onSnapshot(snap => {
        const feedItems = snap.docs.map(d => d.data() as FeedItem);
        this.setState({ ...this.state, feedItems })
      }, console.error);

      this.authUnlisten = await asyncAuthListener(this);
    
  }

  toggleUserMenu() {
    this.setState({
      ...this.state,
      menuVisible: !this.state.menuVisible
    });
  }

  render() {
    const { user, feedItems, menuVisible } = this.state;
    const isAuth = !!user;
    const cards = feedItems.map(item => <Card follow={isAuth} item={item} />);

    return (
      <div className="sp-root">

        <Header
          user={user}
          menuVisible={menuVisible}
          profileClick={this.toggleUserMenu.bind(this)} />

        <div className="sp-sub-view sp-feed-view">

          <CardList cards={cards} />

          <CaptureButton isAuth={isAuth} />

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