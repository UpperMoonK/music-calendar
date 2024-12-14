import React from "react";
import "./monthly-calender.css";

const MonthlyCalendarHeatmap = ({ data }) => {
  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate()).fill(null).map((_, i) => i + 1);
  };

  const formatDataByMonth = (data) => {
    const formatted = {};
    data.forEach(({ date, value, topSong }) => {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = parsedDate.getMonth();
      const day = parsedDate.getDate();

      if (!formatted[year]) formatted[year] = {};
      if (!formatted[year][month]) formatted[year][month] = {};

      formatted[year][month][day] = { value, topSong };
    });
    return formatted;
  };

  const today = new Date();
  const year = today.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedData = formatDataByMonth(data);

  return (
    <div className="monthly-calendar-heatmap">
      {months.map((month, monthIndex) => (
        <div key={month} className="month-container">
          <h3>{month}</h3>
          <div className="calendar-grid">
            {["", "", "", "", "", "", ""].map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
            {getDaysInMonth(year, monthIndex).map((day) => {
              const dayData = formattedData[year]?.[monthIndex]?.[day] || { value: 0, topSong: "-" };
              const { value, topSong } = dayData;

              return (
                <div
                  key={day}
                  className={`day-cell ${
                    value === 0
                      ? "color-empty"
                      : value <= 5
                      ? "color-low"
                      : value <= 10
                      ? "color-medium"
                      : "color-high"
                  }`}
                  title={`Date: ${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}\nSongs: ${value}\nTop Song: ${topSong}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyCalendarHeatmap;