type ENV_VAR = | 'dev' | 'prod';
let envVar: ENV_VAR = process.env["DEVELOP_ENV"] === 'prod' ? 'prod' : 'dev';
interface SubModel {
  products: string;
  brands: string;
  categories: string;
  kinds: string;
  conditions: string;
  imageLibrary: string;
}

let subModel: SubModel;

if (envVar === 'dev') {
  subModel = {
    products: 'products_test',
    brands: 'brands_test',
    categories: 'categories_test',
    kinds: "kinds_test",
    conditions: "conditions_test",
    imageLibrary: "image_library_test"
  }
}

if (envVar === 'prod') {
  subModel = {
    products: 'products',
    brands: 'brands',
    categories: 'categories',
    kinds: "kinds",
    conditions: "conditions",
    imageLibrary: "image_library"
  }
}

export default subModel;