import React, { useEffect, useState } from 'react';
import BookCard from './books/BookCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import userServices from '../api/user';
import { useParams } from 'react-router-dom';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const wishlistItems = useSelector(state => state.wishlist);

    const { slugAndId } = useParams();
    const [slug, id] = slugAndId.split('-');
    console.log(slugAndId, slug, id)

    const categories = useSelector((state) => state.categories.data);

    const category = categories.find((category) => category._id === id);

    const subcategories = category ? category.subcategories : [];


    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [availability, setAvailability] = useState(false); // Out-of-stock filter
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedPublishers, setSelectedPublishers] = useState([]);
    const [sortOption, setSortOption] = useState('relevant');

    const fetchProducts = async (categoryId = null) => {
        try {
            const res = await userServices.getProductsByCategoryId(categoryId);
            if (res.status) {
                setBooks(res.data);
                extractFilters(res.data);
            } else {
                console.error('Error:', res);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const extractFilters = (products) => {
        const authorSet = new Set();
        const publisherSet = new Set();

        products.forEach((product) => {
            product.author.forEach((author) => authorSet.add(author.name));
            publisherSet.add(product.publisher);
        });

        setAuthors([...authorSet]);
        setPublishers([...publisherSet]);
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        // Fetch products for this category (assume API supports category filtering)
        fetchProducts(category._id);

       
    };

    const handleAuthorChange = (author) => {
        setSelectedAuthors((prev) =>
            prev.includes(author)
                ? prev.filter((a) => a !== author)
                : [...prev, author]
        );
    };

    const handlePublisherChange = (publisher) => {
        setSelectedPublishers((prev) =>
            prev.includes(publisher)
                ? prev.filter((p) => p !== publisher)
                : [...prev, publisher]
        );
    };

    const sortProducts = (products) => {
        if (sortOption === 'ascending') {
            return [...products].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'descending') {
            return [...products].sort((a, b) => b.price - a.price);
        }
        return products;
    };

    const filteredProducts = books
        .filter((product) =>
            availability ? true : product.stock > 0
        )
        .filter((product) =>
            selectedAuthors.length > 0
                ? product.author.some((a) => selectedAuthors.includes(a.name))
                : true
        )
        .filter((product) =>
            selectedPublishers.length > 0
                ? selectedPublishers.includes(product.publisher)
                : true
        );

    const displayedProducts = sortProducts(filteredProducts);

    useEffect(() => {
        fetchProducts(id);
    }, [id]);

    const isBookInCart = (bookId) => {
        // cartItems.some((item) => {
        //     console.log(`${item._id} === ${bookId}`, item._id === bookId)
        //     return item._id === bookId});


        return cartItems.some((item) => item._id === bookId);
    };

    const isBookInWishList = (bookId) => {
        return wishlistItems.some((item) => item._id === bookId)
    }



    return (
        <div className="flex">
            {/* Sidebar for filters */}
            <div className="w-1/5 p-4 border-r">
                {/* Availability */}
                <h3 className="font-bold mb-4">Availability</h3>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={availability}
                        onChange={() => setAvailability(!availability)}
                        className="mr-2 rounded checked:bg-secondary checked:ring-secondary"
                    />
                    Include Out of Stock
                </label>

                {/* Categories */}
                <h3 className="font-bold mt-6 mb-4">Categories</h3>
                {subcategories.length > 0 ? (
                    <div>
                        {subcategories.map((subcategory) => (
                            <div key={subcategory._id} className="mb-2">
                                <button
                                    onClick={() => handleCategoryClick(subcategory)}
                                    className="text-blue-500 hover:underline"
                                >
                                    {subcategory.title}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No subcategories available</p>
                )}

                {/* Authors */}
                <h3 className="font-bold mt-6 mb-4">Authors</h3>
                {authors.map((author) => (
                    <div key={author} className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedAuthors.includes(author)}
                                onChange={() => handleAuthorChange(author)}
                                className="mr-2  rounded checked:bg-secondary checked:ring-secondary"
                            />
                            {author}
                        </label>
                    </div>
                ))}

                {/* Publishers */}
                <h3 className="font-bold mt-6 mb-4 text">Publishers</h3>
                {publishers.map((publisher) => (
                    <div key={publisher} className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedPublishers.includes(publisher)}
                                onChange={() => handlePublisherChange(publisher)}
                                className="mr-2  rounded checked:bg-secondary checked:ring-secondary"
                            />
                            {publisher}
                        </label>
                    </div>
                ))}
            </div>

            {/* Main content area */}
            <div className="w-4/5 p-4">
                {/* Sort options */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold capitalize"> {slug} </h2>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="relevant">Relevant</option>
                        <option value="ascending">Price: Low to High</option>
                        <option value="descending">Price: High to Low</option>
                    </select>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedProducts.map((b) => (
                        <BookCard key={b.isbn} book={b} bookInCart={isBookInCart(b._id)} inWishList={isBookInWishList(b._id)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
