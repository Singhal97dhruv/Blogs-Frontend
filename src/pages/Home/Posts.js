import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import styles from './posts.module.css';
import { API } from '../../service/api';
import { Vortex } from 'react-loader-spinner'

const Posts = () => {
  const [loading,setLoading]=useState(true);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await API.getAllPosts();
        if (res.isSuccess) {
          setPosts(res.data);
        }
        setLoading(false);
      }
      catch {
        console.log("not found");
      }
      }
      fetchData();
  }, [])

  return (
    <>

    {
      loading?
      <div className='loader'> <Vortex
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
      <div className={styles.post_container}>
      {
        posts && posts.length > 0 ? posts.map(post => (
          <Post post={post}  />
        )) : <div>NO data available</div>
      }
    </div>
    }
    
    </>
  )
}

export default Posts
