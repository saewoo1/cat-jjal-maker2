import logo from './logo.svg';
import './App.css';
import React from 'react';

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

function CatItem(props) {
  return (
    <li>
      <img src={props.img} style={{width: '150px'}}/>
    </li>
  );
}

function Favorites({favorites}) {
  if (favorites.length === 0) {
    return (<div>사진 위 하트를 눌러 고양이 사진을 저장해봥</div>);
  } 

  return (
    <ul className="favorites">
      {favorites.map(cat => (
        <CatItem img={cat} key={cat}/>
        ))}
    </ul>
  );
}

const MainCard = ({img, onHeartClick, alreadyFavorite}) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";

  return (
    <div className="main-card">
      <img
        src={img}
        alt="고양이"
        width="400"
      />
      <button onClick={onHeartClick} >{heartIcon}</button>
    </div>
  );
}


const Title = (props) => {
  return (
    <h1>{props.children}</h1>
  );
};

const Form = ({updateMainCat}) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleInputChange(e) {
    const userValue = e.target.value;
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 안된다냥!!");
    } else {
      setErrorMessage("");
    }
    setValue(e.target.value.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (value == '') {
      setErrorMessage('빈값도 싫다냥!!');
      return;
    } else {
      setErrorMessage('');
    }
    updateMainCat(value);
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <input 
      type="text" 
      name="name"
      placeholder="영어 대사를 입력해주세요"
      value={value}
      onChange={handleInputChange}
      />
      <button type="submit">생성</button> 
      <p style={{color: 'red'}}>{errorMessage}</p>
    </form>
  )
};
// 왜 button에 onSubmit을 안다는가?? -> 제출되는건 form이니까 !! 달아도 되긴 한대

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