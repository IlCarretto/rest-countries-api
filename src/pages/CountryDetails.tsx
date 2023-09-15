import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Country } from '../type';

const CountryDetails = () => {
  let { name } = useParams();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const resp = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        if (resp.ok) {
          const data = await resp.json();
          const formattedData: Country = data.map((country: any) => ({
              name: country.name.common,
              population: country.population,
              region: country.region,
              flags: country.flags.png,
              capital: country.capital
          }));
          setCountry((formattedData));
          console.log(country, formattedData);
      } else {
          console.error('Error formatting data', resp.status);
      }
      } catch (err) {
        console.error(err);
        console.error('Error fetching data', err);
      }
    }
    getCountry();
  }, [])
  
  return (
    <div>{country?.name}</div>
  )
}

export default CountryDetails