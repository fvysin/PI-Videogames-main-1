import React from 'react'
import './Loading.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
    return (
        <div>
            <div className='loaderContainer'>
                <Skeleton baseColor='#cccccc' count={1} width="235px" height="200px"/>
                <Skeleton baseColor='#cccccc' count={1} width="235px" height="40px"/>
                <Skeleton baseColor='#cccccc' count={1} width="235px" height="40px"/>
            </div>
        </div>
    )
}

export default Loading