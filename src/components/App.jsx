import { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import api from '../api';
import Box from './Box';
import { mapper } from 'services/mapper';

const App = () => {
  const [page, setPage] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [error, setError] = useState(null);

  const pictureRef = useRef();

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    const getPictures = async () => {
      try {
        const { hits } = await api.searchPictures(query, page);
        const upDatePictures = mapper(hits);

        setPictures(prevPic =>
          prevPic ? [...prevPic, ...upDatePictures] : upDatePictures
        );
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPictures();
  }, [query, page, error]);

  useEffect(() => {
    if (pictureRef.current) {
      const { height: cardHeight } = pictureRef.current.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }, [pictures]);

  const handlerSubmit = currentQuery => {
    if (query === currentQuery || currentQuery.trim() === '') {
      return;
    }

    setPage(1);
    setPictures([]);
    setQuery(currentQuery);
  };

  // const scrollDown = ({ height: cardHeight }) => {
  //   if (pictureRef.current) {
  //     window.scrollBy({
  //       top: cardHeight * 2,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  return (
    <>
      <Box
        as="main"
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        pb="24px"
      >
        <Searchbar onSubmit={handlerSubmit} />
        {error && (
          <Box as="p" mx="auto" fontWeight="600" fontStyle="italic">
            Whoops, something went wrong, please refresh the page
          </Box>
        )}
        {pictures.length !== 0 && (
          <ImageGallery
            pictures={pictures}
            onClick={setLargeImageURL}
            ref={pictureRef}
          />
        )}
        {isLoading && <Loader />}

        {pictures.length !== 0 && (
          <Button onClick={() => setPage(prevPage => prevPage + 1)} />
        )}
      </Box>
      {largeImageURL && (
        <Modal onClose={() => setLargeImageURL(null)}>
          <img src={largeImageURL} alt="Big version" />
        </Modal>
      )}
    </>
  );
};

export default App;
