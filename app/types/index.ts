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
  slug:string;
  trending:boolean;
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
  articles: Article[];
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

export interface PlayerResponse {
  data: PlayerRes[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface PlayerRes {
  id: number;
  attributes: {
    name: string;
    documentId: string;
    details: string;
    country: string;
    dob: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar: Avatar;
    articles: Article[];
    club?: Club;
  };
}

export interface Avatar {
  id: number;
  name: string;
  url: string;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

export interface ImageFormat {
  ext: string;
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
}

 
export interface ArticleContentChild {
  text: string;
  type: string;
}

export interface ArticleContent {
  type: string;
  children: ArticleContentChild[];
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publishedTime: string;
  link: string;
  content: ArticleContent[];
}
