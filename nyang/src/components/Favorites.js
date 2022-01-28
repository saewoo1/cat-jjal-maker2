import CatItem from "./CatItem";

function Favorites({favorites}) {
    if (favorites.length === 0) {
      return (<div>🐱 사진 위 하트를 눌러 사진을 저장하라냥 🐱</div>);
    } 
  
    return (
      <ul className="favorites">
        {favorites.map(cat => (
          <CatItem img={cat} key={cat}/>
          ))}
      </ul>
    );
  }

export default Favorites;