import * as C from './styles';
import { useEffect, useState } from 'react';
import { CountriesTS } from '../../types/Countries';
import { Input } from '../../components/Input';
import { api } from '../../api';
import { CountryItem } from '../../components/CountryItem';
import Pagination from './Pagination';
import { useForm } from '../../contexts/ThemeContext';

const LIMIT = 24;

export const Countries = () => {
  const { state } = useForm();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<CountriesTS[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    setOffset(0);
  }, [search, selectedRegion]);

  const getAllCountries = async () => {
    setLoading(true);
    try {
      const fetchedCountries = await api.getCountries();
      setCountries(fetchedCountries);
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

  const filteredCountries = countries.filter((country) => {
    const countryName = country.name.toLowerCase();
    const searchInput = search.toLowerCase();
    const region = country.region.toLowerCase();
    
    if (selectedRegion) {
      return region.includes(selectedRegion.toLowerCase()) && countryName.includes(searchInput);
    } else {
      return countryName.includes(searchInput);
    }
  });

  const pagCountries = filteredCountries.slice(offset, offset + LIMIT);

  return (
    <C.CountriesArea theme={state.theme}>
      <Input value={search} search={handleSearch} selectRegion={handleSelectRegion} />

      <div className="countries">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          pagCountries.map((item) => (
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

      <Pagination limit={LIMIT} total={filteredCountries.length} offset={offset} setOffset={setOffset} />
    </C.CountriesArea>
  );
};
