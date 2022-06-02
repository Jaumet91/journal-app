import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { Sidebar } from './Sidebar';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className='journal__main-content animate__animated animate__fadeInLeft animate__faster'>
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};