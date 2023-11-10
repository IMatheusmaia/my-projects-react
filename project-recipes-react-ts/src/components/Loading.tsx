import load from '../assets/loading.svg';

function Loading() {
  return (
    <div className="loading-container">
      <img
        className="loading"
        src={ load }
        alt="loading"
      />
    </div>
  );
}
export default Loading;
