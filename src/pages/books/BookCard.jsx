import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { FiShoppingBag, FiCheckCircle } from "react-icons/fi";
import useAuth from '../../context/AuthContext';
import userServices from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHeart } from "react-icons/hi";
import { addToWishlist } from '../../redux/slices/wishlistSlice';
import { openModal } from '../../redux/slices/modalSlice';

const BookCard = ({ book, bookInCart = false, inWishList = false }) => {
    const { authData } = useAuth();
    const user = authData?.user;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle image URL state
    const [imageUrl, setImageUrl] = useState(book?.images[0]?.image || null);

    const [isAdded, setIsAdded] = useState(bookInCart);
    const [isAdding, setIsAdding] = useState(false);

    // Memoized discount calculation to avoid unnecessary recalculations
    const productDiscountPercentage = useMemo(() => {
        const sp = Number(book?.mrp);
        const cp = Number(book?.price);
        return sp && cp ? (((sp - cp) / sp) * 100)?.toFixed(2) : null;
    }, [book?.mrp, book?.price]);

    // Update imageUrl if book prop changes
    useEffect(() => {
        setImageUrl(book?.images[0]?.image || null);
    }, [book]);


    const handleAddToCart = async (product) => {
        setIsAdding(true);

        if (user) {
            try {
                const res = await userServices.addToCart({ product_id: product._id, quantity: 1 });
                if (res.status) {
                    const productWithQuantity = { ...product, quantity: 1 };
                    dispatch(addToCart(productWithQuantity));
                    setIsAdded(true);

                    // const updatedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                    // updatedCartItems.push(productWithQuantity);
                    // localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                }
            } catch (error) {
                console.error('Failed to add to cart:', error);
            }

        } else {
            const productWithQuantity = { ...product, quantity: 1 };


            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Get cart items from localStorage

            const existingItem = cartItems.find(item => item._id === productWithQuantity._id);

            if (existingItem) {
                // Update quantity of the existing item
                existingItem.quantity = productWithQuantity.quantity;
            } else {
                // Add new item if it doesn't exist
                cartItems.push(productWithQuantity);
            }
            // Save updated cart to localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            // Dispatch to Redux store
            dispatch(addToCart(productWithQuantity));
            setIsAdded(true);

        }

        setIsAdding(false);
    }

    const HandleNavigateToCart = () => {
        navigate('/cart');
    };

    const handleAddToWishList = async (book) => {
        try {
            if (!user) {
                handleLoginClick()
                return;
            }
            const res = await userServices.addToWishList(book?._id);
            if (res.status) {
                console.log(res)
                dispatch(addToWishlist(book));
            }
        } catch (error) {
            console.error('error adding to wishlist:', error)
        }
    };

    const handleLoginClick = () => {
        // Dispatch openModal action with modalType 'login'
        dispatch(openModal({
            modalType: 'login',
        }));
    };
    


    return (
        <div className="transition-shadow hover:shadow-[0_2px_16px_4px_rgba(40,44,63,.07)] hover:scale-[1.01] duration-200 w-[180px] md:w-[210px]  box-border mx-[10px] mt-0 mb-[30px]">
            <div className="flex sm:flex-row sm:items-center sm:h-76 sm:justify-center md:flex-col">
                <div className="sm:h-72 w-full sm:flex-shrink-0 relative">
                    <a href="/">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Book cover"
                                className="w-full h-full bg-cover cursor-pointer"
                                onError={() => setImageUrl(null)}  // Set to null if image fails to load
                            />
                        ) : (
                            <div className='flex items-center justify-center bg-[#f1f1f1] h-full'>
                                {book?.title || "cover image"}
                            </div>
                        )}
                    </a>
                    <span onClick={() => handleAddToWishList(book)} className={`cursor-pointer rounded p-2 absolute top-2 right-2 ${inWishList ? 'bg-[#ff3f6c]' : 'bg-white'} `}> <HiOutlineHeart className={`${inWishList ? 'text-white' : ''} `} /> </span>
                </div>

                <div className='mt-3 w-full px-[10px]'>
                    <a href="#">
                        <h3 className="font-bold leading-[16px] capitalize text-[14px] h-[32px] hover:text-secondary mb-[6px] line-clamp-2">
                            {book?.title || 'book title'}
                        </h3>
                    </a>
                    <h3 className='text-lightFont text-[14px] truncate'>
                        by {book?.author?.map((a, i) => a?.name).join(", ") || 'author'}
                    </h3>
                    <div className="font-medium mt-[10px] mx-0 mb-[6px]">
                        <span className='product-price'>
                            <span className='product-discountedPrice text-[16px] font-bold'> ₹{book?.price} </span>
                            <span className="product-strike line-through font-normal ml-2 text-[14px]">₹{book?.mrp}</span>
                        </span>
                        <span className='product-discountPercentage text-primary ml-1.5 text-[12px]'>
                            ({productDiscountPercentage}%)
                        </span>
                    </div>
                    {/* <button className="text-[12px] btn-secondary text-white w-full uppercase px-4 py-2 mb-4 flex justify-center items-center gap-1"
                        onClick={() => handleAddToCart(book)}
                        style={{ fontSize: '14px', padding: '6px' }}>
                        <FiShoppingBag size={16} />
                        <span>{isAdded ? 'Go to Cart' : 'Add to Cart'}</span>
                    </button> */}
                    {isAdded ? (
                        <button
                            className="btn-primary bg-primary text-white w-full uppercase px-4 py-2 mb-4 flex justify-center items-center gap-1"
                            onClick={HandleNavigateToCart}
                            style={{ fontSize: "14px", padding: "6px", }}
                        >
                            <FiCheckCircle size={16} />
                            <span>Go to Cart</span>
                        </button>
                    ) : (
                        isAdding ? <button
                            className="btn-secondary bg-gray-500 text-white w-full uppercase px-4 py-2 mb-4 flex justify-center items-center gap-1"
                            disabled
                        >
                            <span>Adding...</span>
                        </button> : <button className="text-[12px] btn-secondary text-white w-full uppercase px-4 py-2 mb-4 flex justify-center items-center gap-1"
                            onClick={() => handleAddToCart(book)}
                            style={{ fontSize: '14px', padding: '6px' }}>
                            <FiShoppingBag size={16} />
                            <span>Add to Cart</span>
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
}

export default BookCard;
