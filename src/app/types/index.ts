export interface AppUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: true;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IImageFormatDetails {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

interface IImageData {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: IImageFormatDetails;
    large: IImageFormatDetails;
    medium: IImageFormatDetails;
    small: IImageFormatDetails;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface IChow {
  id: number;
  Description: string;
  Image: { data: IImageData[] };
  Title: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}
