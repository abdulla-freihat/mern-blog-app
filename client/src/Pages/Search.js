import { Button, Select, TextInput ,Spinner } from 'flowbite-react'
import React ,{useState , useEffect} from 'react'
import { useLocation ,useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

const Search = () => {

    const [sidebarData , setSidebarData] = useState({

         searchTerm:'',
         sort :'desc',
         category:'uncategorized'
    })

    const [posts , setPosts] = useState([]);
    const [loading ,setLoading] = useState(false);
    const [showMore , setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(()=>{

        const urlParams = new URLSearchParams(location.search);
  
         const searchTermFromUrl = urlParams.get('searchTerm');
  
        const sortfromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');


        if (searchTermFromUrl || sortfromUrl || categoryFromUrl) {
          setSidebarData({
              searchTerm: searchTermFromUrl || '',
              sort: sortfromUrl || 'desc',
              category: categoryFromUrl || 'uncategorized'
          });
      }

         const fetchPosts = async()=>{

              setLoading(true);

              const searchQuery = urlParams.toString();

            
    const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?${searchQuery}`)

       const data = await res.json(); 

       if(data.success===false){

           setLoading(false);
           return;
       }

       if(data.success === true){

            setPosts(data.posts);
            setLoading(false);

            if(data.posts.length === 9){

                 setShowMore(true)
            }else{
                setShowMore(false)
            }
       }



         }

         fetchPosts();
         
  
  } , [location.search])

  const handleChange = (e)=>{

  if(e.target.id === 'searchTerm'){

     setSidebarData({...sidebarData , searchTerm : e.target.value})
  }


  if(e.target.id ==='sort'){

     const order = e.target.value || 'desc';
     setSidebarData({...sidebarData , sort : order})

  }


  if(e.target.id ==='category'){

    const category= e.target.value || 'uncategorized';

    setSidebarData({...sidebarData , category })


  }

        
  }


 const handleSubmit = (e)=>{

    e.preventDefault();

      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', sidebarData.searchTerm);
      urlParams.set('sort', sidebarData.sort);
      urlParams.set('category', sidebarData.category);

      const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);

}



const handleShowMore =async ()=>{

   const numberOfPosts = posts.length;
   const startIndex = numberOfPosts;
   const urlParams = new URLSearchParams(location.search);
   urlParams.set('startIndex' , startIndex);
   const searchQuery = urlParams.toString();

   const res = await fetch (`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/post/all-posts?${searchQuery}`)

    const data = await res.json();

    if(data.success === false){

       return;
    }

    
    if(data.success === true){
     setPosts([...posts , ...data.posts])

     if(data.posts.length===9){
      setShowMore(true)
       
     }else{
       setShowMore(false)
     }
   }




}

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:border-b-0 md:min-h-screen border-gray-500 dark:border-teal-500'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Search Term : </label>
                    <TextInput placeholder='search...'  id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange}/>
                </div>

                <div className='flex items-center gap-2'>
                <label className='font-semibold'>sort : </label>
                <Select id="sort" value={sidebarData.sort}  onChange={handleChange} >
                   <option value='desc'>Latest</option>
                   <option value='asc'>Oldest</option>
                   
                </Select>
                </div>


                <div className='flex items-center gap-2'>
                <label className='font-semibold'>category : </label>
                <Select id="category" value={sidebarData.category}  onChange={handleChange} >
                   <option value='uncategorized'>uncategorized</option>
                   <option value='React.js'>React.js</option>
                   <option value='Next.js'>Next.js</option>
                   <option value='Javascript'>Javascript</option>
                   
                </Select>
                </div>

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Apply filters</Button>
            </form>
        </div>


          <div className='w-full'>

              <h1 className='text-3xl font-semibold sm:border-b border-gray-500  mt-5 p-3'>Posts Results :</h1>
              <div className='p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                { !loading && posts.length === 0 &&(
                       <p className='text-gray-500 text-xl'>No posts found.</p>
                )}

                {loading && (
                    <Spinner  />
                )}

                   
                {!loading && posts && posts.map((post)=>(
                       <PostCard key={post._id} title={post.title} category={post.category} image={post.image} slug={post.slug} />
                       
                ))}


               
              </div>

              {showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>Show More</button>}


          </div>
    </div>
  )
}

export default Search