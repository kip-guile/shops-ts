import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/rootReducer'
import styled from 'styled-components'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import {
  updateFiltersActionCreator,
  clearFiltersActionCreator,
} from '../store/filter/filterSlice'

const Filters = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.filter)
  const {
    filters: {
      text,
      category: cat,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    all_products,
  } = filter
  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')
  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={(e) =>
                dispatch(
                  updateFiltersActionCreator({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((category: string, index: number) => {
                return (
                  <button
                    key={index}
                    name='category'
                    type='button'
                    className={`${
                      cat === category.toLowerCase() ? 'active' : null
                    }`}
                    onClick={(e) =>
                      dispatch(
                        updateFiltersActionCreator({
                          name: 'category',
                          value: category,
                        })
                      )
                    }
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='company'
              value={company}
              onChange={(e) =>
                dispatch(
                  updateFiltersActionCreator({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              className='company'
            >
              {companies.map((c: string, index: number) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c: string, index: number) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name='color'
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                      onClick={(e) =>
                        dispatch(
                          updateFiltersActionCreator({
                            name: 'color',
                            value: c,
                          })
                        )
                      }
                    >
                      all
                    </button>
                  )
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    data-color={c}
                    onClick={(e) =>
                      dispatch(
                        updateFiltersActionCreator({
                          name: 'color',
                          value: c,
                        })
                      )
                    }
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  updateFiltersActionCreator({
                    name: e.target.name,
                    value: Number(e.target.value),
                  })
                )
              }
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          <div className='form-control shipping'>
            <label htmlFor='shipping'> free shipping </label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  updateFiltersActionCreator({
                    name: e.target.name,
                    value: e.target.checked,
                  })
                )
              }
            />
          </div>
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFiltersActionCreator())}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
