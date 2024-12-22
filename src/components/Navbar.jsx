import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { DiAndroid } from "react-icons/di";
import { SiApple } from "react-icons/si";
import Login from './Login';
import userServices from '../api/user';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [categories, setCategories] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const cartItems = useSelector(state => state?.cart?.cartItems)
    console.log(cartItems, 'cartItems')
    const navbarRef = useRef(null);
    const backToTopButtonRef = useRef(null);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const showLoginModal = () => {
        setLoginPopup(true)
    }

    const fetchCategories = async () => {
        try {
            const res = await userServices.getCategories();
            if (res.status) {
                setCategories(res.data);
            } else {
                toast.error('error occurred');
                console.error(res, 'error')
            }

        } catch (error) {
            toast.error('error occurred');
            console.error('error: ', error)
        }
    }


    useEffect(() => {
        fetchCategories();
        const navbar = navbarRef.current;
        const backToTopButton = backToTopButtonRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        setIsSticky(true);
                        setShowBackToTop(true);
                    } else {
                        setIsSticky(false);
                        setShowBackToTop(false);
                    }
                });
            },
            {
                rootMargin: '0px 0px -100% 0px',
            }
        );

        if (navbar) {
            observer.observe(navbar);
        }

        return () => {
            if (navbar) {
                observer.disconnect();
            }
        };
    }, []);

    const handleBackToTopClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    const handleMouseEnter = (index) => {
        setOpenDropdown(index);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };


    const cat = [
        {
            "_id": "67625c85797fdee7e162f5cf",
            "title": "Biography",
            "description": "Biography related books",
            "parent": null,
            "createdAt": "2024-12-18T05:24:21.611Z",
            "updatedAt": "2024-12-18T05:24:21.611Z",
            "__v": 0,
            "subcategories": []
        },
        {
            "_id": "67625c85797fdee7e162f5cf",
            "title": "Poetry",
            "description": "Poetry related books",
            "parent": null,
            "createdAt": "2024-12-18T05:24:21.611Z",
            "updatedAt": "2024-12-18T05:24:21.611Z",
            "__v": 0,
            "subcategories": []
        },
        {
            "_id": "67625c85797fdee7e162f5cf",
            "title": "Fiction",
            "description": "Fiction related books",
            "parent": null,
            "createdAt": "2024-12-18T05:24:21.611Z",
            "updatedAt": "2024-12-18T05:24:21.611Z",
            "__v": 0,
            "subcategories": [{
                "_id": "67625c85797fdee7e162f5cf",
                "title": "Biography",
                "description": "Biography related books",
                "parent": null,
                "createdAt": "2024-12-18T05:24:21.611Z",
                "updatedAt": "2024-12-18T05:24:21.611Z",
                "__v": 0,
                "subcategories": []
            },
            {
                "_id": "67625c85797fdee7e162f5cf",
                "title": "Poetry",
                "description": "Poetry related books",
                "parent": null,
                "createdAt": "2024-12-18T05:24:21.611Z",
                "updatedAt": "2024-12-18T05:24:21.611Z",
                "__v": 0,
                "subcategories": []
            },
            {
                "_id": "67625c85797fdee7e162f5cf",
                "title": "Fiction",
                "description": "Fiction related books",
                "parent": null,
                "createdAt": "2024-12-18T05:24:21.611Z",
                "updatedAt": "2024-12-18T05:24:21.611Z",
                "__v": 0,
                "subcategories": []
            },]
        },

    ]

    return (

        <>
            <div className='bg-secondary max-w-screen-2xl mx-auto'>
                <div className='p-2 container md:px-20 text-[#fff] min-w-full'>
                    <div className='flex justify-between'>
                        <div className='text-[11px]'> Express Delivery Available on selected Pin Codes! Shop Now! </div>
                        <div className='flex justify-start items-center'>


                            <HiOutlineDeviceMobile />
                            <span className='text-[11px] px-2'>
                                Download App:
                            </span>

                            <div className='flex items-center text-[#e5fbef]'>
                                <a href="#" className='ps-1 pe-2'> <DiAndroid />  </a>
                                <a href="#" className='ps-1 pe-2'> <SiApple /> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header ref={navbarRef} className={`bg-white dark:bg-gray-900 sticky  max-w-screen-2xl mx-auto z-20 top-0 start-0 end-0 border-0  ${isSticky ? '' : 'shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]'} px-20`}>
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto ">
                    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse h-[80px]">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}

                        <span className="self-center text-2xl font-bold font-magilio tracking-widest whitespace-nowrap dark:text-white">TB House.</span>
                    </Link>
                    {/* <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div> */}
                    <div className='flex items-center justify-end'>
                        {/* left side */}
                        <div>
                            <div>
                                <form className="flex" onSubmit={(e) => {
                                    e.preventDefault()
                                    console.log('search bar')
                                }}>
                                    {/* <select id="pricingType" name="pricingType"
                                        className="w-[100px] h-10  focus:outline-none focus:border-sky-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                                        <option value="All" selected="">All</option>
                                        <option value="Freemium">History</option>
                                        <option value="Free">Thriller</option>
                                        <option value="Paid">comics</option>
                                    </select> */}
                                    <div className="relative hidden md:block">
                                        <input type="text" id="search-navbar" className="block w-[400px] h-[40px] p-2 pe-10 ps-3 text-sm text-[#696e79] border-0 border-gray-300 rounded-lg bg-[#f5f5f6] focus:ring-[#ddd] focus:border-[#ddd] focus:bg-[#fff]" placeholder="Search books..." />
                                        <button className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer" type='submit'>
                                            <IoSearchOutline />
                                            <span className="sr-only">Search icon</span>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* right side */}
                        <div className='flex justify-start items-center ms-2'>
                            <div className="profile group relative flex items-center h-[80px]" role='button' >

                                <div className=' sm:mx-2 md:px-2  flex h-[40px] w-[60px]  flex flex-col justify-center items-center'>
                                    <HiOutlineUser className='size-6' />
                                    <span className='font-bold text-[12px]  leading-[6px] pt-[6px]'>Profile</span>
                                </div>
                                {<div className='absolute hidden group-hover:block '>
                                    <div className="cursorbar w-[75px] h-[4px] bg-primary absolute top-[36px]"></div>
                                    <div className=" user-dropdown  box-content absolute top-[41px] w-[250px] left-[-137px] shadow-[0_1px_10px_rgba(0,0,0,.08)] rounded-[4px] z-[10] bg-white px-[20px] pt-[25px] pb-[15px]">
                                        <div className="actionUserInfo">
                                            <div className="userInfo-tilte font-bold text-[14px]">{"Welcome"}</div> {/* add dynamic user title here*/}
                                            <div className="userInfo-Email text-[14px]">{"To access account and manage orders"}</div> {/* add dynamic user mobile number  here*/}
                                        </div>
                                        <div>
                                            {/* show if user no logged in*/}
                                            <div className="user-access py-4 border-0">
                                                <button data-modal-target="loginModal" data-modal-toggle="loginModal" className='inline-block text-primary border border-1 p-2 hover:border-primary' type='button'>
                                                    LOGIN / SIGNUP
                                                </button>



                                            </div>
                                            <div className="block w-full border-0 border-t-[1px] p-0 py-2">
                                                <Link to={"/orders"} className='inline-block text-dim font-secondary text-[14px]'>
                                                    <div className="block capitalize hover:font-bold">Orders</div>
                                                </Link>
                                                <Link to={"/favourites"} className='block text-dim font-secondary text-[14px]'>
                                                    <div className="block capitalize hover:font-bold">Favourites</div>
                                                </Link>
                                            </div>

                                            {/* saved data */}
                                            <div className="block border-0 border-t-[1px]  p-0 py-2">
                                                <Link to={"/my/addresses"} className='block text-dim font-secondary text-[14px]'>
                                                    <div className="block capitalize hover:font-bold">saved addresses</div>
                                                </Link>
                                                <Link to={"/savedcards"} className='block text-dim font-secondary text-[14px]'>
                                                    <div className="block capitalize hover:font-bold">saved cards</div>
                                                </Link>
                                            </div>

                                            {/* if logged in show logout data */}
                                            <div className="block border-0 border-t-[1px]  p-0 py-2">
                                                <Link to={"/logout"} className='block text-dim font-secondary text-[14px]'>
                                                    <div className="block capitalize hover:font-bold">logout</div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <Link to="/wishlist" className='hidden sm:flex sm:mx-2 md:px-2 flex  h-[40px] flex flex-col justify-center items-center  hover:text-primary'>
                                <HiOutlineHeart className='size-6' />
                                <span className='font-bold text-[12px]  leading-[6px] pt-[6px]'>Favourites</span>
                            </Link>
                            <Link to="/cart"
                                className='relative sm:mx-2  md:px-2  flex w-[40px] h-[40px]  flex flex-col justify-center items-center  hover:text-primary'>
                                <HiOutlineShoppingBag className='size-6' />
                                <span className='font-bold text-[12px]   leading-[6px] pt-[6px]'>Bag</span>
                                <span className='absolute top-0 right-0 bg-[#ff3f6c] text-[#fff] text-[12px] w-[18px] h-[18px] rounded-full flex justify-center items-center '>
                                    {cartItems.length || 0}
                                </span>
                            </Link>

                        </div>
                    </div>




                </div>
            </header>
            {/* categories */}
            <div className='px-2 container md:px-20 text-[#fff] min-w-full border-0 border-t-[1px] border-t-[rgba(0,0,0,.08)] shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]'>
                <div className='flex justify-between'>
                    <div className='flex justify-start items-center'>
                        <ul className='flex items-center text-[#000]'>
                            {categories && categories.map((c, i) => <li id={c?._id} key={c?._id} className='px-2 py-2  mx-2 relative  text-secondary uppercase  font-medium text-[14px]'
                                onMouseEnter={() => handleMouseEnter(i)}
                                // onClick={() => handleMouseEnter(i)}
                                onMouseLeave={handleMouseLeave}
                            >

                                {/* Display the category title */}
                                <div className="flex items-center gap-2  hover:text-primary">
                                    {c.title}
                                    {/* If subcategories exist, display the chevron down */}
                                    {c.subcategories && c.subcategories.length > 0 && (
                                       <HiOutlineChevronDown />
                                    )}
                                </div>
                                {/* If subcategories exist, show dropdown  */}
                                {c.subcategories && c.subcategories.length > 0 && openDropdown === i && (
                                    <div className="sub-m absolute left-0 top-[80%] mt-2 p-0 py-2 bg-white border rounded shadow-md w-40  transition-all duration-1000">
                                        <ul>
                                            {c.subcategories.map((sub, subIndex) => (
                                                <li key={sub._id} className="p-2 capitalize  hover:text-primary">
                                                    {sub.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>)}
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>
            {/* categories end */}
            <div id="loginModal" data-modal-closable={false} tabindex="-1" aria-hidden="true" data-modal-backdrop="static" data-modal-keyboard="false" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-lg max-h-full">
                    <div className="relative bg-white rounded-lg dark:bg-gray-700">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center z-10 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="loginModal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="relative w-full max-w-lg max-h-full">
                            <div className="relative bg-white rounded-lg dark:bg-gray-700">
                                <Login />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                ref={backToTopButtonRef}
                className={`back-to-top  ${showBackToTop ? 'hidden' : 'fixed bottom-14 right-4 z-50 bg-secondary text-[#fff]'}`}
                onClick={handleBackToTopClick}
            >
                <HiChevronUp className='size-18' />
            </button>
        </>

    )
};

export default Navbar;
