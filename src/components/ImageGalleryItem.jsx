
import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

function ImageGalleryItem({ image, largeImage, tags, onModal }) {

    return (
        <>
            <li className="ImageGalleryItem">
            <img src={ image } 
            alt={ tags } className="ImageGalleryItem-image" 
            onClick={() => onModal(largeImage)} />
            </li>
            
        </>
    )

}

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onModal: PropTypes.func.isRequired,
}

export default ImageGalleryItem;