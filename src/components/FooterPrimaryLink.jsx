import React from 'react';
import { Link } from 'react-router-dom';

const FooterPrimaryLink = ({url='', titleText}) => {
  return (
    <Link to={url} className='text-primary capitalize'> {titleText}</Link>
  )
}

export default FooterPrimaryLink