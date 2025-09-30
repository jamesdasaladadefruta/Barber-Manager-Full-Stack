import { useState } from 'react'
import './Card.css'


export default function Card({image , title ,value}){
    const [count , setCount] =useState(0)


return(
    <div className='card'>
        <img src={image} alt="" />
        <h2 className='title'>{title}</h2>
        <h3 className='value'>R$ {value}</h3>
        <button onClick={()=> setCount(count > 0 ? count - 1 : 0)}>-</button>
        <input type='number'  value={count}/>
        <button onClick={()=> setCount(count +1)}>+</button>
    </div>
)
}