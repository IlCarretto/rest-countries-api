import React from 'react'
import { Country } from '../type';
import CountryItem from './CountryItem';

interface IProps {
  currentCountries: Country[] | undefined;
}

const CountryList = ({currentCountries}: IProps) => {
  return (
    <div>
      <div className="row g-3">
      {currentCountries && currentCountries.map((country, i) => {
        return (
            <div key={i} className="col-9 col-md-4 col-lg-3">
              <CountryItem country={country}/>
            </div>
        )
      })}
      </div>
    </div>
  )
}

export default CountryList