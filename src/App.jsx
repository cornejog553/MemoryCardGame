import { useState, useEffect } from 'react';
import './App.css'

function App() {

  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedImgIds, setClickedImgIds] = useState([]);


    // Setting state for photos array
    const [photos, setPhotos] = useState([]);

    // useEffect to make the API call and retrieve 12 images from unsplash
    useEffect(() => {
      fetch('https://api.unsplash.com/photos/random?client_id=6MVPc9DBKEFO7ehGJspBB5NWvIqsHKOqeyXhwhSHAeo&page=1&query=basketball&count=12')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPhotos(data);
        });
    }, []);

    // useEffect so that high score is able to be displayed accurately with current score
    useEffect(()=>{
      if(currentScore > highScore){
        setHighScore(currentScore)
      }
    }, [currentScore, highScore])


    // function that runs when clicking an image. Checks to see if image id is part of clicked image array
    const imgClicked = (id) => {
      if(clickedImgIds.find((photoId) => photoId === id)){
        console.log("Game OVer");
        setCurrentScore(0)

        // Function that will shuffle the photos. To be used with on click of each image
        for (let i = photos.length; --i;)  {
          let j = Math.floor(Math.random() * (i + 1));
          [photos[i], photos[j]] = [photos[j], photos[i]]
      }
      setPhotos([...photos]);
      } else {
        const replacementClickedList = [...clickedImgIds, id];
        setClickedImgIds(replacementClickedList);
        setCurrentScore(currentScore + 1)
        console.log(currentScore);
        
        // Function that will shuffle the photos. To be used with on click of each image
        for (let i = photos.length; --i;)  {
          let j = Math.floor(Math.random() * (i + 1));
          [photos[i], photos[j]] = [photos[j], photos[i]]
      }
      setPhotos([...photos]);
      }
    }

  return (
    <>
      <h1>Memory Card Game</h1>
      <p>
        Get points by clicking on an image but dont click on any more than once
      </p>

      <p>Current Score: {currentScore}</p>
      <p>High Score: {highScore}</p>

      {/* Mapping the photos array */}
      {photos.map((photo) => (
        <img key={photo.id} src={photo.urls.small} alt={photo.description} height={300} onClick={()=>{imgClicked(photo.id)}}/>
      ))}
    </>
  )
}

export default App
