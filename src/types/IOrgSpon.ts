export interface IOrgSpon {
  id: number;
  name: string;
  image: string;
  link: string;
  token: string;
}
export interface IOrgSpons {
  count: number;
  rows: IOrgSpon[];
  token: string;
}
