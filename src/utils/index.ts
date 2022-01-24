import { Size } from "../entities/size.entity";
import { Category } from "../entities/category.entity";

export const isStringArray = (test: any[], type: string): boolean => {
  return Array.isArray(test) && test.every((value) => typeof value === type);
};

export const checkSizeAndCategoryValid = async (
  categories: Category[],
  sizes: Size[]
): Promise<boolean> => {
  for (const category of categories) {
    const checkCategoryExist = await Category.findOne({ where: { category } });
    if (!checkCategoryExist) {
      return false;
    }
  }
  for (const size of sizes) {
    const checkSizeExist = await Size.findOne({ where: { size } });
    if (!checkSizeExist) {
      return false;
    }
  }
  return true;
};
