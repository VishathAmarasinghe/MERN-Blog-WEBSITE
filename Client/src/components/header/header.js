import React from 'react'
import './header.css'
import imageone from './technologyImage.jpg'

export default function Header() {
  return (
    <div className='header'>
        <div className='headerTitles'>
            <span className='headerTitleSm'>Technology</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImg' src={imageone} alt=''></img>
        {/* https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%22' */}
        {/* <video className='headerImg' src='./animationvideo.mp4'></video> */}
    </div>
  )
}
