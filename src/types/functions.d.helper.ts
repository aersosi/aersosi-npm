// export type PageConfig = { name: string; content: string } | null;
// export interface ICVStyles {
//   maxCvWidth: number;
// }

export interface IPageConfig {
  name: string;
  content: string;
}

export type TPageConfig = IPageConfig | null;

export interface ICVStyles {
  maxCvWidth: number;
}
