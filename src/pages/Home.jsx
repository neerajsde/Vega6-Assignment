import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../features/blogs/blogSlice';
import BlogList from '../components/Home/BlogList';
import Loader from '../components/spinner/Loader';

const Home = () => {
  let { loading, data } = useSelector((state) => state.blogs);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  },[])

  if(loading){
    return (
      <div className='w-full h-[90vh] flex justify-center items-center'><Loader/></div>
    )
  }


  return (
    <div className="w-full py-6">
      <h1 className="text-center text-3xl font-bold mb-6">Blog List</h1>
      <BlogList blogs={data} />
    </div>
  )
}

export default Home