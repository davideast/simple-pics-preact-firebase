import { h, Component } from 'preact';
import { route } from 'preact-router';
import { firebase } from '@firebase/app';
import { firestore, asyncFirebaseApp } from './firebase-init';

import { Button } from '../components/button';
import { Header } from '../components/header';
import { FeedItem } from '../components/card';

import { AppUser } from '../components/interfaces';
import { FirebaseStorage, UploadTaskSnapshot } from '@firebase/storage-types';
import { CollectionReference } from '@firebase/firestore-types';

export interface AddFeedItem {
  id: string;
  user: AppUser;
  snap: UploadTaskSnapshot;
  caption: string;
}

export interface CaptionViewProps {
  imageDataURL: string;
  imageHeight: any;
  imageWidth: any;
  user: AppUser;
  onCancel: () => void;
  onSend: () => void;
}

export class CaptionView extends Component<CaptionViewProps, any> {
  caption: HTMLTextAreaElement;
  frame: HTMLDivElement;

  async uploadPhoto(id, dataURL: string) {
    const storage = await asyncFirebaseApp.storage();
    const ref = storage.ref(`feed/${id}`);
    return ref.putString(dataURL, 'data_url', { contentType: 'image/png' });
  }

  async addFeedItem({ id, user, snap, caption }: AddFeedItem) {
    const feedCol = firestore.collection('feed');
    const feedItem: FeedItem = {
      caption,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      },
      bucketLocation: snap.ref.toString(),
      imgURL: snap.downloadURL,
    };
    feedCol.doc(id).set(feedItem);
  }

  calcImageRatio({ imageHeight, imageWidth }) {
    if(typeof this.frame === 'undefined') {
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
    const { imageDataURL, imageHeight, imageWidth, user } = this.props;
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
            src={imageDataURL} />
        </div>

        <div className="sp-action-bar">
          <textarea
            ref={(caption: HTMLTextAreaElement) => { this.caption = caption; }}
            class="sp-caption-text">
          </textarea>

          <div class="sp-action-bar sp-action-bar-row">

            <Button className="sp-btn-hollow" text="Cancel" onClick={() => {
              this.props.onCancel();
            }} />

            <Button text="Save" onClick={async () => {
              // get a generated id from firestore
              const id = firestore.collection('_').doc().id
              const snap = await this.uploadPhoto(id, imageDataURL);
              const caption = this.caption.value;
              this.addFeedItem({ id, user, snap, caption });
              this.props.onSend();
            }} />

          </div>
        </div>
      </div>
    );
  }

}