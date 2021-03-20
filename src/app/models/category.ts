export class Category{
  categoryName: string;
  categoryDescription: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
}

}