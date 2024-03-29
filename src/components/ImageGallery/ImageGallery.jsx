import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { Container } from './ImageGallery.styled';
import { forwardRef } from 'react';

export const ImageGallery = forwardRef(({ onClick, pictures }, ref) => {
  return (
    <Container>
      {pictures.map(({ tags, webformatURL, largeImageURL }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
            ref={ref}
          />
        );
      })}
    </Container>
  );
});

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
};
