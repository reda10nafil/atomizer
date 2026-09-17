export interface Wallpaper {
  id: string;
  title: string;
  description?: string;
  url: string;
  downloadUrl: string;
  thumbnailUrl: string;
  previewUrl: string;
  originalUrl: string;
  width: number;
  height: number;
  resolution: string;
  aspectRatio: string;
  fileSize?: string;
  fileSizeBytes?: number;
  format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'mp4' | 'webm';
  isLive: boolean;
  fps?: number;
  duration?: number;
  source: string;
  sourceUrl: string;
  author?: string;
  authorUrl?: string;
  tags: string[];
  categories: string[];
  colors: string[];
  dominantColor?: string;
  views?: number;
  downloads?: number;
  likes?: number;
  rating?: number;
  uploadedAt?: string;
  scrapedAt: string;
  license?: string;
  licenseUrl?: string;
  isNSFW: boolean;
  isVerified: boolean;
}

export interface ScraperConfig {
  site: string;
  baseUrl: string;
  enabled: boolean;
  maxPages: number;
  maxResults: number;
  delay: number;
  timeout: number;
  proxy?: string;
  userAgent?: string;
  headers?: Record<string, string>;
  selectors: {
    grid: string;
    item: string;
    image: string;
    title: string;
    author?: string;
    views?: string;
    likes?: string;
    download?: string;
    tags?: string;
    resolution?: string;
  };
}

export interface ScrapingProgress {
  site: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  total: number;
  scraped: number;
  errors: number;
  startTime: string;
  endTime?: string;
  message?: string;
}

export interface SearchFilters {
  query?: string;
  sites?: string[];
  resolutions?: string[];
  aspectRatios?: string[];
  orientations?: ('landscape' | 'portrait' | 'square')[];
  colors?: string[];
  tags?: string[];
  categories?: string[];
  isLive?: boolean;
  isNSFW?: boolean;
  minViews?: number;
  minLikes?: number;
  minRating?: number;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'relevance' | 'views' | 'likes' | 'downloads' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
