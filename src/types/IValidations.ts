export interface IValidations {
  minLength: number | boolean;
  maxLength: number | boolean;
  isEmpty: boolean;
  email?: boolean;
  link?: boolean;
  phoneNumbers?: boolean;
}
