import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie'
import moment from "moment";
import "./styles.css"

import buildCalendar from "./build"
import dayStyles from "./styles"



const Schedule = () => {
  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);

  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment())

  // The start and end in the calendar view


  useEffect(() => {
    setCalendar(buildCalendar(value))
  }, [value])

  function currMonthName() {
    return value.format("MMMMM")
  }

  function currYear() {
    return value.format("YYYY")
  }

  function prevMonth(value) {
    console.log(value)
    let temp = value.clone().subtract(1, "month")
    console.log(temp)
    setValue(temp)
  }
  function nextMonth(value) {
    console.log(value)
    let temp = value.clone().add(1, "month")
    console.log(temp)
    setValue(temp)
  }

  return (
    <>
      <h1>Schedule</h1>
      <div className="calendar">
        <div className="header">
          <div className="previous" onClick={() => prevMonth(value)}>
            {String.fromCharCode(171)}
          </div>
          <div className="current">
            {currMonthName()} {currYear()}
          </div>
          <div className="next" onClick={() => nextMonth(value)}>
            {String.fromCharCode(187)}
          </div>
        </div>
        <div className="body">
          {
            calendar.map(week =>
              <div>
                {
                  week.map(day =>
                    <div className="day" onClick={() => setValue(day)}>
                      <div
                        className={dayStyles(day, value)}>
                        {day.format("D").toString()}
                      </div>
                    </div>)
                }
              </div>)
          }
        </div>
      </div>
    </>
  )
}

export default Schedule