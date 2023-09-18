import React from 'react'
import { Country } from '../type'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface IProps {
  country: Country;
}

const CountryBox = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  height: 100%;
  cursor: pointer;

  img {
    border-radius: 4px;
    height: 150px;
  }

  .content {
    padding: 1.4rem;

    p {
      font-weight: 500;
    }

    span {
      font-weight: 300;
    }
  }
`

const CountryItem = ({country}: IProps) => {
  const navigate = useNavigate();
  
  const handleCountryDetails = () => {
    navigate({
      pathname: `/countries`,
      search: `?country=${country.name.toLowerCase()}`
    })
  }

  return (
    <CountryBox onClick={handleCountryDetails} className='country-item'>
        <img src={`${country.flags}`} alt="Bandiera Country" />
      <div className="content">
        <h4>{country.name}</h4>
        <p className='mt-2'>Population: <span>{country.population.toLocaleString()}</span>
        </p>
        <p>Region: <span>{country.region}</span></p>
        <p>Capital: <span>{country.capital}</span></p>
      </div>
    </CountryBox>
  )
}

export default CountryItem