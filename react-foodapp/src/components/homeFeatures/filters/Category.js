import React, {useState, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import { useAxiosGet } from '../../../Hooks/HttpRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import Items from '../../homeFeatures/Items'
export default function Category() {
    const [position, setPosition] = useState(0)
    const [itemCategory, setCategory] = useState('null')
    const [featured, setFeatured] = useState(false)
    const [url, setUrl] = useState(`http://localhost:4000/food/display/${itemCategory}/${featured}`)
    
    const sliderList = useAxiosGet('http://localhost:4000/category/display')
    let menu = undefined
    let content = undefined
    useEffect(()=>{
        if(itemCategory){
            setUrl(`http://localhost:4000/food/display/${itemCategory}/${featured}`)
        }
        
    }, [url, itemCategory, featured])


    if (sliderList.error) {
        content = <p>There was an error</p>
    }

    const moveRight = () => {
        setPosition(position + 100)
    }
    const moveLeft = () =>{
        setPosition(position - 100)
    }

    const filterFunction = (filterCategory) =>{
        
        if(!filterCategory || (filterCategory === itemCategory) ){
            setCategory('null')
        }else{
            setCategory(filterCategory)
        }
        
        
    }

    const props = useSpring({
        to: async (next, cancel) => {
          await next({transform: `translateX(${position}%)`})
        },
        from: {transform: `translateX(0%)`}
    })

    try{
        if(sliderList.data){
            
            menu = 
            <animated.div style={props}>
                <div className='w-full'>
                    <div>
                        {sliderList.data.map((menuType,index) =>
                            <div key={index} className='ml-3 text-center inline-block'>
                                <button onClick={() => { filterFunction(menuType.newCategoryType) }}>
                                    <img src={menuType.img} className='rounded-full w-40 h-40 object-cover hover:bg-black' />
                                    <p>{menuType.newCategoryType}</p>
                                </button>
                            </div>
                        
                        )}
                        
                    </div>
                    
                   
                </div>
            </animated.div>
        }

    }catch(err){
        console.log('An error has occurred')
    }
    
    content = 
        <div className='w-full'>
            <div className='flex w-full p-5 border-b'>
                <div className='flex w-full'>
                    <div className='flex justify-start'>
                        {
                            position < 0 &&
                            <button onClick={moveRight}>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} className='text-5xl' />
                            </button>
                        }
                    </div>

                    <div className='flex w-full overflow-hidden whitespace-no-wrap'>
                        {menu}
                    </div>

                    <div className='flex justify-start'>
                        {
                            <button onClick={moveLeft}>
                                <FontAwesomeIcon icon={faAngleDoubleRight} className='text-5xl' />
                            </button>
                        }
                    </div>
                </div>

            </div>
            <div>
                <Items filteredLink={url} />
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