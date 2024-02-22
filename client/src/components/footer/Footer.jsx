import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
                <div className='footerContainer'>
                    <p>copyright &copy; 2023 - App FullStack - Developed by Dilan Gerber. All rights reserved.</p>
                    <p>This app uses data provided by RAWG VideoGames API.</p>
                    
                    <Link to={'https://clubaindependiente.com.ar/'} target="_blank">
                        <img className='img1' src="https://imgs.search.brave.com/IgX9_wXgeDo05kR8Z-Z4vNixhO82oaQq1fGfGqrmsRQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbi1pY29ucy5j/b20vaWNvbnMyLzEw/OTkvUE5HLzUxMi8x/NDg1NDgyMTk5LWxp/bmtlZGluXzc4NjY3/LnBuZw" alt="Linkedin" />
                    </Link>

                    <Link to={'https://github.com/dilangerber'} target="_blank">
                        <img  className='img2' src="https://github.com/fluidicon.png" alt="Git hub" />
                    </Link>

                    <Link to={'https://rawg.io/'} target="_blank">
                        <img className='img3' src="https://imgs.search.brave.com/ulFA5Ct-9ugPBIvJPY2FK7KYRaUugKLzPvQ_uPQrcPM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSpCcE45UUFR/VG44OTJCZUp2S3E3/Rk1RLnBuZw" alt="Rawg" />
                    </Link>
                </div>
        </footer>
    )
}

export default Footer