import { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import convertDate from '../utils/convertDate';
import Figure from '../components/Figure';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import '../styles/notices.css';

function Notices() {
  const [recent, setRecent] = useState<boolean>(true);
  const [tail, setTail] = useState<number>(10);

  const { news, theme, loading } = useContext(GlobalContext);
  if (loading) {
    return <Loading />;
  }
  if (news.length === 0) {
    return (
      <h1>
        Nenhum resultado...
      </h1>
    );
  }
  const newsWithDiffDate = convertDate(news);

  const latest = newsWithDiffDate.sort((a, b) => a.diffDays - b.diffDays);
  const oldest = latest.slice().reverse();

  return (
    <div className={ theme === 'light' ? 'news-container' : 'news-container-dark' }>
      <Figure notice={ latest[0] } />
      <ul
        className={
        theme === 'light'
          ? 'options-container'
          : 'options-container-dark'
      }
      >
        <li
          onClickCapture={ () => setRecent(true) }
          className={ recent ? 'active-option' : '' }
        >
          Mais recentes
        </li>
        <li
          onClickCapture={ () => setRecent(false) }
          className={ recent === false ? 'active-option' : '' }
        >
          Mais antigas
        </li>
      </ul>
      <div className="cards-container">
        {
          recent
            ? (latest.map((notice) => (
              <Card
                key={ notice.id }
                notice={ notice }
              />
            )).slice(1, tail))
            : (oldest.map((notice) => (
              <Card
                key={ notice.id }
                notice={ notice }
              />
            )).slice(1, tail))
              }
      </div>
      <button
        data-testid="more-news"
        className={ theme === 'light' ? 'more-news' : 'more-news-dark' }
        onClick={ () => setTail(tail + 10) }
      >
        MAIS NOTÍCIAS
      </button>
      <Footer />
    </div>
  );
}
export default Notices;
