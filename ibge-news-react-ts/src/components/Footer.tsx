import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import GlobalContext from '../context/GlobalContext';
import '../styles/footer.css';

function Footer() {
  const { theme } = useContext(GlobalContext);
  return (
    <footer className={ theme === 'dark' ? 'footer-dark' : 'footer-light' }>
      <div className="icons-container">
        <Link to="https://github.com/IMatheusmaia" target="_blank">
          <FaGithub />
        </Link>
        <Link id="linkedin" to="https://www.linkedin.com/in/%C3%ADcaro-maia-a2103899/" target="_blank">
          <FaLinkedinIn />
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
