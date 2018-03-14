import { h, Component } from 'preact';
import { route } from 'preact-router';

import { CollectionReference } from '@firebase/firestore-types';
import { PathProp, AppUser } from '../../components/interfaces';

import { FeedItem, Card } from '../../components/card';
import { Header } from '../../components/header';
import { PhotoCapture } from '../../components/photo-capture';

export interface HomeViewProps {
  user?: AppUser;
  feedItems?: FeedItem[];
  menuVisible?: boolean;
  onToggleUserMenu: (menuVisible: boolean) => void;
}

const CaptureButton = ({ isAuth }) => isAuth ?
  <PhotoCapture onClick={() => route('/camera', true)} /> :
  <span></span>;

export class HomeView extends Component<HomeViewProps, never> {

  toggleUserMenu() {
    this.props.onToggleUserMenu(!this.props.menuVisible);
  }
  
  render() {
    const { user, feedItems, menuVisible } = this.props;
    const isAuth = !!user;
    const cards = feedItems.map(item => <Card item={item} />);

    return (
      <div className="sp-root">

        <Header
          user={user}
          menuVisible={menuVisible}
          profileClick={this.toggleUserMenu.bind(this)}
          onSignIn={() => { }}
          onSignOut={() => { }} />

        <div className="sp-sub-view sp-feed-view">

          <div className="sp-container">
            {cards}
          </div>

          <CaptureButton isAuth={true} />

        </div>

      </div>
    );
  }
}
