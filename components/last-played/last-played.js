customElements.define("last-played", class LastPlayed extends HTMLElement {
  constructor() {
    super();
    
    appendStyle(
      this.tagName,
      html`
        <style>
          last-played {
            display: block;
          }

          .last-played-content {
            text-align: center;
            padding: 0.5rem;
          }

          .music-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            display: block;
            animation: bounce 2s infinite;
          }

          .track-info {
            font-size: 0.8rem;
            color: var(--text-3);
            margin: 0;
            line-height: 1.4;
          }

          .track-title {
            color: var(--text-2);
            font-weight: bold;
            margin-bottom: 0.25rem;
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        </style>`
    );
  }

  connectedCallback() {
    // Mock last played track data
    const lastTrack = {
      title: "Synthwave Dreams",
      artist: "Neon Nights",
      playedAt: "2 hours ago"
    };

    this.innerHTML = html`
      <div class="last-played-content">
        <span class="music-icon">🎵</span>
        <div class="track-info">
          <div class="track-title">${lastTrack.title}</div>
          <div>by ${lastTrack.artist}</div>
          <div>${lastTrack.playedAt}</div>
        </div>
      </div>
    `;
  }
});