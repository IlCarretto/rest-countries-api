import React, {useState} from 'react'
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import CountryList from '../components/CountryList';
import { useCountry } from '../Context/CountryContext';
import { useSearchParams } from 'react-router-dom';
import {getUpperCaseWord} from '../utils/getUpperCaseWord';
import Pagination from '../components/Pagination';


const Home = () => {
  const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [searchParams, setSearchParams] = useSearchParams();
  const countries = useCountry();

  const handleFilterByRegion = (region: string) => {
    setSearchParams(`region=${region.toLowerCase()}`);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  }
  const selectedRegion = searchParams.get("region");
  
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 8;
  
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCurrentPage(1);
  }
  const filteredCountries = countries?.filter((country) => country.name.toLowerCase().includes(inputValue.toLowerCase())).slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage);
  const visibleCountries = countries?.filter((country) => country.name.toLowerCase().includes(inputValue.toLowerCase()));
  const totalPages = Math.ceil((visibleCountries?.length || 0) / countriesPerPage);
  
  return (
    <main id='countries'>
        <form>
            <div className="form-group">
                <div className="search-input">
                    <input type="text" value={inputValue} onChange={handleChange} placeholder='Search for a country..'/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="custom-select mt-4 mt-md-0">
                  <span>{selectedRegion ? getUpperCaseWord(selectedRegion) : 'Filter by Region'}</span>
                  <FontAwesomeIcon onClick={() => setIsDropdownOpen(!isDropdownOpen)} icon={faChevronDown} />
                  {isDropdownOpen && (
                  <ul>
                    {regions.map((region, i) => (
                      <li onClick={() => handleFilterByRegion(region)} key={i}>
                        {region}
                      </li>
                    ))}
                  </ul>
                  )}
                </div>
            </div>
        </form>
        <div className="container mt-2">
          <CountryList currentCountries={filteredCountries}/>
          <Pagination currPage={currentPage} setCurrPage={setCurrentPage} totalPages={totalPages} currentCountries={filteredCountries}/>
        </div>
    </main>
  )
}

export default Home