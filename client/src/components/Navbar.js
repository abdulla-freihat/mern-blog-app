import React from 'react'
import { Link  , useLocation} from 'react-router-dom';
import { Button, Navbar as FlowbiteNavbar, TextInput , Dropdown , Avatar } from "flowbite-react";   //FlowbiteNavbar is an alias name  it should be Navbar 
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon , FaSun } from "react-icons/fa";
import {useDispatch , useSelector} from "react-redux";
import {toggleTheme} from '../redux/themeSlice'
import { signoutStart , signoutSuccess , signoutFailure } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {


      const {currentUser} = useSelector(state=> state.user) 
      const {theme} = useSelector(state=>state.theme)
      const dispatch = useDispatch();
      const navigate = useNavigate();

    const path = useLocation().pathname;




    const signoutHandler = async()=>{
 
 
      dispatch(signoutStart());
    
      const res = await fetch(`${process.env.REACT_APP_DOMAIN_SERVER_URL}/api/auth/logout`  ,{
   
      credentials: 'include'
      });
   
      const data = await res.json();
      if(data.success === false){
   
        dispatch(signoutFailure(data.message));
           return;
      }
   
      if(data.success === true){
          
        dispatch(signoutSuccess(data));
       
  
              navigate('/sign-in')
       
      
           
   }
  
  }
  return (

    <FlowbiteNavbar className='border-b-2 w-full'>
    <Link to='/' className='font-bold text-lg  md:text-xl  text-transparent bg-clip-text  bg-gradient-to-r to-emerald-600 from-sky-400'>Abdulla Blog</Link> 

    <form>

          <TextInput  type='text' placeholder='Search...'  rightIcon={AiOutlineSearch} className='hidden lg:inline '/>
        

    </form>
    <Button className='w-12 h-10  lg:hidden ' color="gray" pill>
        <AiOutlineSearch />
    </Button>

    <div className='flex gap-2 md:order-2 '>

     <Button  color='gray ' className='w-12 h-10   border  ' pill  onClick={()=>dispatch(toggleTheme())}>
       {theme === 'light' ? <FaSun  />   : <FaMoon /> } 
     </Button>


{currentUser ? 

(
   <Dropdown
      arrowIcon={false}
      inline 
      label={

         <Avatar 

           rounded
           alt = 'user'
           img={currentUser.avatar}
         />
      }
   >


  <Dropdown.Header>

     <span className=' my-1 block text-sm'>@{currentUser.username}</span> 
     <span className=' my-1 block text-sm truncate font-medium'>{currentUser.email}</span>
      
   </Dropdown.Header>

   <Link to='/dashboard?tab=profile'>
    <Dropdown.Item>
        Profile
    </Dropdown.Item>
   </Link>


 <Dropdown.Divider />

{currentUser.isAdmin && 
<>
  <Link to='/dashboard?tab=dash'>
    <Dropdown.Item>
        Dashboard
    </Dropdown.Item>
   </Link>

   <Dropdown.Divider />

   </>

}

 


  
   
    <Dropdown.Item onClick={signoutHandler}>
        Sign Out
    </Dropdown.Item>
   

   </Dropdown>

   

) : (

  <Link to='/sign-in'>
        <Button className='border' gradientDuoTone='purpleToBlue' pill outline>Sign In</Button>
      </Link>   
)}
      

      <FlowbiteNavbar.Toggle />



    </div>
    

    <FlowbiteNavbar.Collapse>

  
           <FlowbiteNavbar.Link active={path === '/'} as={'div'} >
            <Link to='/'>Home</Link>
            </FlowbiteNavbar.Link>

            <FlowbiteNavbar.Link active={path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
            </FlowbiteNavbar.Link>
            
            <FlowbiteNavbar.Link active={path === '/projects'} as={'div'}>
            <Link to='/projects'>Projects</Link>
            </FlowbiteNavbar.Link>
           
      </FlowbiteNavbar.Collapse>

    </FlowbiteNavbar>
  )
}

export default Navbar