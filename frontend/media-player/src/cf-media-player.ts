import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

type Subtitle = {
  language: string;
  url: string;
};

@customElement("cf-media-player")
class MediaPlayer extends LitElement {
  @property() src: string = "";
  @property({ type: Array }) subs: Subtitle[] = [];

  @state() private _duration = 100;
  @state() private _currentTime = 0;
  @state() private _formattedTime = "";
  @state() private _paused = false;
  @state() private _showControls = false;
  @state() private _timer: any | null = null;
  @state() private _volume: number = 1;
  @state() private _selectedSubtitle: Subtitle = { language: "", url: "" };

  @query("#video")
  video!: HTMLVideoElement;

  @query("#range")
  seekSlider!: HTMLInputElement;

  @query("#volume")
  volumeSlider!: HTMLInputElement;

  firstUpdated(): void {
    this.video.addEventListener("loadedmetadata", this.handleLoadedMetadata);
    this.video.addEventListener("timeupdate", this.handleTimeUpdate);
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    this.video.play();
  }

  disconnectedCallback(): void {
    this.video.removeEventListener("loadedmetadata", this.handleLoadedMetadata);
    this.video.removeEventListener("timeupdate", this.handleTimeUpdate);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case " ":
        event.preventDefault();
        this.toggle();
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.video.currentTime = this.video.currentTime - 5;
        break;
      case "ArrowRight":
        event.preventDefault();
        this.video.currentTime = this.video.currentTime + 5;
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.video.volume >= 1) this.video.volume = 1;
        this.video.volume += 0.05;
        this._volume += 0.05;
        break;
      case "ArrowDown":
        event.preventDefault();
        if (this.video.volume <= 0) this.video.volume = 0;
        this.video.volume -= 0.05;
        this._volume -= 0.05;
        break;
    }
  };

  handleLoadedMetadata = () => {
    this._duration = this.video.duration;
  };

  handleTimeUpdate = () => {
    this._currentTime = this.video.currentTime;
  };

  onTimeUpdate() {
    if (!this.video) return;
    this._currentTime = this.video.currentTime;
    this._formattedTime = this.formatTime(this.video.currentTime);
  }

  onLoadedMetadata() {
    if (!this.video) return;
    this._duration = this.video.duration;
    this.video.play();
  }

  toggle() {
    if (this.video) {
      if (this.video.paused) {
        this.video.play();
        this._paused = false;
      } else {
        this.video.pause();
        this._paused = true;
      }
    }
  }

  formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const padded = (n: number) => String(n).padStart(2, "0");

    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
  }

  seek(event: Event) {
    event.preventDefault();
    if (this.video) {
      const time = (event.target as HTMLInputElement).valueAsNumber;
      this.video.currentTime = time;
      this._currentTime = time;
    }
  }

  handleVolumeChange(event: Event) {
    event.preventDefault();
    if (!this.video) return;
    this.video.volume = parseFloat(this.volumeSlider.value);
    this._volume = parseFloat(this.volumeSlider.value);
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._showControls = false;
    }, 3000);
    this._showControls = true;
  }

  switchSubtitle(index: number) {
    if (index === 1000000000000) {
      this._selectedSubtitle = { language: "", url: "" };
      return;
    }
    const selected = this.subs[index];
    this._selectedSubtitle = selected;
  }

  jump(start: boolean) {
    console.log("heyy, ", this.video);
    if (!this.video) return;
    if (start) {
      this.video.currentTime = 1;
    } else {
      this.video.currentTime = this._duration - 1;
    }
  }

  toggleAudio() {
    if (this._volume === 0) {
      this.video.volume = 1;
      this._volume = 1;
    } else {
      this.video.volume = 0;
      this._volume = 0;
    }
  }

  render() {
    const volume = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-volume-up-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"
        />
        <path
          d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"
        />
        <path
          d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"
        />
      </svg>
    `;

    const skipBkw = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-skip-start-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0z"
        />
      </svg>
    `;

    const skipFwd = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-skip-end-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0z"
        />
      </svg>
    `;

    const pause = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        class="bi bi-pause"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"
          stroke="white"
          stroke-width="1.25"
        />
      </svg>
    `;

    const play = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        class="bi bi-play-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
        />
      </svg>
    `;

    const controls = html`
      <div class="controls">
        <div id="left-controls" class="lower-control-left">
          <button
            id="jump-start"
            class="play-pause"
            @click=${() => this.jump(true)}
          >
            ${skipBkw}
          </button>
          <button class="play-pause" @click=${this.toggle}>
            ${!this._paused ? pause : play}
          </button>
          <button
            id="jump-end"
            class="play-pause"
            @click=${() => this.jump(false)}
          >
            ${skipFwd}
          </button>
          <p
            style="margin: 0; padding: 0; padding-right: 8px; color: white; font-size: 0.75rem; display: flex;"
          >
            ${this._formattedTime}/${this.formatTime(this._duration)}
          </p>
        </div>
        <div id="center-control" class="upper-control">
          <input
            class="media-slider"
            id="range"
            type="range"
            step="0.1"
            min="0"
            .value=${String(this._currentTime)}
            max="${this._duration}"
            @input=${this.seek}
            style="width: 100%;"
          />
        </div>
        <div id="right-controls" class="lower-control-left">
          <select id="subs">
            <option @click=${() => this.switchSubtitle(1000000000000)}>
              None
            </option>
            ${this.subs.map(
              (subtitle, index) =>
                html`<option @click=${() => this.switchSubtitle(index)}>
                  ${subtitle.language}
                </option>`
            )}
          </select>
          <button class="play-pause" @click=${this.toggleAudio}>
            ${volume}
          </button>
          <input
            style="height: 8px; width: 100px; margin-right: 4px;"
            class="media-slider"
            id="volume"
            min="0"
            max="1"
            step="0.01"
            type="range"
            @input=${this.handleVolumeChange}
            .value=${String(this._volume)}
          />
        </div>
      </div>
    `;

    return html`
      <div class="movie">
        <video
          id="video"
          class="video"
          @timeupdate=${this.onTimeUpdate}
          @loadedmetadata=${this.onLoadedMetadata}
          @click=${this.toggle}
          @mousemove=${this.onMouseMove}
        >
          <source src=${this.src} type="video/mp4" />
          <track
            label=${this._selectedSubtitle.language}
            kind="subtitles"
            srclang=${this._selectedSubtitle.language}
            src=${this._selectedSubtitle.url}
          />
        </video>
      </div>
      ${this._showControls ? controls : null}
    `;
  }

  static styles = css`
    .media-slider {
      height: 12px;
      appearance: none;
      background-color: rgba(48, 48, 48, 0.25);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      overflow: hidden;
    }

    .media-slider::-moz-range-thumb {
      appearance: none;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: -1207px 0 0 1200px white;
    }

    .media-slider::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: -1207px 0 0 1200px white;
    }

    .movie {
      z-index: 10;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      background-color: black;
    }
    .video {
      margin: 0;
      width: 100%;
      height: 100%;
    }

    .controls {
      margin-inline: 8px;
      padding: 4px;
      padding-right: 10px;
      z-index: 20;
      bottom: 2rem;
      gap: 8px;
      display: flex;
      flex-direction: row;
      position: fixed;
      width: calc(100% - 16px);
      animation: controls-fly 0.2s ease-in-out;
      box-sizing: border-box;
    }

    .upper-control {
      display: flex;
      align-items: center;
      padding: 8px;
      padding-inline: 10px;
      width: calc(100% - 8px);
      border-radius: 20px;
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    .lower-control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      border-radius: 20px;
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    .lower-control-left {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 4px;
      padding-inline: 8px;
      border-radius: 20px;
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    select {
      color: white;
      padding: 5px;
      border: none;
      border-radius: 999px;
      background-color: transparent;
    }

    select:hover {
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    .play-pause {
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
      border-radius: 999px;
    }
    .play-pause:hover {
      background-color: rgba(48, 48, 48, 0.25);
      backdrop-filter: blur(10px);
    }

    @keyframes controls-fly {
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
      0% {
        transform: translateY(50px);
        opacity: 0;
      }
    }
  `;
}

export default MediaPlayer;
