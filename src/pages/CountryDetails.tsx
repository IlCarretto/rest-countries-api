import React from 'react'
import { Country } from '../type';
import { useCountry } from '../Context/CountryContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 85vw;
  max-width: 1300px;
  margin: 0 auto;
`

const CountryDetailed = styled.div`
  margin-top: 2rem;
  img {
    width: 100%;
    border-radius: 4px;

    @media (min-width: 1140px) {
      width: 180%;
    }
  }

  @media (min-width: 1140px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    p {
      margin-bottom: 8px!important;
      font-weight: 300;
    }
    span {
      font-weight: 500;
    }

    @media (min-width: 1200px) {
      display: flex;
      align-items: center;
    } 
  }
`

const CountryDetails = () => {
  const country = useCountry() as Country;
  const navigate = useNavigate();

  return (
    <main id="country">
      <Container>
        <button onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <CountryDetailed>
          <div className="image">
            <img src={country?.flags} alt="" />
          </div>
          { country && (
          <div className="content">
            <div className="main-content">
              <h3 className='mt-4 mt-lg-0'>{country?.name}</h3>
              <p className='mt-3 mt-xl-0 me-xl-4'><span>Native Name: </span>{country?.native}</p>
              <p><span>Population: </span>{country?.population}</p>
              <p><span>Region: </span>{country?.region}</p>
              <p><span>Sub Region: </span>{country?.subregion}</p>
              <p><span>Capital: </span>{country?.capital}</p>
            </div>
            <div className="secondary-content mt-3 mt-lg-0">
            <p><span>Top Level Domain: </span>{country?.tld}</p>
            <p><span>Currencies: </span>{country?.currencies?.map((curr) => curr).join(', ')}</p>
            <p><span>Languages: </span>
              {country && country.languages && Object.values(country.languages).map((lang) => lang).join(', ')}
            </p>
            <p className='mt-3 mt-lg-0'><span>Border Countries: </span>{country?.borders?.map((curr) => curr).join(', ')}</p>
            </div>
          </div>
          )}
        </CountryDetailed>
      </Container>
    </main>
  )
}

export default CountryDetails