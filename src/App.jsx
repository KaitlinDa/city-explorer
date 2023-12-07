import { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [location, setLocation] = useState({ display_name: "", lat: "", lon: "" });
  const [searchQuery, setSearchQuery] = useState('');
  const [mapImageUrl, setMapImageUrl] = useState('');

  async function getLocation() {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
      const response = await axios.get(API);
      const locationObj = response.data[0];
      setLocation({
        display_name: locationObj.display_name,
        lat: locationObj.lat,
        lon: locationObj.lon
      });

      const mapAPI = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${locationObj.lat},${locationObj.lon}&zoom=12`;
      setMapImageUrl(mapAPI);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  }

  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input 
              type="text"
              className="form-control"
              placeholder="Enter city name"
              onChange={updateQuery}
            />
            <button className="btn btn-primary" onClick={getLocation}>Explore!</button>
          </div>
          {location.display_name && (
            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{location.display_name}</h5>
                  <p className="card-text">Latitude: {location.lat}</p>
                  <p className="card-text">Longitude: {location.lon}</p>
                </div>
              </div>
              {mapImageUrl && (
                <div className="map-container mt-3">
                  <img src={mapImageUrl} alt="Map" className="img-fluid" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
