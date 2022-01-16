import { SizeType } from "../types/SizeType";
import { Category } from "../entities/Category";
import { CategoryType } from "../types/CategoryType";
import { Size } from "../entities/Size";

const generateData = async() => {
  let newCat: Category;
  for(let category in CategoryType) {
    let checkCategoryExist = await Category.find({ where: { category } })
    if(!checkCategoryExist || checkCategoryExist.length === 0) {
      newCat = Category.create({
        category
      })
      await newCat.save();
    }
  }
  let newSize: Size;
  for(let size in SizeType) {
    let checkSizeExist = await Size.find({ where: { size } })
    if(!checkSizeExist || checkSizeExist.length === 0) {
      newSize = Size.create({
        size
      })
      await newSize.save();
    }
  }
}

export default generateData;