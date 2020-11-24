import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

export default function Category() {
    const [position, setPosition] = useState(0)
    
    const moveRight = () =>{
        if(position > -100){
            setPosition(0)
        }else{
            setPosition(position+100)
        }
        
        
    }
    const moveLeft = () =>{
        setPosition(position-100)
        
    }

    const props = useSpring({
        to: async (next, cancel) => {
          await next({transform: `translateX(${position}%)`})
        },
        from: {transform: `translateX(0%)`}
    })

    let test = 
        <animated.div style={props}>
            <div className='w-full'>
                <div className='ml-3 hover:bg-black text-center inline-block'>
                    <button onClick={() => { setPosition(0) }}>
                        <img src='https://post.greatist.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg' className='rounded-full w-40 h-40 object-cover' />
                        <p>Asian</p>
                    </button>
                </div>
                <div className='ml-3 hover:bg-black text-center inline-block'>
                    <button onClick={() => { setPosition(-17) }}>
                        <img src='https://zjf683hopnivfq5d12xaooxr-wpengine.netdna-ssl.com/wp-content/uploads/2020/02/GettyImages-1199242002-1-1920x1080.jpg' className='rounded-full w-40 h-40 object-cover'></img>
                        <p>Lunch</p>
                    </button>
                </div>
               
            </div>
        </animated.div>



    let content = 
    <div className='flex w-full p-5 border-b'>
        <div className='flex w-full'>
            <div className='flex justify-start'>
                {
                    position < 0 && 
                    <button onClick={moveRight}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} className='text-5xl'/>
                    </button>
                }
            </div>
            
            <div className='flex w-full overflow-hidden whitespace-no-wrap'>
                {test}
            </div>
            
            <div className='flex justify-start'>
                {   
                    position > -100 && 
                    <button onClick={moveLeft}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} className='text-5xl'/>
                    </button>
                }
            </div>
        </div>
        
    </div>
    return (
        content
    )
}

/*
<option value='none'>uncategorized</option>
<option value='Asian'>Asian</option>
<option value='Salads'>Salads</option>
<option value='Breakfast'>Breakfast</option>
<option value='Vegetarian'>Vegetarian</option>
<option value='Healthy'>Healthy</option>
<option value='Hamburger'>Hamburger</option>
<option value='Ice Cream'>Ice Cream</option>
<option value='Bakery'>Bakery</option>
<option value='American'>American</option>
<option value='Japanese'>Japanese</option>
<option value='Lunch'>Lunch</option>
<option value='Deserts'>Deserts</option>

*/