import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

const API_KEY = "33032852-f9b14fb0441fac63083ffdb75";

class App extends Component {
  state = {
    image: '',
    page: 1,
    showModal: false,
    images: [],
    modalUrl: '',
    loading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const {image, page } = this.state
    if (prevState.image !== image || prevState.page !== page) {
          this.setState({loading: true})
            fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${image}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(resp => {
                    if (resp.status !== 200) {
                        return Promise.reject(
                            new Error(`something went wrong :(`)
                        );  
                    }
                    return resp.json()
                })
                .then(images => {
                    if (images.hits.length === 0) {
                        toast.error("Зображення за запитом не знайдено");
                        return Promise.reject(
                        new Error(`images not found `)
                        );
                    }
                  this.setState(prevState  => ({
                      images: [...prevState.images, ...images.hits]
                    }))
                }).finally(()=> this.setState({loading: false}))
        }
    }

  searchFormSubmit = image => {
    this.setState({
      image,
      page: 1,
      showModal: false,
      images: [],
      modalUrl: '',
      loading: false,
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }

  activeImage = url => {
    this.setState({ modalUrl: url });
  }

  activeLoadMore = () => {
    this.setState(prevState=>({page: prevState.page + 1}))
  }


  
  render() {
    const {loading, images, modalUrl } = this.state
    return(
    <div
        style={{
        display: "grid",
        gridTemplateColumns: "1fr",
         gridGap: "16px",
        paddingBottom: "24px",
      }}
      >
        <Searchbar onSubmit={this.searchFormSubmit} />
        {loading && <Loader/>}
        <ImageGallery
          images={images}
          showModal={this.toggleModal}
          modalUrl={this.activeImage}
        />
        {this.state.showModal && <Modal
          onClose={this.toggleModal}
          modalImg={this.modalUrl}
        >
          <img src={modalUrl} alt="" width='700'/>
        </Modal>}
        {images.length > 0  && <Button activeLoadMore={this.activeLoadMore} />}
        <ToastContainer autoClose={3000} theme="colored"/>
    </div>
  );
  }
  
};

export default App;