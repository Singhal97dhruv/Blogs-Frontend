import React, { useEffect, useState, useContext } from 'react'
import { Vortex } from 'react-loader-spinner'

import { Link, useParams, useNavigate } from 'react-router-dom'
import { API } from '../../service/api';
import { Box, Typography, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../../context/DataProvider';
import "./Loader.css"
import Comments from './Comments';
const Container = styled(Box)`
    width: 100%;
    padding: 2% 1%;
    background: #0abde3;
    margin-top: 5rem;
`
const ImageBox = styled(Box)`
    ${'' /* width: 90%;
    height: '100vh',
    objectFit: 'cover',
    marginLeft: '', */}
    ${'' /* // borderRadius: '20px', */}
    ${'' /* // marginLeft: 'auto', */}
    ${'' /* // marginRight: 'auto', */}
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -5%;
`
const Image=styled('img')({
    width: '100%'
})

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 10px 0 10px 0;
    border-bottom: 2px solid #192a56;

`
const Edit = styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px
`
const Delete = styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    fontSize: 20px;
    border-radius: 10px
`

const Author = styled(Box)`
    color: #1e272e;
    ${'' /* margin: 200px 0; */}
    ${'' /* paddin-left: 20px; */}
    ${'' /* background: #192a56; */}
    padding: .6rem;
    margin: 0;

    ${'' /* display: flex; */}
`

const Description = styled(Typography)`
    padding: 20px;

`

const Detail = () => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const url = post.picture ? post.picture : 'https://w0.peakpx.com/wallpaper/422/588/HD-wallpaper-funny-newyear19-thumbnail.jpg';

    const { account } = useContext(DataContext);

    useEffect(() => {
        const fetchData = async () => {
            try {

                let res = await API.getPostById({ id });
                if (res.isSuccess) {
                    setPost(res.data);
                    setLoading(false);
                }
            }
            catch {
                setLoading(false);
                console.log("Some error");
            }
        }
        fetchData();
    }, [])

    const deleteBlog = async () => {
        try {
            console.log('Deleting post with ID:', post._id);
            let res = await API.deletePost({ id });
            console.log('Response:', res);
            navigate('/');
        } catch (err) {
            console.log('Error:', err);
        }
    }

    return (

        <>
            {loading? <div className='loader'> <Vortex
                    visible={true}
                    height="150"
                    width="150"
                    ariaLabel="vortex-loading"
                    className='vortex'
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
                </div>
                :
            <Container>
               
                <Heading>{post.title}</Heading>
                <ImageBox>
                    <Image src={url} alt="" />
                    {/* <img src={url} alt="" /> */}
                </ImageBox>
                <Box style={{ float: 'right' }}>
                    {
                        account.username === post.username &&
                        <>
                            <Link to={`/update/${post._id}`}>
                                <Edit color='primary' fontSize='large' />

                            </Link>

                            <Delete color='error' onClick={() => deleteBlog()} fontSize='large' />

                        </>
                    }
                </Box>
                <Author>
                    <Typography style={{ paddingLeft: '10px', fontWeight: '600' }}>Author: <Box component="span" style={{ fontWeight: 600 }}>{post.username}</Box></Typography>
                    <Typography style={{ marginLeft: '10px', fontWeight: '600' }}>{new Date(post.createdDate).toDateString()}</Typography>
                </Author>

                <Description>{post.description}</Description>
                    <Comments post={post} />
            </Container>
            }
        </>
    )
}

export default Detail
