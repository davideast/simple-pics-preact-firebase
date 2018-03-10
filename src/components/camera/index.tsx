import { h, Component } from 'preact';
import './camera.css';

import { Button } from '../button';

export interface ButtonProps { 
  onClick: Function; 
}

export interface CameraProps {
  onCameraOpen: Function;
  onCameraClose: Function; 
  isCameraOpen: boolean;
}

const OpenCameraButton = ({ onClick }: ButtonProps) => 
  <Button text="Open Camera" onClick={onClick} />

const CloseCameraButton = ({ onClick }: ButtonProps) => 
  <Button text="Close Camera" onClick={onClick} />

const TakePhotoButton = () => 
  <Button text="Take Photo" onClick={() => {}} />;

export class Camera extends Component<CameraProps, any> {
  video: HTMLVideoElement;
  stream: MediaStream;
  src: string;

  async componentDidMount() {
    this.stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: "user" } 
    });
    this.src = URL.createObjectURL(this.stream);
  }

  openCamera() {
    // A user interaction ("click") must trigger video.play()
    // or it will fail on android chrome
    this.video.src = this.src;
    this.video.play();
    this.props.onCameraOpen();
  }

  closeCamera() {
    const track = this.stream.getTracks()[0];
    track.stop();
    this.video.pause();
    this.props.onCameraClose();
  }

  render() {
    const { onCameraOpen, isCameraOpen } = this.props;
    const cameraButtons = isCameraOpen
      ? <div>
          <TakePhotoButton />
          <CloseCameraButton onClick={this.closeCamera.bind(this)} />
        </div>
      : <div>
          <OpenCameraButton onClick={this.openCamera.bind(this)} />
        </div>;

    return (
      <div>
        <div class="sp-camera">
          <video ref={(video: HTMLVideoElement) => { this.video = video; }} />
        </div>
        <div class="sp-camera-bar">
          {cameraButtons}
        </div>
      </div>
    );
  }
}
