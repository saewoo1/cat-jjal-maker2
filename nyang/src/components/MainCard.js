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

  export default MainCard;
  // 왜 button에 onSubmit을 안다는가?? -> 제출되는건 form이니까 !! 달아도 되긴 한대