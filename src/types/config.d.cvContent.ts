export interface IContentItem {
  title?: string;
  subtitle?: string;
  emptyLine?: string;
  body1?: string;
  body2?: string;
  [key: string]: string | undefined;
}

export interface IConfigCvContent {
  [parent: string]: IContentItem[];
}
