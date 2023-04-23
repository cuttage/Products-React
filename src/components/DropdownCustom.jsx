import React, { memo, useMemo } from 'react'

function DropdownCustom({
  categories,
  products,
  isLoading,
  handleProductsChange,
  categoryName,
}) {
  const categoryNames = useMemo(
    () => [...new Set(categories.map((name) => categoryName(name)))],
    [categories, categoryName]
  )

  const brands = useMemo(
    () => [...new Set(products.map((item) => item.brand))],
    [products]
  )

  return (
    <div className="dropdown-wrapper">
      <nav className="dropdown-menu">
        <div className="dropdown-item">
          <p className="dropdown-item-title">{`Categoria`.toUpperCase()}</p>
          <ul className="dropdown__links">
            {isLoading ? (
              <p style={{ padding: '15px' }}>Loading...</p>
            ) : (
              <>
                {categoryNames.length > 0 &&
                  categoryNames.map((categoryN) => (
                    <li className="dropdown__link" key={categoryN}>
                      <p
                        className="dropdown__link__p"
                        onClick={() => handleProductsChange(categoryN)}
                      >
                        {categoryN.toUpperCase()}
                      </p>
                    </li>
                  ))}
              </>
            )}
          </ul>
        </div>
        <div className="dropdown-item">
          <p className="dropdown-item-title">{`Marca`.toUpperCase()}</p>
          <ul className="dropdown__links">
            {isLoading ? (
              <p style={{ padding: '15px' }}>Loading...</p>
            ) : (
              <>
                {brands.length > 0 &&
                  brands.map((brand) => (
                    <li className="dropdown__link" key={brand}>
                      <p
                        className="dropdown__link__p"
                        onClick={() => handleProductsChange(brand)}
                      >
                        {brand.toUpperCase()}
                      </p>
                    </li>
                  ))}
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default memo(DropdownCustom)
