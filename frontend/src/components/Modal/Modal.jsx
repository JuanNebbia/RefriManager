import React from 'react'
import './Modal.css'
import { IoCloseSharp } from "react-icons/io5";


const Modal = ({ setOpenModal, content }) => {

    const closeModal = (event) => {
        if(event.target.classList.contains('close')){
            setOpenModal(false)
        }
    }

    return (
    <div onClick={closeModal} className='modal-container close'>
        <div className="modal-inner">
            <button className="close-modal-btn close">
                <IoCloseSharp className='close' />
            </button>
            {content}
        </div>
    </div>
    )
}

export default Modal  