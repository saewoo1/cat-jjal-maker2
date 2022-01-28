import React from "react";

const Form = ({updateMainCat}) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
  
    function handleInputChange(e) {
      const userValue = e.target.value;
      if (includesHangul(userValue)) {
        setErrorMessage("🐱: 한쿸뫌.. 몰라요 ❌");
      } else {
        setErrorMessage("");
      }
      setValue(e.target.value.toUpperCase());
    }
  
    function handleFormSubmit(e) {
      e.preventDefault();
      if (value == '') {
        setErrorMessage('🐱...? ❌');
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

export default Form;