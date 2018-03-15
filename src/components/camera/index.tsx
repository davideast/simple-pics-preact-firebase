import { h, Component } from 'preact';
import './camera.css';

import { Button } from '../button';

export interface CapturedPhoto {
  lowRes?: string; 
  imageHeight?: number;
  imageWidth?: number
}

export interface CameraProps {
  onCameraOpen: () => void;
  onCameraClose: () => void;
  onCameraPhoto: (photo: CapturedPhoto) => void;
  isCameraOpen: boolean;
  stream: MediaStream;
}

const CameraButtons = (props: CameraProps) =>
  props.isCameraOpen ? 
  <div className="sp-action-bar sp-action-bar-row">
    <Button
      text="Close Camera"
      className="sp-btn-hollow"
      onClick={props.onCameraClose} />
    <Button
      text="Take Photo"
      onClick={props.onCameraPhoto} />
  </div>
    :
  <div className="sp-action-bar">
    <Button
      text="Open Camera"
      onClick={props.onCameraOpen} />
  </div>;

export class Camera extends Component<CameraProps, any> {

  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  src: string;

  openCamera() {
    // A user interaction ("click") must trigger video.play()
    // or it will fail on android chrome
    this.src = URL.createObjectURL(this.props.stream);
    this.video.src = this.src;
    this.video.play();
    this.props.onCameraOpen();
  }

  closeTrack() {
    if (typeof this.props.stream !== 'undefined') {
      const track = this.props.stream.getTracks()[0];
      track.stop();
      this.video.pause();
    }
  }

  closeCamera() {
    this.closeTrack();
    this.props.onCameraClose();
  }

  takePhoto() {
    const imageWidth = this.video.videoWidth;
    const imageHeight = this.video.videoHeight;

    const context = this.canvas.getContext('2d');
    this.canvas.width = imageWidth;
    this.canvas.height = imageHeight;

    context.drawImage(this.video, 0, 0, imageWidth, imageHeight);

    const lowRes = this.canvas.toDataURL('image/jpeg', 0.2);
    
    this.props.onCameraPhoto({ lowRes, imageHeight, imageWidth });
  }

  render() {
    const { isCameraOpen, stream } = this.props;

    return (
      <div>
        <canvas
          class="sp-camera-canvas"
          ref={(canvas: HTMLCanvasElement) => { this.canvas = canvas; }}>
        </canvas>

        <div class="sp-camera">
          <video ref={(video: HTMLVideoElement) => { this.video = video; }} />
        </div>

        <CameraButtons 
          isCameraOpen={isCameraOpen}
          stream={stream}
          onCameraClose={this.closeCamera.bind(this)}
          onCameraPhoto={this.takePhoto.bind(this)}
          onCameraOpen={this.openCamera.bind(this)} />

      </div>
    );
  }
}
