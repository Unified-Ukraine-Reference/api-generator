export interface GithubDataClientOptions {
  token?: string;
  owner?: string;
  repo?: string;
  tag?: string;
}

export interface GithubAsset {
  id: number;
  name: string;
}
