import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      foodList: [],
      nextPage: [],
      prevPage: [],
      isLoading: false
      
    }
    this.page = 1;
    this.apiCall = this.apiCall.bind(this)
    this.clickNext = this.clickNext.bind(this)
    this.clickPrev = this.clickPrev.bind(this)
  }
  

  clickNext = () =>{
    this.page += 1;
    this.apiCall()
  }

  clickPrev = () => {
    this.page -= 1;
    this.apiCall()
  }
  

  componentDidMount() {
    this.apiCall()
  }

  async apiCall(){
    try {
      axios.get(`http://localhost:4000/food/display?page=${this.page}&limit=9`)
        .then(res => {  
          this.setState({ 
            foodList: res.data.result, 
            nextPage: res.data.next, 
            prevPage: res.data.previous 
          });
          
          
        })
    } catch (err) {

      console.error("OOOOH NOOO", err);
    }
  }

  render() {
    const content =
      <>
        <div className='flex'>

          <div className='flex w-2/6 border-r'>
            <div className='flex-col w-full'>
              <div className='flex p-5 align-baseline'>
                <p className='font-bold text-2xl'>Filters</p>
                <p className='ml-3 p-2'>Clear all</p>
              </div>

              <div className='p-5 flex justify-center'>
                <p className='hover:border-0 hover:bg-blue-600 hover:text-white w-full text-center py-2 rounded-tl-lg rounded-bl-lg text-blue-500 font-medium border border-gray-400'>ASDASD</p>
                <p className='hover:border-0 hover:bg-blue-700 hover:text-white w-full text-center py-2 rounded-tr-lg rounded-br-lg text-blue-500 font-medium border border-gray-400'>abasd</p>
              </div>

              <p className='p-5'>ASDASD</p>
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex-col w-full">
              {this.state.foodList.map(food =>
                <div key={food._id} className="flex w-full border-b border-gray-300">
                  <Link to={`/food/${food._id}`}>
                    <img src={food.image} alt={food.foodName} className="p-3 h-20 w-20 object-cover box-content"/>
                  </Link>
                  <div className='flex pl-5 w-full'>
                    <div className='flex w-full'>
                      <p className='mt-5 font-medium'>{food.foodName}</p>
                    </div>
                    <div className='flex w-full justify-around'>
                      <div className='flex w-3/6'>
                        <p className='mt-5 font-medium'>{food.price}</p>
                      </div>
                      <div className='flex w-full'>
                        <p className='mt-5 font-medium'>{food.desc}</p>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className='flex justify-center p-5'>
          {this.state.prevPage && (<button onClick={this.clickPrev}>Prev</button>)}
          {this.state.nextPage && (<button className='ml-3' onClick={this.clickNext}>Next</button>)}

        </div>
      </>

    return (
      content
      
    )
  }
}
