import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      max_price,
      price,
      shipping
    }, 
    updateFilters, 
    clearFilters, 
    all_products
  } = useFilterContext();
  const categories = getUniqueValues(all_products, 'category')
  const colors = getUniqueValues(all_products, 'colors')
  const companies = getUniqueValues(all_products, 'company')
  return <Wrapper>
    <div className='content'>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* search input */}
        <div className='form-control'>
           <input type='text' name='text' placeholder='поиск' className='search-input' value={text} onChange={updateFilters}/>
        </div>
        {/* categories */}
        <div className='form-control'>
          <h5>категория</h5>
           <div>
            {categories.map((c, index) => <button key={index} 
              className={category === c.toLowerCase() ? 'active' : null} 
              type='button' 
              name='category'
              data-value={c}
              onClick={updateFilters}
              >
              {c}
            </button>)}
           </div>
        </div>
        {/* companies */}
        <div className='form-control'>
          <h5>Бренд</h5>
           <select name="company" onChange={updateFilters}>
              {companies.map((c,index) => <option key={index} value={c}>
                {c}
              </option>)}
           </select>
        </div>
        {/* colors */}
        <div className='form-control'>
          <h5>Цвет</h5>
           <div className="colors">
             {colors.map((c, index) => {
              if(c === 'все'){
                return <button 
                  key={index}
                  name="color"
                  data-value={c}
                  className={`all-btn${color === c ? ' active' : ''}`} 
                  onClick={updateFilters}>
                  все
                </button>
              }
              return <button 
                key={index}
                name="color"
                data-value={c}
                style={{backgroundColor: c}}
                className={`color-btn${color === c ? ' active' : ''}`} 
                onClick={updateFilters}>
                {color === c ? <FaCheck/> : null}
              </button>
             })}
           </div>
        </div>
        {/* price */}
        <div className="form-control">
          <h5>Цена</h5>
          <p className="price">{formatPrice(price)}</p>
          <input type="range" name='price' min={min_price} max={max_price} value={price} onChange={updateFilters}/>
        </div>
        {/* shipping */}
        <div className="form-control shipping">  
          <label htmlFor="shipping">бесплатная доставка</label>
          <input id='shipping' type="checkbox" name='shipping' checked={shipping} onChange={updateFilters} />
        </div>
      </form>
      <button type='button' className='clear-btn' onClick={clearFilters}>очистить</button>  
    </div>
  </Wrapper>
};

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
    display: flex;
    column-gap: 10px;
    align-items: center;
    text-transform: capitalize;
    font-size: 1rem;
    max-width: 200px;
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
`;

export default Filters;
