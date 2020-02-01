import React from 'react';
import ApiContext from './ApiContext';
import './Dropdown.css';

export default class Dropdown extends React.Component {
    static contextType = ApiContext;
    
    render() {
        const {folders = []} = this.context;
        return (
            <select 
                className = "dropdown"
                onChange = {e => this.props.updateFolderId(e.target.value)}>
                    <option value={null}>Select a Folder</option>
                {folders.map(folder => 
                    <option 
                        key = {folder.name}
                        value = {folder.id}
                        className = "folderOption">
                        {folder.name}
                    </option>
                    )}
            </select> 
        )
    }
}