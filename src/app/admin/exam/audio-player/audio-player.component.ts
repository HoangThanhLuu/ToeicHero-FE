import {Component, Input, OnInit} from '@angular/core';
import {AdminLibBaseCss3, AdminStyle2} from "../../admin.style";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss',
    ...AdminLibBaseCss3,
    ...AdminStyle2,
  ]
})
export class AudioPlayerComponent implements OnInit {
  @Input() audioSource: string = '';
  @Input() partName: string = '';
  audio: HTMLAudioElement;
  isPlaying: boolean = false;
  currentTime: string = '0:00';
  duration: string = '0:00';
  volume: number = 0.75;

  constructor(private toastr: ToastrService) {
    this.audio = new Audio();
  }

  ngOnInit(): void {
    if(!this.audioSource) {
      return;
    }

    this.audio.src = this.audioSource;
    this.audio.addEventListener('loadeddata', () => {
      this.duration = this.getTimeCodeFromNum(this.audio.duration);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.getTimeCodeFromNum(this.audio.currentTime);
    });

    this.audio.volume = this.volume;
  }

  playPause() {
    if(!this.audioSource) {
      this.toastr.error('File audio đang bị lỗi!');
      return;
    }
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.isPlaying = !this.isPlaying;
  }

  setVolume(newVolume: number) {
    this.audio.volume = newVolume;
    this.volume = newVolume;
  }

  getTimeCodeFromNum(num: number): string {
    let seconds = Math.floor(num);
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    const hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);

    if (hours === 0) {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    } else {
      return `${String(hours).padStart(2, '0')}:${minutes}:${String(seconds).padStart(2, '0')}`;
    }
  }
}
