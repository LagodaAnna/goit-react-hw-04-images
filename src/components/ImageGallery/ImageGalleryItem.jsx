import PropTypes from 'prop-types';
import { ImageContainer, Image } from './ImageGallery.styled';
import { forwardRef } from 'react';

const ImageGalleryItem = forwardRef(
  ({ tags, webformatURL, largeImageURL, onClick }, ref) => {
    return (
      <ImageContainer
        onClick={() => {
          onClick(largeImageURL);
        }}
      >
        <Image src={webformatURL} alt={tags} ref={ref} />
      </ImageContainer>
    );
  }
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
