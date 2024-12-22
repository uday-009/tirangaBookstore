import React, { useState } from 'react'
import userServices from '../../api/user';
import BookCard from './BookCard';

const GetHome = () => {
    const [home, setHome] = useState([]);
    const [books, setBooks] = useState([]);

    const fetchHome = async () => {
        try {
            const res = await userServices.getHome();
            if (res.status) {
                setHome(res.data);
            }
        } catch (error) {
            console.error('home fetch error', error);
        }
    }

    useState(() => {
        fetchHome()
    }, [])

    const BookSection = ({ section }) => {
        return (
            <div className="book-section mb-8">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <div className="books-container flex flex-wrap gap-1">
                    {section.data.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* <div className="heading">AllProducts</div> */}


            {/* Render each book section */}
            {home && home.map((hSection, index) => (
                <BookSection key={index} section={hSection} />
            ))}
        </div>
    )
}

export default GetHome