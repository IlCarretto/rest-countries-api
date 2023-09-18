import { createContext, useContext, useState, useEffect } from 'react';
import { Country } from '../type';
import { useSearchParams } from 'react-router-dom';

interface IContext {
    countries: Country[] | undefined | Country;
}

const CountryContext = createContext<IContext>({countries: []});

export const useCountry = (): Country[] | undefined | Country => {
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

    const [countries, setCountries] = useState<Country[] | undefined | Country>(undefined);

    let queryParam: string;
    switch (true) {
        case !!selectedRegion:
            queryParam = `/region/${selectedRegion}`;
            break;
        case !!selectedCountry:
            queryParam = `/name/${selectedCountry}`;
            break;
        default:
            queryParam = "/all";
    }
    const formatResponse = async (selectedCountry: boolean, data: Country[]) => {
        if (selectedCountry) {
            const formatDataDetails: Country[] = data.map((country:any) => ({
                name: country.name.common,
                population: country.population,
                region: country.region,
                flags: country.flags.png,
                capital: country.capital[0],
                native: country.name.official,
                subregion: country.subregion,
                tld: country.tld[0],
                currencies: Object.keys(country?.currencies).map(curr => country.currencies[curr].name),
                languages: country.languages,
                borders: country.borders
            }));
            return formatDataDetails[0];
        } else {
            const formattedData: Country[] = data.map((country: any) => ({
                name: country.name.common,
                population: country.population,
                region: country.region,
                flags: country.flags.png,
                capital: country.capital
            }));
            return formattedData;
        }
    }
    useEffect(() => {
        const getCountries = async () =>  {
            try {
                const resp = await fetch(`https://restcountries.com/v3.1${queryParam}`);
                if (resp.ok) {
                    const data = await resp.json();
                    const responseFormatted = await formatResponse(!!selectedCountry, data);
                    setCountries(responseFormatted);
                } else {
                    console.error('Error formatting data', resp.status);
                }
            } catch (err) {
                console.error('Error fetching data', err);
            }
        }   
        getCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParam])

    return (
        <CountryContext.Provider value={{countries}}>
            {children}
        </CountryContext.Provider>
    );
}