function CatItem(props) {
    return (
      <li>
        <img src={props.img} style={{width: '150px'}} alt="catItem"/>
      </li>
    );
  }

export default CatItem;