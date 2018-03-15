import { h, Component } from 'preact';
import { route } from 'preact-router';
import { firebase } from '@firebase/app';

import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { FeedItem } from '../../components/card';

import { AppUser } from '../../components/interfaces';
import { FirebaseStorage, UploadTaskSnapshot } from '@firebase/storage-types';
import { CollectionReference } from '@firebase/firestore-types';

export interface AddFeedItem {
  id: string;
  user: AppUser;
  lowRes?: string;
  imgURL?: string;
}

export interface CaptureViewProps {
  lowRes?: string;
  imageHeight?: any;
  imageWidth?: any;
  user?: AppUser;
  onCancelPhoto: () => void;
  onSendPhoto: (item: AddFeedItem) => void;
}

export class CaptureView extends Component<CaptureViewProps, any> {
  frame: HTMLDivElement;

  calcImageRatio({ imageHeight, imageWidth }) {
    if (typeof this.frame === 'undefined') {
      return { ratioHeight: 0, ratioWidth: 0 };
    }
    const ratio = Math.min(
      this.frame.clientWidth / imageWidth,
      this.frame.clientHeight / imageHeight
    );
    const ratioHeight = imageHeight * ratio;
    const ratioWidth = imageWidth * ratio;
    return { ratioHeight, ratioWidth };
  }

  render() {
    const { lowRes, imageHeight, imageWidth, user } = this.props;
    const {
      ratioHeight, ratioWidth
    } = this.calcImageRatio({ imageHeight, imageWidth });

    return (
      <div className="sp-sub-view sp-caption-view">

        <div className="sp-camera-frame"
          ref={(frame: HTMLDivElement) => { this.frame = frame; }}>
          <img
            height={ratioHeight}
            width={ratioWidth}
            src={lowRes} />
        </div>

        <div className="sp-action-bar">
          <div class="sp-action-bar sp-action-bar-row">

            <Button 
              className="sp-btn-hollow" 
              text="Cancel" 
              onClick={this.props.onCancelPhoto} />

            <Button text="Save" onClick={() => {
              this.props.onSendPhoto({
                id: '',
                lowRes,
                user: { 
                  displayName: 'David East', 
                  photoURL: 'https://lh5.googleusercontent.com/-4aPtsf44t70/AAAAAAAAAAI/AAAAAAAAAFU/g4bLHgPKesg/photo.jpg'
                }
              });
            }} />

          </div>
        </div>
      </div>
    );
  }

}
