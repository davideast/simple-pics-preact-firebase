import { h, Component } from 'preact';
import { route } from 'preact-router';

import { ViewName } from '../components/interfaces';

import { Camera } from '../components/camera';
import { CaptionView } from './caption-view';

export interface CameraViewState {
  view: ViewName;
  isCameraOpen: boolean;
  capturedPhotoDataURL: string;
}

export class CameraView extends Component<any, CameraViewState> {

  onCameraOpen() {
    this.setState({ ...this.state, isCameraOpen: true });
  }

  onCameraClose() {
    route('/', true);
  }

  onCameraPhoto(capturedPhotoDataURL: string) {
    this.setState({
      ...this.state,
      isCameraOpen: true,
      view: 'caption',
      capturedPhotoDataURL,
    });
  }

  render() {
    const { isCameraOpen } = this.state;
    return (
      <div class="sp-root sp-full-view">
        <div class="sp-view-holder">

          <div class="sp-sub-view sp-camera">
            <Camera
              isCameraOpen={isCameraOpen}
              onCameraOpen={this.onCameraOpen.bind(this)}
              onCameraClose={this.onCameraClose.bind(this)}
              onCameraPhoto={this.onCameraPhoto.bind(this)} />
          </div>

          <div class="sp-sub-view">
            <CaptionView />
          </div>

        </div>

      </div>
    );
  }

}
