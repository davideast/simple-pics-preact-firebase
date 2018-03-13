import { h, Component } from 'preact';
import { route } from 'preact-router';
import { FirebaseAuth } from '@firebase/auth-types';
import { firebaseApp } from './firebase-init';

import { AppUser } from '../components/interfaces';

import { Camera, CameraProps, CapturedPhoto } from '../components/camera';
import { CaptionView } from './caption-view';

export type ViewName = 'camera' | 'caption';

export interface MediaViewState {
  view: ViewName;
  isCameraOpen: boolean;
  imageDataURL?: string;
  imageHeight?: any;
  imageWidth?: any;
}

const CameraView = (props: CameraProps) => (
  <div className="sp-sub-view sp-camera-view">
    <Camera
      isCameraOpen={props.isCameraOpen}
      onCameraOpen={props.onCameraOpen}
      onCameraClose={props.onCameraClose}
      onCameraPhoto={props.onCameraPhoto} />
  </div>
);

export class MediaView extends Component<{ user: AppUser }, MediaViewState> {
  auth?: FirebaseAuth;

  constructor() {
    super();
    this.state = {
      isCameraOpen: false,
      view: 'camera' 
    };
  }

  gotoView(view: ViewName) {
    this.setState({ ...this.state, view });
  }

  onCameraOpen() {
    this.setState({ ...this.state, isCameraOpen: true });
  }

  onCameraClose() {
    route('/', true);
  }

  onCameraPhoto({ imageDataURL, imageHeight, imageWidth }: CapturedPhoto) {
    this.setState({
      ...this.state,
      isCameraOpen: true,
      view: 'caption',
      imageDataURL,
      imageHeight,
      imageWidth
    });
  }

  render() {
    const { isCameraOpen, imageDataURL, view, 
      imageHeight, imageWidth } = this.state;
    const { user } = this.props;
    const viewClass = `sp-view-holder show-${view}-view`;
    return (
      <div className="sp-root sp-full-view">
        <div className={viewClass}>

          <CameraView
            isCameraOpen={isCameraOpen}
            onCameraOpen={this.onCameraOpen.bind(this)}
            onCameraClose={this.onCameraClose.bind(this)}
            onCameraPhoto={this.onCameraPhoto.bind(this)}
          />

          <CaptionView
            user={user}
            imageDataURL={imageDataURL}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            onSend={() => { 
              // set state to turn off MediaStream for camera and afterwards
              // route back home
              this.setState({ ...this.state, isCameraOpen: false }, () => {
                route('/', true);
              });
            }}
            onCancel={() => {
              this.gotoView('camera');
            }} />

        </div>

      </div>
    );
  }

}
