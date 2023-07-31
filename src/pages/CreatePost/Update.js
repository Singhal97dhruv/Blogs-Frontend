import React, { useEffect,useContext, useState } from 'react'
import styles from "./update.module.css"
import { TextField } from '@mui/material'
import {useNavigate,useParams} from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  createdDate: new Date(),
}


const Update = () => {

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');

  const {account}= useContext(DataContext);
  const navigate = useNavigate();
  const url=post.picture?post.picture:"https://www.delhicourses.in/blog/wp-content/uploads/2017/06/blog.jpg"
  const {id}=useParams();
  useEffect(()=>{
    const fetchData=async()=>{
      try{

        let res=await API.getPostById({id});
        if(res.isSuccess){
          setPost(res.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])

  useEffect(() => {
    const getImage = async() => {
      
        if(file){
          console.log(file)
          const data= new FormData();
          data.append("name",file.name);
          data.append("file",file);
          // for (const entry of data.entries()) {
          //   console.log(entry);
          // }
        
          try{
            console.log("this is",data);
          //API Call
          const config={
            headers:{
              "Content-Type":"multipart/form-data"
            },
          };
         const response= await API.uploadFile(data);
         console.log("yoho")
          post.picture=response.data
        }catch(error){
          console.log('Error during file upload:',error);
        }
      }

    }
    getImage();
    post.username=account.username;
  },[file])

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const updateBlogPost=async()=>{
    try{
    let res= await API.updatePost({id,...post});
    navigate(`/details/${id}`);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={styles.createContainer}>
      {/* <div className={styles.img}> */}
        <img src={url} alt="" />
      {/* </div> */}
      <div className={styles.contentContainer}>
        <h1>Update Your Blog!!</h1>

        <div className={styles.content}>
        <div className={styles.file}>
          <label htmlFor="fileInput">

          <AddCircleIcon />
          </label>
          <input type="file" id='fileInput'
          
          onChange={(e)=>setFile(e.target.files[0])}
           />
           <p>Wanna Change Picture</p>
        </div>
          {/* </AddIcon> */}
          <TextField className={styles.field} value={post.title} id="filled-basic" color="success" label="Title" variant="filled" name='title' onChange={(e) => handleChange(e)} />

          <textarea className={styles.textarea} value={post.description} name="description" id="" cols="30" onChange={(e) => handleChange(e)} rows="10" placeholder='Share Your Thoughts!!!'></textarea>

          <button className={styles.btn} onClick={()=>updateBlogPost()}>Publish</button>
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis atque repellendus nostrum odio sunt ab hic sit doloribus consectetur debitis error enim dolorum unde eum ipsam aliquid harum repudiandae obcaecati, placeat dolore natus quam minima odit accusamus. Dolores earum saepe repudiandae autem vitae, enim cupiditate doloribus distinctio temporibus quas dolore, quam ipsa fuga nulla! Eius fugit inventore maxime voluptatibus quisquam hic ut esse reprehenderit odio. Voluptatum ipsa fugiat soluta tempora totam delectus culpa, harum optio amet vitae consequuntur id hic explicabo illum sunt velit repellat quisquam possimus natus maiores. Sint nemo praesentium ex ut repellat, reiciendis dolorem in perferendis! Animi quaerat, quisquam id repellat hic provident possimus harum ratione nesciunt explicabo beatae similique fugiat tempora accusamus quam eveniet, nam corrupti, distinctio voluptatem deserunt unde nisi perferendis tenetur. Recusandae quo minima illum ullam rerum et quidem magnam enim quam, ea nemo facere, officia aut distinctio reiciendis qui, optio inventore debitis odio labore! Placeat quo, doloribus, libero illo illum iure natus necessitatibus, vitae rerum architecto et accusamus at reprehenderit eveniet repellat voluptas perferendis earum facilis? Corrupti, reprehenderit doloribus delectus quidem tenetur numquam iure illo voluptatum distinctio maiores inventore porro ab ea sed alias quo obcaecati, officiis excepturi dolorem, sunt laboriosam itaque asperiores voluptas cum! Culpa placeat consequuntur laborum molestiae architecto sit quasi a voluptates atque expedita animi praesentium illo, ipsum provident hic esse maiores ea necessitatibus odio nesciunt, quisquam soluta aliquid reprehenderit. Quos dolor fugit est optio, dolores explicabo nostrum, quisquam esse culpa, eius ab mollitia minima saepe qui nisi corrupti voluptates! Quia nobis impedit sequi quidem distinctio expedita eos repellendus voluptatum omnis, numquam voluptas asperiores delectus facere itaque laudantium error, molestiae eum aliquid labore vero cumque provident quis sed mollitia. In praesentium totam doloremque fugit accusantium nostrum illum eum officia distinctio. Sed alias facere nam dolorem vitae amet ad numquam labore.</p>
      </div>
    </div>
  )
}

export default Update
