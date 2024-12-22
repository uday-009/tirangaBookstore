import React from 'react'
import { Link } from 'react-router-dom';
import FooterPrimaryLink from './FooterPrimaryLink';
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import CustomLinkWithIcon from './CustomLinkWithIcon';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='footer  max-w-screen-2xl mx-auto'>
            {/* site nav */}
            <div className='min-w-full'>
                <div className='min-w-full'>
                    <div className='flex p-8 container px-20 text-lightFont bg-lightGray min-w-full'>
                        <div className='flex gap-2 flex-1'>

                            {/* logo */}
                            <div className='max-w-[150px]'>
                                {/* <img src="#" alt="logo" /> */}
                                <span className="logo self-center text-2xl font-bold font-magilio tracking-widest whitespace-nowrap dark:text-white"> TB House. </span>
                            </div>

                            {/* summary */}
                            <div className='max-w-[250px]'>
                                <FooterPrimaryLink url={''} titleText={'About Tiranga Book House'} />
                                <div className="summary text-[12px] mt-2">
                                    <span>
                                        Tiranga Book House brings together book lovers of all ages
                                        to explore captivating reads and connect with fellow bibliophiles.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* summary */}
                        <div className='flex items-start justify-start gap-4  flex-1'>
                            <div>
                                <FooterPrimaryLink url={'#'} titleText={'contact us'} />
                                <div className="contact-items mt-2">
                                    <CustomLinkWithIcon icon={<HiOutlinePhone />} url={'tel:+918143465378'} linkText={'+91 8143465378'} />
                                    <CustomLinkWithIcon icon={<HiOutlineMail />} url={'mailto:udaymaroju9@gmail.com'} linkText={'udaymaroju9@gmail.com'} />
                                    <CustomLinkWithIcon icon={<HiOutlineLocationMarker />} url={'https://www.google.com/maps?q=London+Bridge,+London'} linkText={'london bridge'} target='_blank' />
                                </div>
                            </div>
                            <div className=' flex-1'>
                                <FooterPrimaryLink url={'#'} titleText={'contact us'} />
                                <div className="contact-items mt-2">
                                    <CustomLinkWithIcon icon={<HiOutlinePhone />} url={'tel:+918143465378'} linkText={'+91 8143465378'} />
                                    <CustomLinkWithIcon icon={<HiOutlineMail />} url={'mailto:udaymaroju9@gmail.com'} linkText={'udaymaroju9@gmail.com'} />
                                    <CustomLinkWithIcon icon={<HiOutlineLocationMarker />} url={'https://www.google.com/maps?q=London+Bridge,+London'} linkText={'london bridge'} target='_blank' />
                                </div>
                            </div>
                        </div>
                        {/* summary */}
                    </div>
                </div>
            </div>

            {/* end footer */}
            <div className='p-2 container px-20 text-[#fff] bg-secondary min-w-full '>
                {`All Rights Reserved ©  ${year} Tiranga Book House.`}
            </div>
        </div>
    )
}

export default Footer