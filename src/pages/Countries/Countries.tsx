import * as C from './styles';
import { useEffect, useState } from 'react';
import { CountriesTS } from '../../types/Countries';
import { Input } from '../../components/Input/Input';
import { CountryItem } from '../../components/CountryItem/CountryItem';
import Pagination from './Pagination';
import { useForm } from '../../contexts/ThemeContext';
import { useApi } from '../../contexts/ApiContext';

const LIMIT = 24;

export const Countries = () => {
  const { state } = useForm();
  const countries = useApi();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [offset, setOffset] = useState(0);
  const [showNoCountryMessage, setShowNoCountryMessage] = useState(false); // if "region has no searched country" message

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    setOffset(0);
  }, [search, selectedRegion]);

  const getAllCountries = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
  };

  const filteredCountries = countries?.filter((country: CountriesTS) => {
    const countryName = country.name.toLowerCase();
    const searchInput = search.toLowerCase();
    const region = country.region.toLowerCase();

    if (selectedRegion) {
      return region.includes(selectedRegion.toLowerCase()) && countryName.includes(searchInput);
    } else {
      return countryName.includes(searchInput);
    }
  });

  const pagCountries = filteredCountries?.slice(offset, offset + LIMIT) || [];

  useEffect(() => {
    // If the searched country is not in the selected region
    setShowNoCountryMessage(selectedRegion !== '' && filteredCountries?.length === 0);
  }, [selectedRegion, filteredCountries]);

  return (
    <C.CountriesArea theme={state.theme}>
      <Input value={search} search={handleSearch} selectRegion={handleSelectRegion} />

      <div className="countries">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : showNoCountryMessage ? (
          <div className="no-country-message">Searched country is not in this region</div>
        ) : (
          pagCountries?.map((item: CountriesTS) => (
            <CountryItem
              key={item.numericCode}
              name={item.name}
              population={item.population}
              region={item.region}
              capital={item.capital}
              flag={item.flags.png}
            />
          ))
        )}
      </div>

      <Pagination limit={LIMIT} total={filteredCountries?.length || 0} offset={offset} setOffset={setOffset} />
    </C.CountriesArea>
  );
};
