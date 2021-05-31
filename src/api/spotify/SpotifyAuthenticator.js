import { generateCodeVerifier, getChallengeFromVerifier } from '@/api/pkceFunctions';

export class SpotifyAuthenticator {
  constructor() {
    this.codeVerifier = undefined;
    this.codeChallenge = undefined;
  }

  getCodeVerifier() {
    if (this.codeVerifier === undefined) {
      this.codeVerifier = generateCodeVerifier();
    }
    return this.codeVerifier;
  }

  async getCodeChallenge(verifier) {
    if (this.codeChallenge === undefined) {
      this.codeChallenge = await getChallengeFromVerifier(verifier);
    }
    return this.codeChallenge;
  }

  getAuthURI(codeChallenge) {
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SPOTIFY_REDIRECT_URI}&scope=user-follow-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  }

  async openSpotifyAuthorization() {
    const codeVerifier = this.getCodeVerifier();
    const codeChallenge = await this.getCodeChallenge(codeVerifier);
    const url = this.getAuthURI(codeChallenge);
    const authWindow = window.open(url);
  }

  async requestSpotifyToken(code) {
    const body = new URLSearchParams();
    body.append('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
    body.append('code_verifier', this.getCodeVerifier());
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    };

    const response = await fetch('https://accounts.spotify.com/api/token', options);
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    
    return data;
  }
}