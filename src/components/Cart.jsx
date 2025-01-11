import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'; 
import { openModal } from '../redux/slices/modalSlice';
import useAuth from '../context/AuthContext';
import { RiBookMarkedLine } from "react-icons/ri";
import { HiChevronRight } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Cart = () => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const { authData, logout } = useAuth();

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {

            const updatedItem = { ...item, quantity: newQuantity };
            dispatch(addToCart(updatedItem));
        }
    };


    const handlePriceCard = (mrp, price) => {

        const sp = Number(mrp);
        const cp = Number(price);
        return sp && cp ? (((sp - cp) / sp) * 100)?.toFixed(2) : null;

    }

    const totalMRP = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.mrp * item.quantity, 0);
    }, [cartItems]);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const mrpDiscount = useMemo(() => {
        const sp = Number(totalMRP);
        const cp = Number(totalPrice);
        const discount = sp && cp ? (sp - cp)?.toFixed(2) : 0;
        return discount % 1 === 0 ? Number(discount)?.toFixed(0) : Number(discount)?.toFixed(2);
    }, [totalMRP, totalPrice]);

    const shippingFee = 79;

    const handleRemoveItem = (item) => {
        setItemToRemove(item);
        setShowConfirmModal(true);
    };

    const confirmRemoveItem = () => {
        dispatch(removeFromCart(itemToRemove));
        setShowConfirmModal(false);
        setItemToRemove(null);
    };

    const cancelRemoveItem = () => {
        setShowConfirmModal(false);
        setItemToRemove(null);
    };

    const handlePlaceOrder = () => {
        if (!authData.isAuthenticated) {
            handleLoginClick();
        }
        return;
    }

    const handleLoginClick = () => {
        // Dispatch openModal action with modalType 'login'
        dispatch(openModal({
            modalType: 'login',
        }));
    };




    return (
        <div className="cart">

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className='flex'>
                    <div className='cartItems basis-[64%] pr-[12px]  border-solid border-0 border-r '>
                        <h1 className='text-[24px] font-[500] mb-[10px] pt-[20px] '>My Cart</h1>
                        <div>
                            {cartItems.map((item) => {
                                let productDiscountPercentage = handlePriceCard(item?.mrp, item?.price)
                                return (
                                    <div className='cart-item-div mb-[8px]'>
                                        <div key={item._id} className="relative cart-item border rounded px-[8px] pt-[12px] pb-[1px] flex flex-wrap">
                                            <div className='cart-item-left absolute'>

                                                {item.images && item?.images[0]?.image ? (
                                                    <img
                                                        src={item.images[0]?.image}
                                                        alt="Book cover"
                                                        className="block h-[148px] w-[110px] bg-cover cursor-pointer"
                                                        onError={() => setImageUrl(null)}
                                                    />
                                                ) : (
                                                    <div className='flex items-center justify-center h-[148px] w-[110px] bg-[#f1f1f1]'>
                                                        {item?.title || "cover image"}
                                                    </div>
                                                )}
                                            </div>
                                            <div className=' cart-item-right pl-[12px] ml-[110px] mb-[20px] min-h-[148px]'>

                                                <div>
                                                    <h3 className='font-semibold flex flex-wrap text-[14px] w-[80%] leading-[16px] mr-[15px] mb-[8px]'>{item.title}</h3>
                                                    <p className='line-clamp-2 text-[12px] leading-[14px]  w-[80%] text-[#282c3f]  mr-[15px]'>{item.description}</p>
                                                    <div className="quantity-control mt-[8px] py-[8px]">

                                                        <select
                                                            id="quantity-value"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                                            class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-[75px] py-[3px] px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary">
                                                            {/* Render options from 1 to 5 */}
                                                            {[1, 2, 3, 4, 5].map((quantity) => (
                                                                <option key={quantity} value={quantity}>
                                                                    {quantity}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                    <div className="font-medium mt-[10px] mx-0 mb-[6px]">
                                                        <span className='product-price'>
                                                            <span className='product-discountedPrice text-[16px] font-bold text-secondary'> ₹{item?.price} </span>
                                                            <span className="product-strike line-through font-normal ml-2 text-[14px]">₹{item?.mrp}</span>
                                                        </span>
                                                        <span className='product-discountPercentage text-primary ml-1.5 text-[12px]'>
                                                            ({productDiscountPercentage}%)
                                                        </span>
                                                    </div>
                                                    <button onClick={() => handleRemoveItem(item)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center z-10 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="loginModal">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Link to={'/wishlist'} className=' border  rounded flex items-center justify-between p-4 mt-6'>
                            <span className='flex items-center justify-start gap-2 capitalize'>
                                <RiBookMarkedLine />
                                <span className='hover:underline font-semibold' > add more from wishlist </span>
                            </span>
                            <HiChevronRight size={24} /> </Link>
                    </div>
                    <div className='totalBox basis-[36%] pl-[12px] block'>
                        <div className='text-[14px]  '>

                            <h3 className='uppercase mt-[24px] mb-[16px] mx-0 font-[700]'>price details {`(${cartItems.length} items)`}</h3>
                            <div className='flex flex-col w-full mb-[12px]'>
                                <span className='flex items-center justify-between w-full'>
                                    <span>Total MRP</span>
                                    <span className=' text-[#282c3f] font-[roboto]'> {`₹${totalMRP.toLocaleString('en-IN')}`} </span>
                                </span>
                                <span className='flex items-center justify-between w-full text-secondary'>
                                    <span>Discount on MRP</span>
                                    <span className='text-secondary font-[roboto]'> {`-₹${mrpDiscount.toLocaleString('en-IN')}`} </span>
                                </span>
                                <span className='flex items-center justify-between w-full'>
                                    <span>Shipping Fee</span>
                                    <span className=' text-[#282c3f] font-[roboto]'> {`₹${shippingFee.toLocaleString('en-IN')}`} </span>
                                </span>
                            </div>
                        </div>

                        <div className='border-solid border-0 border-t border-[#eaeaec] pt-[16px] mb-[16px]'>
                            <span className='flex items-center justify-between w-full capitalize font-[700]'>
                                <span className="">Total amount</span>
                                <span className='font-[roboto]'> {`₹${(totalPrice + shippingFee).toLocaleString('en-IN')}`} </span>
                            </span>
                        </div>
                        <button className='btn-primary rounded font-bold text-[14px] w-full py-[10px] px-[16px] text-white cursor-pointer bg-primary tracking-[1px]'
                            onClick={() => handlePlaceOrder()}
                        >
                            <div class="text-[14px]">PLACE ORDER</div>
                        </button>
                    </div>
                </div>
            )}

            {showConfirmModal && (

                <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div class="fixed inset-0 bg-gray-700/55 transition-opacity" aria-hidden="true"></div>

                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                            <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 class="text-base font-semibold text-gray-900" id="modal-title"> Confirm Removal </h3>
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">Are you sure you want to remove this item from your cart?. This action cannot be undone.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={confirmRemoveItem} >Confirm</button>
                                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={cancelRemoveItem}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

