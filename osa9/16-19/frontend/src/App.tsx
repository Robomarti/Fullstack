import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      id: diaries.length + 1,
      date: "",
      weather: Weather['Sunny'],
      visibility: Visibility['Great'],
      comment: ""
    }
    setDiaries(diaries.concat(diaryToAdd));
    setNewDiary('')
  };

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <input
          value={newDiary}
          onChange={(event) => setNewDiary(event.target.value)} 
        />
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