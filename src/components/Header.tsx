import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../App';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  height: 120px;
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

  h3 {
    cursor: pointer;
  }
`

const ThemeBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`


const Header = () => {
    const { currentTheme, toggleTheme } = useTheme();
    const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div className="container d-flex align-items-center justify-content-between">
        <h3 onClick={() => navigate("/")}>Where in the world?</h3>
        <ThemeBlock onClick={toggleTheme}>
            {currentTheme === 'dark' && <FontAwesomeIcon icon={faMoon} />}
            {currentTheme === 'light' && <FontAwesomeIcon icon={faSun} />}
            <p>{currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
        </ThemeBlock>
      </div>
    </HeaderContainer>
  )
}

export default Header