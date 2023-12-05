import { useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({display_name: "info about ???"});
  const [searchQuery, setSearchQuery] = useState('');

  console.log ('API_KEY', API_KEY);
  async function getLocation() {
    const API = 'https://us1.locationiq.com/v1/search.php?keys=${API_KEY}&q=${searchQuery}&format=json'
  }
function updateQuery(event) {
  setSearchQuery(event.target.value);
}

function fetchLocation() {
  alert('fetch' + searchQuery);
  //fake getting the location
  setLocation({display_name:searchQuery});
}

  return (
    <>
    <input onChange={(updateQuery)} />
    <button onClick={fetchLocation}>Explore!</button>
    <h2>The city is: {location.display_name}</h2>
    </>
  )
}
