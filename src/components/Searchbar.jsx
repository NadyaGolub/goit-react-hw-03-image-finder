import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import '../styles.css';

class Searchbar extends Component {
    state = {
        name: '',
        page: 1,
    }

    handleChange = e => {
        const { value } = e.currentTarget;
        console.log(value);

        this.setState({ name: value })
    }

    handleSubmit = e => {
        e.preventDefault();

        if(this.state.name.trim() === '') {
            toast.error('Please enter a search query');
            return;
        }

        this.props.onSubmitHandler(this.state.value);

        this.reset();
    }

    reset() {
        this.setState({ name: '' });
    }

    render() {

        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={ this.handleSubmit }>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        onChange={ this.handleChange }
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.name}
                    />
                </form>
            </header>

        )
    }
}

Searchbar.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
}

export default Searchbar;