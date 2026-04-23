export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  cover: string;
}

export const SONGS: Song[] = [
  {
    id: "1",
    title: "Neon Horizon",
    artist: "SynthWave AI",
    duration: 185,
    cover: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Cyber City Nights",
    artist: "Digital Dreamer",
    duration: 210,
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Binary Pulse",
    artist: "Retro Hacker",
    duration: 145,
    cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=300&h=300&auto=format&fit=crop",
  },
];
