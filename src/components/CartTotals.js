import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';

const CartTotals = () => {
  const {currentUser, loginWithRedirect} = useUserContext();
  const {total_amount, shipping_fee} = useCartContext();
  return <Wrapper>
    <div>
      <article>
        <h5>Сумма: <span>{formatPrice(total_amount)}</span></h5>
        <p>стоимость доставки: <span>{formatPrice(shipping_fee)}</span></p>
        <hr />
        <h4>Общая стоимость: <span>{formatPrice(total_amount + shipping_fee)}</span></h4>
      </article>
      { currentUser ? <Link to='/checkout' className="btn">перейти к оплате</Link> 
      : 
      <button type="btn" className="btn" onClick={loginWithRedirect}>Войти</button>}
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
    font-size: 1rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
