import React from 'react';
import {Link} from 'gatsby';

const SearchPost = () => {

    return (
        <div className="frame_header_serch-icon">
            <div className="header_serch-icon_space-left"></div>
            <div className="header_serch-icon">
                <Link to='/search' className="header_serch-icon_for-center">
                    <i className="fas fa-search"></i>
                <span>Search</span>

                </Link>

            </div>
        </div>
    );
};

export default SearchPost;