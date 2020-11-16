import React, { useState, useEffect } from "react"
import axios from "axios"
import { useCookies } from 'react-cookie'
import moment from "moment";

const ScheduleForm = (props) => {

  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);
  const [ResponseID, setResponseID] = useCookies(['psa-id']);
  const [message, setMessage] = useState("")
  const [startTime, setStartTime] = useState(moment().format("HH:MM:SS"))
  const [endTime, setEndTime] = useState(moment().format("HH:MM:SS"))
  const [trainers, setTrainers] = useState([])
  const [selectedTrainer, setSelectedTrainer] = useState("")

  let appDate = props.dateClicked.format("YYYY-MM-DD")

  const scheduleApp = (event) => {

    axios.post('http://127.0.0.1:8000/appointments/book_app/',
      {

        "trainer_id": `${token['psa-id']}`,
        "client_id": 3,
        "day": appDate,
        "start_time": startTime,
        "end_time": endTime,
        "time": null
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['psa-token']}`
        }
      })
      .then((response) => {
        setMessage("Success")
        console.log(response)
      }).catch((error) => {
        setMessage("Fail")
        console.log(error)
      })
  }

  const onChange = () => {

  }
  let timeArrayNumArray = []


  for (let i = 0; i < 25; i++) {
    if (i < 10) {
      timeArrayNumArray.push("0" + i.toString() + ":00:00")
    } else {
      timeArrayNumArray.push(i.toString() + ":00:00")
    }
  }

  const timeInputArray = timeArrayNumArray.map((element, index) => {
    return (
      <option value={index}>{element}</option>
    )
  })

  const changeStartTime = (event) => {
    let temp = event.target.value
    if (temp < 10) {
      temp = "0" + temp.toString() + ":00:00"
    } else {
      temp = temp.toString() + ":00:00"
    }
    setStartTime(temp)
  }

  const changeEndTime = (event) => {
    let temp = event.target.value
    if (temp < 10) {
      temp = "0" + temp.toString() + ":00:00"
    } else {
      temp = temp.toString() + ":00:00"
    }
    setEndTime(temp)
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/trainers/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['psa-token']}`
        }
      })
      .then((response) => {
        // console.log(response)
        setTrainers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const trainerArray = trainers.map((element, index) => {
    return (
      <option value={index}>{parseInt(element.id)}. {element.full_name}</option>
    )
  })

  const changeTrainer = (event) => {
    setSelectedTrainer(event.target.value)
    // console.log(event.target.value)
    // let temp = event.target.value
    // console.log(temp)
  }

  console.log(selectedTrainer)
  return (
    <>
      <div className="App">
        <header className="App-header"> Schedule </header>
        <div className="login-container">


          <label>Trainer</label>
          <select onChange={changeTrainer} value={selectedTrainer}> {trainerArray} </select>
          <br /> <br />

          <label>Client</label>
          <input type="text" onChange={onChange} /><br />

          <label>Date</label>
          <input type="text" value={appDate} onChange={onChange} /><br />

          <label>Start Time</label>
          <select onChange={changeStartTime}> {timeInputArray} </select>
          <br /> <br />

          <label>End Time</label>
          <select onChange={changeEndTime}> {timeInputArray} </select>
          <br /> <br />

          <button onClick={scheduleApp}>Book Appointment</button>
          {message ? <h4>{message}</h4> : null}
        </div>
      </div>
    </>
  )
}

export default ScheduleForm