import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';

const CheckoutPage = () => {
    const { cart } = useCartContext();
    return <main>
        <PageHero title={'оплата'}/>
        <Wrapper className="page">
            {cart.length < 1 ? (
                <div className='empty'>
                <h2>Корзина пуста</h2>
                <Link to='/products' className='btn'>
                  Начать покупки
                </Link>
              </div>
            ) : (
                <StripeCheckout />
            )}
        </Wrapper>
    </main>
};
//STYLES
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .empty {
        text-align: center;
    }`;

export default CheckoutPage;
