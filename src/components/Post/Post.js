import React from 'react'
import "./post.css"
import { Table } from '@mui/material'
import { Link } from 'react-router-dom';



const Post = ({ post }) => {

    const url = post.picture ? post.picture : 'https://w0.peakpx.com/wallpaper/422/588/HD-wallpaper-funny-newyear19-thumbnail.jpg';

    const addEllipsis = (str, limit) => {
        return str.length < limit ? str : str.substring(0, limit) + '......';
    }

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
            minute: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>

            <div className="post_container">

                    <div className="cards">
                <Link to={`details/${post._id}`}>

                        <div className="upper_content">
                            <h1 className="lnk title">{post.title}</h1>
                        </div>
                        <div className="content">
                            <img src={url} />
                            <p>
                                {addEllipsis(post.description, 650)}
                            </p>
                        </div>  
                        <div className="lower_content">
                            <time>{formatDate(post.createdDate)}</time>
                            <h3>{post.username}</h3>
                        </div>
                </Link>
                    </div>

            </div>
        </>
    )
}

export default Post
