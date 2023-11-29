import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import Card from './Card';
import convertDate from '../utils/convertDate';
import { NewsType } from '../types';

function Favorites() {
  const { favorite } = useContext(GlobalContext);
  const favWithDays = convertDate(favorite);
  return (
    <section className="favorite-cards-container">
      {
        favWithDays.map((notice: NewsType) => {
          return (
            <Card
              key={ notice.id }
              notice={ notice }
            />
          );
        })
      }
    </section>
  );
}
export default Favorites;
