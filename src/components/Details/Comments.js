import React, { useEffect } from 'react'
import { Box, TextareaAutosize,Button, styled } from '@mui/material'
import { useState,useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
const Container= styled(Box)`
    margin-top: 100px;
    display: flex;
`;
const Image=styled('img')({
    width: 50,
    height: 50,
    borderRadius: 50,
    objectFit: 'cover',
    marginTop: '0px',
})
const StyledTextArea= styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
    border-radius: 10px;
    background: #95a5a6;
    font-size: larger;
    padding: 10px;
    color: #2C3A47;

`
const initialValues={
    name:'',
    postId:'',
    comment:'',
    date:new Date()
}

const Comments = ({post}) => {

    const url='https://cdn-images-1.medium.com/max/800/1*l2AFc33U7grIeMML0a0unQ.jpeg    '
    const {id}=useParams();
    const [comment,setComment]=useState(initialValues);
    const {account}=useContext(DataContext);
    const [comments,setComments]=useState([]);
    const [toggle,setToggle]= useState(false);
    // const handleChange=(e)=>{
    //     setComment({
    //         ...comment,
    //         name: account.username,
    //         postId: post._id,
    //         comment: e.target.value,
    //     })
    // }
    const handleChange = (e) => {
        setComment((prevComment) => ({
          ...prevComment,
          name: account.username,
          postId: post._id,
          comment: e.target.value,
        }));
        console.log(comment);
      };

    useEffect(()=>{
        const getData=async()=>{
           try{

               const res=await API.getAllComments({id});
               if(res.isSuccess){
                   setComments(res.data);
                }
            }
            catch(err){
                console.log("Some error",err);
            }
        }
        getData();
    },[post,toggle])

    const addComment=async(e)=>{
       try{

           let res=await API.newComment(comment);
           if(res.isSuccess){
               setComment(initialValues);
            }
            setToggle(prev=>!prev);
        }
        catch{
            console.log("error");
        }
    }

  return (

    <Box>
        <Container>
            <Image src={url} alt="Dp" />
            <StyledTextArea minRows={5} placeholder="What's on your mind" value={comment.comment} onChange={(e)=>handleChange(e)} />
            <Button 
            variant="contained"
             color='error'
              size="medium"
               style={{height: 40}}
                onClick={(e)=>addComment(e)}
                >Post</Button>
        </Container>
        <Box>

        </Box>
        {
            comments && comments.length>0 && comments.map((comment)=>(
                
                <Comment key={comment._id} comment={comment} setToggle={setToggle}/>
            ))
        }
    </Box>
  )
}

export default Comments
