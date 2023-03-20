import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css'
import { VscSearch } from "react-icons/vsc";


class Searchbar extends Component {
    state = {
        image: '',
    }

    searchImage = event => {
        this.setState({image: event.currentTarget.value.toLowerCase()})
    }


    handleSubmit = event => {
        event.preventDefault();

        if (this.state.image.trim() === '') {
            toast.error("Введіть назву зображення");
            return;  
        }

        this.props.onSubmit(this.state.image);
        this.setState({image: ''})
    }

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm}  onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <VscSearch style={{
                            width: 20,
                            height: 50
                        }} />
                    </button>

                    <input
                    className={css.SearchFormInput}
                    type="text"
                    placeholder="Search images and photos"
                    value={this.state.image}
                    onChange={this.searchImage}
                    />
                </form>
            </header>
        )
    };
}



export default Searchbar;