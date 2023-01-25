import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();
  const [celsius, setCelsius] = useState();
  const [isLoading, setIsLoading] = useState("");

  const APIKEY = "e1e6c02cb9150b8b8186aa94d5eaa4b9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIKEY}`;

  // Capture Input
  const userInput = (e) => {
    setLocation(e.target.value);
  };

  // Search weather function

  const searchWeather = async (e) => {
    // If you want to use keyboard to fire the function
    // if (e.key === "Enter") {}

    console.log(location);

    try {
      setIsLoading("Loading...");

      // toast.loading("Loading...");
      const res = await axios.get(url);
      const data = await res.data;
      setIsLoading("");
      // toast.success("Successful");
      console.log(data);
      setWeather(data);

      const fahrenheit = data.main.temp;

      const celsius = ((fahrenheit - 32) * 5) / 9;
      setCelsius(parseFloat(celsius).toFixed());

      // setIsOpen(false);
      // toast.success("Weather Updated");
    } catch (err) {
      console.error(err);
      setIsLoading("");
      // errorToast("Please input a valid city or state name");

      toast.error(
        "Please input a valid city or state name or switch on your data"
      );
    }
  };

  return (
    <div className="app">
      <div className="search">
        <div className="m-4 border-white border-[2px] rounded-xl py-2 z-20 relative">
          <input
            className="bg-transparent p-2 outline-none"
            type="text"
            value={location}
            onChange={userInput}
            // onKeyDown={searchWeather}
            placeholder="Enter Location"
          />{" "}
          <span>
            <button
              onClick={searchWeather}
              className="border-[2px] py-2 px-4 rounded-xl cursor-pointer outline-rgbaWhite"
            >
              Search
            </button>
          </span>
        </div>
      </div>

      {weather ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weather?.name}</p>
            </div>
            <div className="temp">
              {weather ? <h1>{weather.main.temp.toFixed()}°F</h1> : null}
              {weather ? <h2 className="text-xl">{celsius}°C</h2> : null}
            </div>
            <div className="description">
              <p>{weather?.weather[0].main}</p>
            </div>
          </div>

          {/* bottom */}

          {weather ? (
            <div className="bottom">
              <div className="feels">
                {weather ? (
                  <p className="font-bold">
                    {weather.main.feels_like.toFixed()}°F
                  </p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="hummidity">
                {weather ? (
                  <p className="font-bold">{weather.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {weather ? (
                  <p className="font-bold">{weather.wind.speed.toFixed()}MPH</p>
                ) : null}

                <p>Wind Speed</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center content-center relative top-[30%] ">
          {isLoading}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
