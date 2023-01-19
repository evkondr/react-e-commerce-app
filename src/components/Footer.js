import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return <Wrapper>
    <div className='rights'>
      <h5>
        &copy;{new Date().getFullYear()}
<span> ComfySloth</span>
      </h5>
      <h5>Все права защищены</h5>
    </div>
    <a href="https://github.com/evkondr/react-e-commerce-app" target="_blank" rel="noopener noreferrer"><FaGithub /> Исходный Код</a>
  </Wrapper>
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  a{
    display: flex;
    align-items: center;
    color: var(--clr-white);
    margin-top: 0.5rem;
    svg{
      margin-right: 0.5rem;
    }
  }
  .rights{
    display: flex;
    @media (min-width: 776px) {
      flex-direction: row;
    }
  }
`;

export default Footer;
