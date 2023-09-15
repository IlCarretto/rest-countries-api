import { createContext, useContext, useState, useEffect } from 'react';
import { Country } from '../type';
import { useSearchParams } from 'react-router-dom';

interface IContext {
    countries: Country[] | undefined;
}

const CountryContext = createContext<IContext>({countries: []});

export const useCountry = (): Country[] | undefined => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('useCountry error')
    }
    return context.countries
} 

export const CountryContextProvider = ({children}: {children: React.ReactNode}) => {

    const [searchParams] = useSearchParams();
    const selectedRegion = searchParams.get("region")?.toLowerCase();
    const selectedCountry = searchParams.get("country")?.toLowerCase();

    const [countries, setCountries] = useState<Country[] | undefined>(undefined);

    useEffect(() => {
        const getCountries = async () =>  {
            try {
                let resp;
                if (!selectedRegion) {
                    resp = await fetch('https://restcountries.com/v3.1/all');
                } else if (selectedRegion) {
                    resp = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
                } else {
                    resp = await fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`);
                }
                if (resp.ok) {
                    const data = await resp.json();
                    const formattedData: Country[] | undefined = data.map((country: any) => ({
                        name: country.name.common,
                        population: country.population,
                        region: country.region,
                        flags: country.flags.png,
                        capital: country.capital
                    }));
                    setCountries(formattedData);
                } else {
                    console.error('Error formatting data', resp.status);
                }
            } catch (err) {
                console.error('Error fetching data', err);
            }
        }   
        getCountries();
    }, [selectedRegion, selectedCountry])

    return (
        <CountryContext.Provider value={{countries}}>
            {children}
        </CountryContext.Provider>
    );
}