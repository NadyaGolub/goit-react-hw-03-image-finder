import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';

import Button from "./Button";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Loader from "./Loader"; 
import Searchbar from './Searchbar';
const axios = require('axios');


class App extends Component {
    state = {
        hits: [],
        name: '',
        page: 1,
        showModal: false,
        loading: false,
        modalImage: '',
        visibleLoadMore: false
    }

    componentDidMount() {
        const parsedHits = JSON.parse(localStorage.getItem("hits"));

        if (parsedHits !== null) {
            this.setState({ hits: parsedHits });
        }
    }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hits !== prevState.hits) {
      
    localStorage.setItem("hits", JSON.stringify(this.state.hits));
  }
    }

    openModal = largeImageURL => {
        this.setState({
          showModal: true,
          modalImage: largeImageURL,
        });
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
    }

    getValue = data => {
        this.setState({ name: data.name, page: data.page, hits: []});
        const { name, page } = data;
        const response = this.pixabayApi(name, page);
        return response;
    }

    async pixabayApi(name, page) {        
        this.setState({ loading: true });

         const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: "horizontal",
            safesearch: true,
            per_page: 12,
         });
        
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '32971749-6f722df3241990952229e902a';

        try {
            const response = await axios(`${BASE_URL}/?key=${API_KEY}&q=${name}&page=${page}&${searchParams}`);

            const totalPages = response.data.totalHits / response.data.hits.length;
           
            if (response.data.hits.length < 1) {
                this.setState({ loading: false })
                toast.error('Please enter a correct query');
                return;
            }
            this.setState(({ loading, hits, page, }) => {
                return {
                loading: !loading,
                hits: [...hits,...response.data.hits],
                page: page + 1,
                }
            });
            this.setState({ visibleLoadMore: true });
            if ((page - 1) >= totalPages) {
                this.setState({ loading: false, visibleLoadMore: false })
                toast.error('These were the last images');
            }
            return response.data.hits;
        } catch (error) {
            this.setState({ error });
        }
    }
    

    render() {
        const { hits, showModal, name, page, loading, modalImage, visibleLoadMore } = this.state;
       

        return (
          <div>
            <Searchbar onSubmitHandler={ this.getValue }/>
              

                <ToastContainer autoClose={ 2000 } />

                { loading && <Loader />}

                {hits && (
                <ImageGallery articles={ hits } onImgClick={ this.openModal }/> )}

                {showModal && (
                <Modal onClose={ this.toggleModal }>
                <img src={modalImage} alt="largeImage" className='image' />
                </Modal> )}

                { visibleLoadMore && (
                <Button onButtonClick={ () => this.pixabayApi(name, page) } />)}
            </div>
        )
    }
}

export default App;