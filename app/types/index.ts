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

export interface TransferAPIResponse {
  data: Transfer[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type Transfer = {
  id: number;
  documentId: string;
  title: string;
  score: number;
  currentStatus: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  player: Player;
  fromClub: Club;
  toClub: Club;
  fee:number;
};

export type Player = {
  id: number;
  documentId: string;
  name: string;
  details: string;
  country: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar: Media;
  club?: Club;
};

export type Club = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Media = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: Format;
    small?: Format;
    medium?: Format;
    large?: Format;
  };
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Format = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};
