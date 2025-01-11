import React, { useEffect } from 'react'
import useAuth from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';

const Wishlist = () => {

    const dispatch = useDispatch();
    const { authData } = useAuth();
    const user = authData?.user;
    const wishlistItems = useSelector(state => state.wishlist);

    useEffect(() => {
        if (!authData.isAuthenticated) {
            // handleLoginClick();
        }
        return;
    }, [])

    const handleLoginClick = () => {
        // Dispatch openModal action with modalType 'login'
        dispatch(openModal({
            modalType: 'login',
        }));
    };
    return (
        <div className='h-full'>
            {!user ? <div className='h-[calc(100vh-200px)] w-[100%] '>
                <div className='flex items-center justify-center flex-col w-full h-full '>
                    <span className='uppercase text-[18px] font-[700]'>please login </span>
                    <span className='capitalize text-gray-400 mt-[20px]'>login to view items in your wishlist</span>
                    <button role='button'
                    onClick={handleLoginClick}
                    className='border border-2 rounded border-secondary text-secondary uppercase font-[800] text-[18px]  bg-transparent  text-[#000] py-[14.5px] px-[51px] mt-[20px]'>login</button>
                </div>
            </div> : (<div>wishlist </div>)}
        </div>
    )
}

export default Wishlist


