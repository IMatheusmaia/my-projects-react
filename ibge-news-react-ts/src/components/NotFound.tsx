import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import notFoundIlustration from '../assets/not-found-ilustration.svg';
import '../styles/notFound.css';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="notFound-container"
    >
      <h1>
        404: Página não encontrada
      </h1>
      <img src={ notFoundIlustration } alt="notFound-ilustration" />
      <button
        className="back-button"
        onClick={ () => navigate(-1) }
      >
        <IoChevronBackCircleOutline />
        Voltar
      </button>
    </div>
  );
}
export default NotFound;
