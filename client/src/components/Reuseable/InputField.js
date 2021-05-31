import React, { useState } from 'react'
import PropTypes from 'prop-types'

const InputField = ({label, saveValue, name, type = 'text', placeholder = '', customClass = '', defaultValue = '', noInput = false, onClick = null, children = null}) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    const handleInput = e => {
        const savedValue = saveValue(e.target.value);
        setInputValue(savedValue ? savedValue : e.target.value);
    }

    const focusOnInput = e => {
        if (e.target.classList.contains('input-field__label')) {
            e.target.nextElementSibling.focus();
        } else if (e.target.classList.contains('input-field')) {
            e.target.children[1].focus();
        }
    }
    
    return (
        <div className={`input-field ${onClick ? 'input-field--clickable' : ''}`} onClick={onClick ? onClick : focusOnInput}>
            <p className="input-field__label">{label}</p>
            {noInput ? null : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    className={`input-field__input ${customClass}`}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInput}
                />
            )}

            {children}
        </div>
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    customClass: PropTypes.string,
    defaultValue: PropTypes.string
}

export default InputField

