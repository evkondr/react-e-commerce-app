import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';
import { useUserContext } from '../context/user_context';

const AboutPage = () => {
  const {currentUser} = useUserContext();
  console.log(currentUser);
  return <main>
    <PageHero title='о нас'/>
    <Wrapper className='page section section-center'>
      <img src={aboutImg} alt='nice desk' />
      <article>
        <div className="title">
          <h2>Наша история</h2>
          <div className="underline"></div>
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, quo error dolore ut officiis maxime quidem reprehenderit tempore quibusdam expedita consequuntur accusantium consequatur ducimus sunt, necessitatibus vitae nobis fuga! Consectetur odit error quidem reprehenderit sed.</p>
      </article>
    </Wrapper>
  </main>
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
