import React, { useState } from 'react'
import BookCard from './books/BookCard'
import axios from 'axios'

const AllProducts = () => {
    const [books, setBooks] = useState([])

    useState(() => {
        // axios.get('http://tiranga.techworrks.com/products')
        axios.get('https://bookstore.toolsqa.com/BookStore/v1/Books')
            .then(res => {
                setBooks(res.data.books);
            })
        .then(response => setBooks(response.body))
    },[])
    
  return (
    <div>
        <div className="heading">AllProducts</div>
        {
            books && books?.map((b,i) => (
                <div key={b.isbn}>
                    <BookCard book = {b} />
                </div>
            ))
        }
    </div>
  )
}

export default AllProducts