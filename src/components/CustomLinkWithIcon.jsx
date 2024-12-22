import React from 'react';
import { Link } from 'react-router-dom';

const CustomLinkWithIcon = ({icon, url, target = '_self', linkText }) => {
    return (
        <div className="custom-item flex">
            <div className="custom-link flex items-center justify-start gap-2 text-[12px] hover:text-secondary">
                {icon}
                <Link to={url} target={target} > {linkText} </Link>
            </div>
        </div>
    )
}

export default CustomLinkWithIcon