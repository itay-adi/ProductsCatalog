export const consts = {
  descriptionMaxLength: 200,
  itemsPerPage: 4,
  minPrice: 0,
  nameMaxLength: 30,
}

export const dictionary = {
  add: "+ ADD",
  addNewProduct: "Add a New Product",
  apply: "APPLY",
  delete: "DELETE",
  description: "Description",
  descriptionShouldBe: `Description Should Be shorter than ${consts.descriptionMaxLength} chars`,
  details: "details",
  headline: "My Store",
  imgURL: "Image URL",
  name: "Name",
  nameShouldBe: `Name Should Be shorter than ${consts.nameMaxLength} chars`,
  noAvailable: "No Available Products",
  price: "Price",
  priceShouldBe: `Price Should Be greater than ${consts.minPrice}$`,
  recentlyAdded: "Recently Added",
  save: "SAVE",
  searchProducts: "Search Products",
  sortBy: "Sort By"
}

export enum SortOptions {
  none = 'None',
  productName = 'Product Name',
  creationDate = 'Creation Date'
}