import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';


const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDownEscape);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDownEscape);
    }

    handleKeyDownEscape = e => {
        if (e.code === 'Escape') {
        this.props.onClose();
        }
    };

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot, 
        )
    }
}

export default Modal;

