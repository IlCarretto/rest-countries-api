import React from 'react'
import { Country } from '../type'
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  }
`

const CountryItem = ({country}: IProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleOpenCountry = () => {
    setSearchParams(`country=${country.name.toLowerCase()}`);
    navigate(`/country/${country.name.toLowerCase()}`)
  }

  return (
    <CountryBox onClick={handleOpenCountry} className='country-item'>
        <img src={`${country.flags}`} alt="Bandiera Country" />
      <div className="content">
        <h4>{country.name}</h4>
        <p className='mt-2'>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </CountryBox>
  )
}

export default CountryItem