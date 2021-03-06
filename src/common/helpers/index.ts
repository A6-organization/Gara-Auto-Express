import defaultBrands from './brands.json';

/* eslint-disable  @typescript-eslint/no-explicit-any */

export const converIntToFloat = (num: number, decPlaces: number): number => {
  return num.toFixed(decPlaces) as any;
};

export const getRandomDiscountPercent = () => {
  const percentages = [0, 2, 5, 7, 10];
  const randIdx = Math.floor(Math.random() * percentages.length);
  return percentages[randIdx];
};

export const getRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const mapBrandToBrandId = (inputBrand: string) => {
  const result = defaultBrands.filter((brand) => brand.name === inputBrand);
  if (result.length === 0) console.log('brand not found');
  return result[0].id;
};

export const assignPropToObj = (
  obj: any,
  props: Array<any>,
  values: Array<any>
) => {
  if (props.length !== values.length) {
    return;
  }
  props.forEach((prop, idx) => {
    obj[prop] = values[idx];
  });
};
