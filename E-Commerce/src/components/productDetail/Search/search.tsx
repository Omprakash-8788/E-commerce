import React, { useState } from 'react';
import './search.css';
import { useNavigate } from 'react-router-dom';



const Search = () => {
    const [keyword, setKeyword] = useState('');
    const history = useNavigate();

    localStorage.setItem('keyword', keyword);

    const SearchSubmitHandler = (e) =>{
        e.preventDefault('');
       

        if(keyword.trim() ){
            history(`/products/${keyword}`)
        }else{
            history("/products")
        }
    }
  return (
    <div>
        <form className='input-container' onSubmit={SearchSubmitHandler}>
            <input type="text" name="" id="" placeholder='enter the keyword' value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}

export default Search

