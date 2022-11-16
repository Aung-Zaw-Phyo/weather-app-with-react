import React, {useState} from "react";
import axios from "axios";

function App() {
  const [data, setData] =useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d64f2989fb3e55f95d2756da27b7c64f`
  
  const searchLocation = (event) => {
    if (location === '') {
      return;
    } else {
      if(event.key === 'Enter'){
        axios.get(url).then((response) => {
          setData(response.data);
          console.log(response)
        }).catch((err) => {
          alert(err.response.data.message);
        })
        setLocation('')
      }
    }
  }

  return (
    <div className="App p-5">
        <div className="p-5 col-lg-6 col-xl-5 mx-auto">
          <div>
            <input 
              type="text" className="form-control form-control-lg bg-transparent" placeholder="Enter location"
              onChange={event => setLocation(event.target.value)} 
              onKeyPress={searchLocation}
              value={location}
            />
          </div>
          {data.cod === 200  &&

            <div className="show mt-5 p-4 text-light fw-bold">
              <div className="location text-center">
                <div className="fs-3">{data.name}</div>
                <div className="fs-4 mt-2">{data.weather ? data.weather[0].description : null}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-5">
                <div className="temp">
                  {data.main ? data.main.temp.toFixed() + '°F' : null}
                </div>
                <div className="fs-4">
                  {data.weather ? data.weather[0].main : null}
                </div>
              </div>
              <div className="footer p-3 mt-5">
                <div className="feel text-center">
                  <div>{data.main ? data.main.feels_like.toFixed() + '°F' : null} </div>
                  <div className="mt-2">Feels Like</div>
                </div>
                <div className="humidity text-center">
                  <div>{data.main ? data.main.humidity.toFixed() + '%' : null}</div>
                  <div className="mt-2">Humidity</div>
                </div>
                <div className="wind text-center">
                  <div>{data.wind ? data.wind.speed.toFixed() + 'MPH' : null} </div>
                  <div className="mt-2">Wind Speed</div>
                </div>
              </div>
            </div>
          }
        </div>
    </div>
  );
}

export default App;
