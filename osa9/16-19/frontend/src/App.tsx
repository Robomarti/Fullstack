import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [newDiaryDate, setNewDiaryDate] = useState('');
  const [newDiaryWeather, setNewDiaryWeather] = useState('Sunny');
  const [newDiaryVisibility, setNewDiaryVisibility] = useState('');
  const [newDiaryComment, setNewDiaryComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date: newDiaryDate,
      weather: Weather[newDiaryWeather as keyof typeof Weather],
      visibility: Visibility[newDiaryVisibility as keyof typeof Visibility],
      comment: newDiaryComment
    }
    console.log(diaryToAdd)
    try {
      createDiary(diaryToAdd).then(data => { setDiaries(diaries.concat(data))}).catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        setErrorMessage(error.response?.data);
      }});
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        setErrorMessage(error.message);
      }
      else { console.error(error); }
    }
    setNewDiaryDate('');
    setNewDiaryWeather('');
    setNewDiaryVisibility('');
    setNewDiaryComment('');
  };

  return (
    <div>
      {errorMessage && errorMessage}
      <form onSubmit={diaryCreation}>
        date
        <input type="date" value={newDiaryDate} onChange={(event) => setNewDiaryDate(event.target.value)}/>
        <br/>
        weather
        &nbsp; Sunny <input type="radio" name="weather" value="Sunny" onChange={(event) => {setNewDiaryWeather(event.target.value); console.log(event.target.value)}}/> 
        &nbsp; Rainy <input type="radio" name="weather" value="Rainy" onChange={(event) => {setNewDiaryWeather(event.target.value); console.log(event.target.value)}}/>
        &nbsp; Cloudy <input type="radio" name="weather" value="Cloudy" onChange={(event) => {setNewDiaryWeather(event.target.value); console.log(event.target.value)}}/>
        &nbsp; Stormy <input type="radio" name="weather" value="Stormy" onChange={(event) => {setNewDiaryWeather(event.target.value); console.log(event.target.value)}}/>
        &nbsp; Windy <input type="radio"name="weather" value="Windy" onChange={(event) => {setNewDiaryWeather(event.target.value); console.log(event.target.value)}}/>
        <br/>
        visibility
        &nbsp; Great <input type="radio" name="visibility" value="Great" onChange={(event) => setNewDiaryVisibility(event.target.value)}/>
        &nbsp; Good <input type="radio" name="visibility" value="Good" onChange={(event) => setNewDiaryVisibility(event.target.value)}/>
        &nbsp; Ok <input type="radio" name="visibility" value="Ok" onChange={(event) => setNewDiaryVisibility(event.target.value)}/>
        &nbsp; Poor <input type="radio" name="visibility" value="Poor" onChange={(event) => setNewDiaryVisibility(event.target.value)}/>
        <br/>
        comment
        <input value={newDiaryComment} onChange={(event) => setNewDiaryComment(event.target.value)}/>
        <br/>
        <button type='submit'>add</button>
      </form>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}><h3>{diary.date}</h3>{diary.weather}, {diary.visibility}</li>
        )}
      </ul>
    </div>
  )
}
export default App