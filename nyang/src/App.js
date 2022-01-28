import './App.css';
import React from 'react';
import Title from './components/Title';
import Form from './components/Form';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value)); //
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

console.log("야옹");     

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });//localStorage는 string으로 값을 뱉어준다
  //이런식으로 useState의 값을 function으로 넘겨주면, 불필요한 접근을 막을 수 있다.
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitalCat() {
    const newCat = await fetchCat('First Cat');
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitalCat();
  }, [])


  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);
    
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter); // browser에 저장되는 값
      return nextCounter;

    });//prev == 기존값 // 눈에 보이는 {counter} 값
    
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites); // 변수에 []쳤는지.. 잘 보자^^
    jsonLocalStorage.setItem('favorites', nextFavorites);
    
  }

  const counterTitle = counter === null ? "" : counter + '번째 ';

  return (
    <div>
      <Title > {counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat}/>
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites}/>
    </div>
  );
}; // 최상위 태그가 두개야..! -> div로 감싸주기! 빈 태그로 감싸도 된다


export default App;
//Import~ export 파일을 모듈처럼 가져오고, 내보낼 수 있도록.