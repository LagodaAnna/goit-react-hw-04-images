import PropTypes from 'prop-types';
import { Header, SearchForm, Button, Input } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit" aria-label="search">
          <SearchIcon width="20" height="20" fill="grey" />
        </Button>

        <Input
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
