import { useState, useEffect } from 'react'
import MonthlyCalendarHeatmap from "./monthly-calender";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl =
      "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=uppermoonk&api_key=171cea71e4e5ae4dc648bfa13001036f&format=json";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        const transformedData = jsonData?.recenttracks?.track.map((track) => ({
          date: new Date(parseInt(track.date?.uts, 10) * 1000)
            .toISOString()
            .split("T")[0],
          value: 1,
          topSong: track.name || "-",
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>New Music Calender 2024</h1>
      <p>This is most of the music I've listened too throughout the year! (Hover over the dates!)</p> 
      <p>I listen to the same songs very often, so don't be too surprised haha</p>
      <MonthlyCalendarHeatmap data={data} />
      <p>Source: <a href='https://www.last.fm/api'>last.fm</a></p>
      <p>(Doesn't track my entire year but best I could find) </p>
    </div>
  );
}

export default App
