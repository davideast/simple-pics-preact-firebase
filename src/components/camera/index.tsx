import { h, Component } from 'preact';
import './camera.css';

export class Camera extends Component<any, any> {
  video: HTMLVideoElement;
  stream: MediaStream;

  async componentDidMount() {
    const getMediaSteam = new Promise<MediaStream>((resolve, reject) => {
      navigator.getUserMedia({ video: true }, resolve, reject);
    });
    this.stream = await getMediaSteam;
    this.video.src = URL.createObjectURL(this.stream);
    this.video.play();
  }

  render() {
    return (
      <div class="sp-camera">
        <video ref={(video: HTMLVideoElement) => { this.video = video; }} />
      </div>
    );
  }
}