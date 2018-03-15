import { h, Component } from 'preact';
import { route } from 'preact-router';
import './media.css';

import { AppUser, UserProp, PathProp } from '../../components/interfaces';

import { Camera, CameraProps, CapturedPhoto } from '../../components/camera';
import { CaptureView } from '../capture';

export type ViewName = 'camera' | 'capture' | 'feed';

export interface MediaViewProps extends UserProp, PathProp, CapturedPhoto { 
  gotoView: (view: ViewName) => void;
  onCameraOpen: () => void;
  onCameraClose: () => void;
  onCameraPhoto: (photo: CapturedPhoto) => void;
  onSendPhoto: (photo: CapturedPhoto) => void;
  view?: ViewName;
  isCameraOpen?: boolean;
  stream?: MediaStream;
}

const CameraView = (props: CameraProps) => (
  <div className="sp-sub-view sp-camera-view">
    <Camera
      stream={props.stream}
      isCameraOpen={props.isCameraOpen}
      onCameraOpen={props.onCameraOpen}
      onCameraClose={props.onCameraClose}
      onCameraPhoto={props.onCameraPhoto} />
  </div>
);

export class MediaView extends Component<MediaViewProps, never> {
  
  render() {
    const { isCameraOpen, lowRes, view, 
      imageHeight, imageWidth, user, stream } = this.props;
    const viewClass = `sp-view-holder show-${view}-view`;
    return (
      <div className="sp-root sp-full-view">
        <div className={viewClass}>

          <CameraView
            stream={stream}
            isCameraOpen={isCameraOpen}
            onCameraOpen={this.props.onCameraOpen.bind(this)}
            onCameraClose={this.props.onCameraClose.bind(this)}
            onCameraPhoto={this.props.onCameraPhoto.bind(this)}
          />

          <CaptureView
            user={user}
            lowRes={lowRes}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            onSendPhoto={this.props.onSendPhoto}
            onCancelPhoto={() => this.props.gotoView('camera') } />

        </div>

      </div>
    );
  }
}
