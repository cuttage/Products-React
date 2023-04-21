const useCategoryName = (category) => {
  let categoryName

  switch (category) {
    case 'smartphones':
      categoryName = 'Telefonia'
      break
    case 'laptops':
      categoryName = 'Informatica'
      break
    case 'skincare':
    case 'fragrances':
      categoryName = 'Beauty'
      break
    default:
      categoryName = category.toUpperCase()
  }

  return categoryName
}

export default useCategoryName
