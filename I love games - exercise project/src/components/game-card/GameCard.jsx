
export default function GameCard({ id, title, genre, imgUrl }) {
  return (
    <div className="game">
      <img src={imgUrl} alt={title} />

      <div className="details-overlay">
        <p className="name">{title}</p>
        <p className="genre">{genre}</p>
        <a href={`/games/${id}`} className="details-button">
          Details
        </a>
      </div>
    </div>
  );
}
