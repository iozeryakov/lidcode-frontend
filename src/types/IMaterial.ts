export interface IMaterial {
  id: number;
  name: string;
  link: string;
  token: string;
}
export interface IMaterials {
  count: number;
  rows: IMaterial[];
  token: string;
}
