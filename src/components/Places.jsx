// import Images from '../../backend/images/ruins.jpg';

export default function Places({ title, places,dataLoaded,loadingText,fallbackText, onSelectPlace }) {
  // console.log(places,dataLoaded);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {dataLoaded && <p className="fallback-text">{loadingText}</p>}
      {!dataLoaded && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!dataLoaded && places.length > 0 && (
        <ul className="places">
          {places.map((place,ind) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
