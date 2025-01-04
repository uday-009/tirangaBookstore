import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';
import Login from './Login';

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector(state => state.customModal);

  useEffect(() => {
    // Close modal if clicked outside of the modal area
    const handleOutsideClick = (e) => {
      if(modalType === 'login') return;
      if (e.target.classList.contains('modal-overlay')) {
        dispatch(closeModal());
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white rounded-lg shadow-lg relative p-4 w-full max-w-lg max-h-full">

        {modalType === 'login' && (

          <div className="relative bg-white rounded-lg dark:bg-gray-700">
            {/* <button type="button"  onClick={() => dispatch(closeModal())} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center z-10 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="loginModal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                  </button> */}
            <div className="relative w-full max-w-lg max-h-full">
              <div className="relative bg-white rounded-lg dark:bg-gray-700">
                <Login />
              </div>
            </div>
          </div>

        )}

        {modalType === 'signup' && (
          <div>
            <h2 className="text-2xl font-semibold">Sign Up</h2>

          </div>
        )}

        {modalType === 'alert' && (
          <div>
            <h2 className="text-2xl font-semibold">Alert</h2>
            <p>{modalProps.message}</p>
          </div>
        )}

        <button type="button" onClick={() => dispatch(closeModal())} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center z-10 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="loginModal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
