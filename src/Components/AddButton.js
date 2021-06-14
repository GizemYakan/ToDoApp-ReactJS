  
import React from 'react'

const AddButton = ({ onClick }) => {
    return (
        <div className="add-button">
            <button onClick={() => onClick()}>✚</button>
        </div>
    );
};

export default AddButton;