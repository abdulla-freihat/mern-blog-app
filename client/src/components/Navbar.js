import React from 'react'
import { Link  , useLocation} from 'react-router-dom';
import { Button, Navbar as FlowbiteNavbar, TextInput } from "flowbite-react";   //FlowbiteNavbar is an alias name  it should be Navbar 
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon } from "react-icons/fa";
const Navbar = () => {

    const path = useLocation().pathname;
  return (

    <FlowbiteNavbar className='border-b-2 w-full'>
    <Link to='/' className='font-semibold text-lg  md:text-xl'>Abdulla Blog</Link> 

    <form>

          <TextInput  type='text' placeholder='Search...'  rightIcon={AiOutlineSearch} className='hidden lg:inline '/>

    </form>
    <Button className='w-12 h-10  lg:hidden ' color="gray" pill>
        <AiOutlineSearch />
    </Button>

    <div className='flex gap-2 md:order-2 '>

     <Button  color='gray ' className='w-12 h-10 hidden border  sm:inline' pill>
        <FaMoon />
     </Button>

      <Link to='/sign-in'>
        <Button className='border' gradientDuoTone='purpleToBlue' pill outline>Sign In</Button>
      </Link>

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