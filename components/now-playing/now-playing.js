customElements.define("now-playing", class NowPlaying extends HTMLElement {
  #isPlaying = false;
  #currentTrack = null;
  #progressInterval = null;
  #currentTime = 0;
  #duration = 180; // 3 minutes default

  constructor() {
    super();
    this.#loadMockData();
    
    appendStyle(
      this.tagName,
      html`
        <style>
          now-playing {
            display: block;
            background: var(--surface-2);
            border: 1px solid var(--overlay-2);
            border-radius: 0.75rem;
            padding: 0.75rem;
            font-family: 'Space Mono', monospace;
            position: relative;
            overflow: hidden;
            height: 100%;
            box-sizing: border-box;
          }

          .now-playing-header {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            margin-bottom: 0.75rem;
            font-size: 0.7rem;
            color: var(--text-3);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .now-playing-icon {
            width: 8px;
            height: 8px;
            background: var(--text-1);
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          .track-info {
            display: flex;
            gap: 0.75rem;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .album-art {
            width: 40px;
            height: 40px;
            border-radius: 0.4rem;
            background: linear-gradient(135deg, var(--text-1), var(--surface-3));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
          }

          .album-art.playing {
            animation: spin 20s linear infinite;
          }

          .album-art::before {
            content: "";
            position: absolute;
            inset: 25%;
            background: var(--surface-1);
            border-radius: 50%;
          }

          .track-details {
            flex: 1;
            min-width: 0;
          }

          .track-title {
            font-weight: bold;
            color: var(--text-2);
            font-size: 0.8rem;
            margin: 0 0 0.2rem 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .track-artist {
            color: var(--text-3);
            font-size: 0.7rem;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .track-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .play-button {
            width: 20px;
            height: 20px;
            border: none;
            background: var(--text-1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.6rem;
            flex-shrink: 0;
          }

          .play-button:hover {
            background: var(--text-2);
            transform: scale(1.1);
          }

          .progress-container {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.6rem;
            color: var(--text-3);
            min-width: 0;
          }

          .progress-bar {
            flex: 1;
            height: 3px;
            background: var(--overlay-1);
            border-radius: 1.5px;
            overflow: hidden;
            cursor: pointer;
            min-width: 40px;
          }

          .progress-fill {
            height: 100%;
            background: var(--text-1);
            border-radius: 1.5px;
            transition: width 0.1s ease;
            width: 0%;
          }

          .time-display {
            font-size: 0.6rem;
            color: var(--text-3);
            white-space: nowrap;
          }

          .sound-waves {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            display: flex;
            gap: 1px;
            opacity: 0.3;
          }

          .wave {
            width: 1.5px;
            height: 12px;
            background: var(--text-1);
            border-radius: 1px;
            animation: wave 1.5s ease-in-out infinite;
          }

          .wave:nth-child(2) { animation-delay: 0.1s; }
          .wave:nth-child(3) { animation-delay: 0.2s; }
          .wave:nth-child(4) { animation-delay: 0.3s; }

          .not-playing {
            text-align: center;
            color: var(--text-3);
            font-size: 0.7rem;
            padding: 1rem 0.5rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          }

          .not-playing-icon {
            font-size: 1.5rem;
            opacity: 0.5;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes wave {
            0%, 100% { transform: scaleY(0.5); }
            50% { transform: scaleY(1); }
          }
        </style>`
    );
  }

  connectedCallback() {
    this.render();
    this.#startProgressUpdate();
  }

  disconnectedCallback() {
    this.#stopProgressUpdate();
  }

  #loadMockData() {
    // Mock data - in a real app, this would come from Spotify API or similar
    const tracks = [
      {
        title: "Synthwave Dreams",
        artist: "Neon Nights",
        album: "Digital Horizon",
        duration: 195,
        emoji: "🌆"
      },
      {
        title: "Pixel Perfect",
        artist: "8-Bit Heroes",
        album: "Retro Gaming",
        duration: 168,
        emoji: "🎮"
      },
      {
        title: "Code & Coffee",
        artist: "Dev Beats",
        album: "Programming Playlist",
        duration: 203,
        emoji: "☕"
      },
      {
        title: "Midnight Coding",
        artist: "Terminal Sounds",
        album: "Late Night Sessions",
        duration: 187,
        emoji: "🌙"
      }
    ];

    // Randomly select a track and simulate playing state
    this.#currentTrack = tracks[Math.floor(Math.random() * tracks.length)];
    this.#duration = this.#currentTrack.duration;
    this.#currentTime = Math.floor(Math.random() * this.#duration * 0.7); // Random progress
    this.#isPlaying = Math.random() > 0.3; // 70% chance of playing
  }

  #formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  #togglePlay() {
    this.#isPlaying = !this.#isPlaying;
    this.render();
    
    if (this.#isPlaying) {
      this.#startProgressUpdate();
    } else {
      this.#stopProgressUpdate();
    }
  }

  #startProgressUpdate() {
    this.#stopProgressUpdate();
    if (this.#isPlaying) {
      this.#progressInterval = setInterval(() => {
        this.#currentTime++;
        if (this.#currentTime >= this.#duration) {
          this.#currentTime = 0;
          // In a real app, this would load the next track
        }
        this.#updateProgress();
      }, 1000);
    }
  }

  #stopProgressUpdate() {
    if (this.#progressInterval) {
      clearInterval(this.#progressInterval);
      this.#progressInterval = null;
    }
  }

  #updateProgress() {
    const progressFill = this.querySelector('.progress-fill');
    const currentTimeEl = this.querySelector('.current-time');
    
    if (progressFill && currentTimeEl) {
      const progress = (this.#currentTime / this.#duration) * 100;
      progressFill.style.width = `${progress}%`;
      currentTimeEl.textContent = this.#formatTime(this.#currentTime);
    }
  }

  #handleProgressClick(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progress = clickX / rect.width;
    this.#currentTime = Math.floor(progress * this.#duration);
    this.#updateProgress();
  }

  render() {
    if (!this.#currentTrack) {
      this.innerHTML = html`
        <div class="not-playing">
          <div class="not-playing-icon">🎵</div>
          <p>Nothing playing</p>
        </div>
      `;
      return;
    }

    const progress = (this.#currentTime / this.#duration) * 100;

    this.innerHTML = html`
      <div class="now-playing-header">
        <div class="now-playing-icon"></div>
        <span>${this.#isPlaying ? 'Now Playing' : 'Paused'}</span>
      </div>

      <div class="track-info">
        <div class="album-art ${this.#isPlaying ? 'playing' : ''}">
          ${this.#currentTrack.emoji}
        </div>
        <div class="track-details">
          <h4 class="track-title">${this.#currentTrack.title}</h4>
          <p class="track-artist">${this.#currentTrack.artist}</p>
        </div>
      </div>

      <div class="track-controls">
        <button class="play-button" onclick="this.closest('now-playing').togglePlay()">
          ${this.#isPlaying ? '⏸' : '▶'}
        </button>
        <div class="progress-container">
          <div class="progress-bar" onclick="this.closest('now-playing').handleProgressClick(event)">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="time-display">
          <span class="current-time">${this.#formatTime(this.#currentTime)}</span>
        </div>
      </div>

      ${this.#isPlaying ? html`
        <div class="sound-waves">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      ` : ''}
    `;

    // Re-attach event listeners after render
    setTimeout(() => {
      const playButton = this.querySelector('.play-button');
      const progressBar = this.querySelector('.progress-bar');
      
      if (playButton) {
        playButton.addEventListener('click', () => this.#togglePlay());
      }
      
      if (progressBar) {
        progressBar.addEventListener('click', (e) => this.#handleProgressClick(e));
      }
    }, 0);
  }

  // Public methods for external control
  togglePlay() {
    this.#togglePlay();
  }

  handleProgressClick(event) {
    this.#handleProgressClick(event);
  }
});