export interface ITrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  artwork?: string;
  last?: boolean;
}
