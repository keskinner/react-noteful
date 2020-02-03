import React from 'react';
import ValidationError from '../ValidationError';
import config from '../config';
import ApiContext from '../ApiContext';
import NotefulError from '../NotefulError';
import './Addfolder.css';

export default class AddFolder extends React.Component {
    static contextType = ApiContext; 
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            },
            id: '',
            
        };
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const folder = {
            id: this.state.id,
            name: this.state.name.value
        }
        const url = config.API_ENDPOINT + '/folders';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name: {value: ''},
                id: ''
            })
            this.context.addFolder(data)
            this.props.history.push('/')
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } 
        else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
    }
    
    render() {
        const nameError = this.validateName();
        return (
            <form className = "newFolder"
                onSubmit = {(e) => this.handleSubmit(e)}>
                <NotefulError>
                    <h2>Create a new folder!</h2>
                    <label htmlFor="name">Folder Name *</label>
                    <div className="folderCreation__hint">* required field</div>
                    <input 
                        type = "text" 
                        className = "folderCreation"
                        name = "name" 
                        id = "name" 
                        onChange = {e => this.updateName(e.target.value)}/>
                    {this.state.name.touched && (
                        <ValidationError message = {nameError}/>
                    )}
                    <button
                        type = "submit"
                        className = "folderCreation_button"
                        style = {this.state.name.touched ? {"cursor": "pointer"} : {"cursor": "not-allowed"}}
                        disabled = {
                            this.validateName() 
                        }
                        >
                        Create Folder
                    </button>
                </NotefulError>
            </form>
        )
    }
}