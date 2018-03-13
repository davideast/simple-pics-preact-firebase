import { h, Component } from 'preact';
import './camera.css';

import { Button } from '../button';

export interface CapturedPhoto {
  imageDataURL: string; 
  imageHeight: number;
  imageWidth: number
}

export interface CameraProps {
  onCameraOpen: () => void;
  onCameraClose: () => void;
  onCameraPhoto: (photo: CapturedPhoto) => void;
  isCameraOpen: boolean;
}

const CameraButtons = (props: CameraProps) =>
  props.isCameraOpen ? 
  <div className="sp-action-bar">
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
  stream: MediaStream;
  src: string;

  async openCamera() {
    // A user interaction ("click") must trigger video.play()
    // or it will fail on android chrome
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    });
    this.src = URL.createObjectURL(this.stream);
    this.video.src = this.src;
    this.video.play();
    this.props.onCameraOpen();
  }

  closeTrack() {
    if (typeof this.stream !== 'undefined') {
      const track = this.stream.getTracks()[0];
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

    const imageDataURL = this.canvas.toDataURL('image/png');
    
    this.props.onCameraPhoto({ imageDataURL, imageHeight, imageWidth });
  }

  render() {
    const { isCameraOpen } = this.props;

    // Avoid streaming the media if the 
    // user asks to close the camera
    if (!isCameraOpen) {
      this.closeTrack();
    }

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
          onCameraClose={this.closeCamera.bind(this)}
          onCameraPhoto={this.takePhoto.bind(this)}
          onCameraOpen={this.openCamera.bind(this)} />

      </div>
    );
  }
}
