import { h, Component } from 'preact';
import { route } from 'preact-router';
import { firebase } from '@firebase/app';
import { firestore } from './firebase-init';

import { Button } from '../components/button';
import { Header } from '../components/header';
import { FeedItem } from '../components/card';

import { ViewName, User } from '../components/interfaces';
import { FirebaseStorage, UploadTaskSnapshot } from '@firebase/storage-types';
import { CollectionReference } from '@firebase/firestore-types';

export interface AddFeedItem {
  id: string; 
  user: User; 
  snap: UploadTaskSnapshot; 
  caption: string;
}

export class CaptionView extends Component<any, any> {
  feedCol: CollectionReference;
  caption: HTMLInputElement;
  storage: FirebaseStorage;

  gotoView(view) {

  }

  async uploadPhoto(id, dataURL: string) {
    if(this.storage === null) {
      await import('@firebase/storage');
      this.storage = firebase.storage();
    }
    const ref = this.storage.ref(`feed/${id}`);
    return ref.putString(dataURL, 'data_url', { contentType: 'image/png' });
  }

  addFeedItem({ id, user, snap, caption}: AddFeedItem) {
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
    this.feedCol.doc(id).set(feedItem);
  }  

  render() {
    const { capturedPhotoDataURL, user } = this.state;
    return (
      <div className="sp-caption">
        <div className="sp-photo-frame">
          <img src={capturedPhotoDataURL} />
        </div>
        <div className="sp-camera-bar">
          <input
            ref={(caption: HTMLInputElement) => { this.caption = caption; }}
            placeholder="Caption"
            class="sp-caption-text"
            type="text" />

          <Button className="sp-btn-hollow" text="Cancel" onClick={() => {
            this.gotoView('camera');
          }} />

          <Button text="Save" onClick={async () => {
            // get a generated id from firestore
            const id = firestore.collection('_').doc().id
            const snap = await this.uploadPhoto(id, capturedPhotoDataURL);
            const caption = this.caption.value;
            this.addFeedItem({ id, user, snap, caption });
            this.gotoView('feed');
          }} />

        </div>
      </div>
    );
  }

}