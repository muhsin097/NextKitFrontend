// types.ts

export interface TransferRumor {
  id: string;
  playerName: string;
  currentClub: string;
  targetClub: string;
  position: string;
  value: string;
  probability: number;
  timeAgo: string;
  status: "hot" | "warm" | "cold";
  playerImage?: string;
  currentClubLogo?: string;
  targetClubLogo?: string;
}

