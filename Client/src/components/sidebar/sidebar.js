import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './sidebar.css'
import manimage from './man2.jpg';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats,setcat]=useState([]);

    useEffect(()=>{
        const getcats=async()=>{
            const response=await axios.get("/categories");
            setcat(response.data);
        }
        getcats();
    },[])
  return (
    <div className='sidebar'>
        <div className='sidebarItem'>
            <span className='sidebarTitle'>ABOUT BLOG</span>
            <br></br>
            <img src={manimage} className="manImage" alt='manimage'></img>
            <p>
            Hello world!!  I'm abc perera the owner of the Technology blog. looking forward to improving the technology literacy of people by using this blog app  
            </p>
        </div>
        <div className='sidebarItem'>
            <span className='sidebarTitle'>CATOGORIES</span>
            <ul className='sidebarList'>
                {
                    cats.map((c)=>{
                        return <Link className='link' to={`/?cat=${c.name}`}> <li className='sidebarListItem' key={c._id}>{c.name}</li> </Link>
                        
                    })
                }
                
            </ul>
        </div>
        <div className='sidebarItem'>
            <span className='sidebarTitle'>FOLLOW US</span>
            <div className='sidebarSocial'>
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i className="sidebarIcon fa-brands fa-pinterest"></i>
                <i className="sidebarIcon fa-brands fa-instagram"></i>
            </div>
        </div>
    </div>
  )
}
