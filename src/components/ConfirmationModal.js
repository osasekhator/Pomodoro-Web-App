// ConfirmationModal.jsx

import React from 'react';

// Receives projectName, and two callback functions from the parent
function ConfirmationModal({ projectName, onConfirm, onCancel }) {
    // Basic inline styles for clarity; you'd use a CSS file in production
    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const contentStyle = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };
    
    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    };

    return (
        <div style={modalStyle}>
            <div style={contentStyle}>
                <h3>Are you sure?</h3>
                <p>Do you want to permanently delete project: <strong>{projectName}</strong>?</p>
                
                {/* 1. YES: Calls the onConfirm (delete) function from the parent */}
                <button 
                    style={{...buttonStyle, backgroundColor: '#dc3545', color: 'white'}} 
                    onClick={onConfirm}>
                    Yes, Delete
                </button>
                
                {/* 2. NO: Calls the onCancel (hide modal) function from the parent */}
                <button 
                    style={{...buttonStyle, backgroundColor: '#6c757d', color: 'white'}} 
                    onClick={onCancel}>
                    No, Cancel
                </button>
            </div>
        </div>
    );
}

export default ConfirmationModal;