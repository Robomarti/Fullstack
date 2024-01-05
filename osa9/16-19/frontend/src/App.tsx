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

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      id: diaries.length + 1,
      date: "",
      weather: 'sunny',
      visibility: 'great',
      comment: ""
    }
    setDiaries(diaries.concat(diaryToAdd));
    setNewDiary('')
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newDiary}
          onChange={(event) => setNewDiary(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.comment}</li>
        )}
      </ul>
    </div>
  )
}
export default App