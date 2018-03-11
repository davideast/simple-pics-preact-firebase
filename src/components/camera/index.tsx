import { h, Component } from 'preact';
import './camera.css';

import { Button } from '../button';

export interface CameraProps {
  onCameraOpen: () => void;
  onCameraClose: () => void; 
  onCameraPhoto: (imageDataURL: string) => void;
  isCameraOpen: boolean;
}

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
    if(typeof this.stream !== 'undefined') {
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
    const width = this.video.videoWidth;
    const height = this.video.videoHeight;

    const context = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;

    context.drawImage(this.video, 0, 0, width, height);

    const imageDataURL = this.canvas.toDataURL('image/png');
    
    this.props.onCameraPhoto(imageDataURL);
  }

  render() {
    const { isCameraOpen } = this.props;
    const cameraButtons = isCameraOpen
      ? <div className="sp-camera-bar">
          <Button
            text="Close Camera" 
            className="sp-btn-hollow"
            onClick={this.closeCamera.bind(this)} />
          <Button 
            text="Take Photo" 
            onClick={this.takePhoto.bind(this)} />
        </div>
      : <div className="sp-camera-bar">
          <Button
            text="Open Camera"
            onClick={this.openCamera.bind(this)} />
        </div>;

    if(!isCameraOpen) {
      this.closeTrack();
    }

    return (
      <div>
        <canvas 
          class="sp-camera-canvas"
          ref={(canvas: HTMLCanvasElement) => { this.canvas = canvas; } }>
        </canvas>
        
        <div class="sp-camera">
          <video ref={(video: HTMLVideoElement) => { this.video = video; }} />
        </div>

        {cameraButtons}
      </div>
    );
  }
}
