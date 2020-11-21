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
        <div className="flex justify-center">
          <div className="sm:flex-col md:grid grid-cols-3 gap-4">
            {this.state.foodList.map(food =>
              <div key={food._id} className="p-4">
                <Link to={`/food/${food._id}`}>
                  <img src={food.image} alt={food.foodName} className="h-64 w-full object-cover"></img>
                </Link>
                <p>Name: {food.foodName}</p>
                <p>Price: ${food.price}</p>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-center m-1'>
          {this.state.prevPage && (<button onClick={this.clickPrev}>Prev</button>)}
          {this.state.nextPage && (<button className='ml-3' onClick={this.clickNext}>Next</button>)}

        </div>
      </>

    return (
      content
      
    )
  }
}
