import { useState, useEffect } from 'react';


function Image({photo, photos, shuffle}){
    return(
        <img  src={photo.urls.small} alt={photo.description} height={300} onClick={()=>shuffle(photos)}/>
    )
}

export default Image