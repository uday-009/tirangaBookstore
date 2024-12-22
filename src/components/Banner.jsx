import React from 'react'
import bannerImg from '../assets/banner.png'

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse jusitfy-between items-center py-16 gap-12'>
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={bannerImg} alt="" />
            </div>
            <div className='md:w-1/2 w-full'>
                <h1 className="md:text-5xl text-2xl font-medium mb-7 font-magilio">
                    <span className='text-primary'>
                        New  </span> Books, <span className='text-primary'>
                        Now  </span> Available</h1>
                <p className='mb-10'>
                    Discover the latest titles hitting the shelves this week! From thrilling mysteries
                    to heartwarming tales, explore fresh reads that are sure to captivate every book lover.
                </p>
                <button className='btn-secondary text-white'>Buy now</button>
            </div>

        </div>
    )
}

export default Banner