import React, {useEffect, useState} from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'


  const Recommended = ({categoryId}) => {

  const [apiData1, setApiData1] = useState([]);

  const fetchData = async() => {

    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
    await fetch(relatedVideo_url).then(res=> res.json()).then(data=>setApiData1(data.items));

  }

  useEffect(()=>{
    fetchData();
  },[categoryId])

  return (
    <div className='recommended'>
      {apiData1.map((item, index)=> {
        return(<div key={index}>
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`}  className="side-video-list">
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="vid-info">
          <h4>{item.snippet.title}</h4>
          <p>{item.snippet.channelTitle}</p>
          <p>{value_converter(item.statistics.viewCount)} Views</p>
        </div>
      </Link>
      </div>
      )
      })}
      
    </div>
  )
}

export default Recommended
