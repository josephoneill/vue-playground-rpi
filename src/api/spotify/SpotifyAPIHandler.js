const basePlayerUrl = "https://api.spotify.com/v1/me/player/";
export class SpotifyAPIHandler {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  getAPIOptions(methodType, contentType = 'application/json') {
    const options = {
      method: methodType,
      headers: { 
        'Accept': contentType,
        'Content-Type': contentType,
        'Authorization': `Bearer ${this.accessToken}`
      },
    };

    return options;
  }

  async getCurrentPlaybackInfo() {
    const options = this.getAPIOptions('GET');

    const response = await fetch(basePlayerUrl, options);
    let data;
    if (response.status === 200) {
      data = await response.json();
    }
    return data;
  }

  async playPauseSpotify(pause = true) {
    const options = this.getAPIOptions('PUT');

    const response = await fetch(`${basePlayerUrl}${pause ? 'pause' : 'play'}`, options);
    return response;
  }

  async playNext() {
    const options = this.getAPIOptions('POST');

    const response = await fetch(`${basePlayerUrl}next`, options);
    return response
  }

  async playPrevious() {
    const options = this.getAPIOptions('POST');

    const response = await fetch(`${basePlayerUrl}previous`, options);
    return response
  }
}