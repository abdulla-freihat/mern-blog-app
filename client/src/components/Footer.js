import React from 'react'
import { Link } from 'react-router-dom';
import { Footer as FlowbiteFooter } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <FlowbiteFooter container className='mt-2'>
    <div className="w-full">
      <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
        <div>
        <Link to='/' className='font-bold text-lg  md:text-xl  text-transparent bg-clip-text  bg-gradient-to-r to-emerald-600 from-sky-400'>Abdulla Blog</Link> 

        </div>
        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 mt-5">
          <div>
            <FlowbiteFooter.Title title="about" />
            <FlowbiteFooter.LinkGroup col>
              <FlowbiteFooter.Link href="#">Lorem</FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="#">Lorem</FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
          </div>
          <div>
            <FlowbiteFooter.Title title="Follow us" />
            <FlowbiteFooter.LinkGroup col>
            <FlowbiteFooter.Link href="#">Lorem</FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#">Lorem</FlowbiteFooter.Link>
           </FlowbiteFooter.LinkGroup>
          </div>
          <div>
            <FlowbiteFooter.Title title="Legal" />
            <FlowbiteFooter.LinkGroup col>
            <FlowbiteFooter.Link href="#">Lorem</FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#">Lorem</FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
          </div>
        </div>
      </div>
      <FlowbiteFooter.Divider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <FlowbiteFooter.Copyright href="#" by="abdulla freihat" year={2024} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
          <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
          <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
          <FlowbiteFooter.Icon href="#" icon={BsGithub} />
          <FlowbiteFooter.Icon href="#" icon={BsDribbble} />
        </div>
      </div>
    </div>
  </FlowbiteFooter>
  )
}

export default Footer