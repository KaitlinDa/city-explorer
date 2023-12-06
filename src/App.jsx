import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;


export default function App() {
  const [location, setLocation] = useState({display_name: "info about ???"});
  const [searchQuery, setSearchQuery] = useState('');

  async function getLocation() {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    const response = await axios.get(API);
    const locationObj = response.data[0];
    setLocation(locationObj);

    console.log(locationObj);
  }
  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <input onChange={updateQuery} />
      <button onClick={getLocation}>Explore!</button>
      <h2>The city is: {location.display_name}</h2>
    </>
  )
}
