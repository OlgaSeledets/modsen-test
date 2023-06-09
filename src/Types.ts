export type Volume = {
  kind?: 'books#volume',
  id?: string,
  etag?: string,
  selfLink?: string,
  volumeInfo?: VolumeInfo,
  userInfo?: UserInfo,
  saleInfo?: SaleInfo,
  accessInfo?: AccessInfo,
  searchInfo?: SearchInfo,
}

export type VolumeInfo = {
  title?: string,
  subtitle?: string,
  authors?: Array<string>,
  publisher?: string,
  publishedDate?: string,
  description?: string,
  industryIdentifiers?: Array<IndustryIdentifier>,
  pageCount?: number,
  dimensions?: Dimensions,
  printType?: string,
  mainCategory?: string,
  categories?: Array<string>,
  averageRating?: number,
  ratingsCount?: number,
  contentVersion?: string,
  imageLinks?: ImageLinks,
  language?: string,
  previewLink?: string,
  infoLink?: string,
  canonicalVolumeLink?: string,
}

export type IndustryIdentifier = {
  type?: string,
  identifier?: string,
}

export type Dimensions = {
  height?: string,
  width?: string,
  thickness?: string,
}

export type ImageLinks = {
  smallThumbnail?: string,
  thumbnail?: string,
  small?: string,
  medium?: string,
  large?: string,
  extraLarge?: string,
}

export type UserInfo = {
  review?: unknown,
  readingPosition?: unknown,
  isPurchased?: boolean,
  isPreordered?: boolean,
  updated?: string,
}

export type SaleInfo = {
  country?: string,
  saleability?: string,
  onSaleDate?: string,
  isEbook?: boolean,
  listPrice?: ListPrice,
  retailPrice?: RetailPrice,
  buyLink?: string,
}

export type ListPrice = {
  amount?: number,
  currencyCode?: string,
}

export type RetailPrice = {
  amount?: number,
  currencyCode?: string,
}

export type AccessInfo = {
  country?: string,
  viewability?: string,
  embeddable?: boolean,
  publicDomain?: boolean,
  textToSpeechPermission?: string,
  epub?: Epub,
  pdf?: Pdf,
  webReaderLink?: string,
  accessViewStatus?: string,
  downloadAccess?: DownloadAccess,
}

export type Epub = {
  isAvailable?: boolean,
  downloadLink?: string,
  acsTokenLink?: string,
}

export type Pdf = {
  isAvailable?: boolean,
  downloadLink?: string,
  acsTokenLink?: string,
}

export type DownloadAccess = {
  kind?: 'books#downloadAccessRestriction',
  volumeId?: string,
  restricted?: boolean,
  deviceAllowed?: boolean,
  justAcquired?: boolean,
  maxDownloadDevices?: number,
  downloadsAcquired?: number,
  nonce?: string,
  source?: string,
  reasonCode?: string,
  message?: string,
  signature?: string,
}

export type SearchInfo = {
  textSnippet?: string,
}
