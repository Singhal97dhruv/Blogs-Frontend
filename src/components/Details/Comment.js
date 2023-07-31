import React, { useContext } from 'react'
import { Box, Typography, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Component= styled(Box)`
  background: #F5F5F5;
  border-radius: 5px;
  margin: 20px;
  padding: 10px;
`

const CommDetails=styled(Box)`
  display: flex;
  margin-bottom: 10px;
`
const Name= styled(Typography)`
  font-weight: 600;
  margin-right: 20px;
`
const Delete= styled(DeleteIcon)`
  margin-left: auto;
  cursor: pointer;
`
const Comment = ({ comment ,setToggle }) => {
  const id=comment._id;

  const {account}=useContext(DataContext);

  const removeItem=async()=>{
    try{

      let res=await API.deleteComment({id});
      if(res.isSuccess){
        setToggle(prevState=>!prevState);
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Component>

      <CommDetails>

        <Name>
          {comment.name}
        </Name>
        <Typography>
          {new Date(comment.date).toDateString()}
        </Typography>
        {account.username===comment.name && <Delete onClick={()=>removeItem()}/>}
      </CommDetails>
      <Box>
        <Typography style={{ color: 'black' }}>
          {comment.comment}
        </Typography>
      </Box>

    </Component>
  )
}

export default Comment
