import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  const {cart} = useCartContext();
  if(cart.length < 1){
    return <Wrapper className='page-100'>
      <div className='empty'>
        <h2>Корзина пуста</h2>
        <Link to='/products' className='btn'>
          Продукты
        </Link>
      </div>
    </Wrapper>
  }
  return <main>
    <PageHero title='корзина'/>
    <Wrapper className='page'>
      <CartContent />
    </Wrapper>
  </main>
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
