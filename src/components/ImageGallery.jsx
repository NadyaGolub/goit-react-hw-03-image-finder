import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery ({ articles, onImgClick}) {
    
    return (
        <ul className="ImageGallery">
            {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem key={id}
                    image={webformatURL}
                    largeImage={largeImageURL}
                    tags={tags}
                    onModal={onImgClick}
                />
            ))}
        </ul>
    )
    
}


ImageGallery.propTypes = {
    articles: PropTypes.array.isRequired,
    onImgClick: PropTypes.func.isRequired,
}

export default ImageGallery;

