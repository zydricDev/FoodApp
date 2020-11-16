import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Home extends React.Component {
  state = {
    foodList: []
  }

  async componentDidMount() {
    try{
        axios.get(`http://localhost:4000/food/display`)
        .then(res => {
        const foodList = res.data;
        this.setState({ foodList });
      })
    }catch(err){
      
        console.error("OOOOH NOOO",err);
    }
  }

  render() {
    return (
        <div className="flex justify-center">
            <div className="sm:flex-col md:grid grid-cols-3 gap-4">
            { this.state.foodList.map(food => 
            <div key={food._id} className="p-4">
                <Link to={`/food/${food._id}`}>
                <img src={food.image} alt={food.foodName}></img>
                </Link>
                <p>Name: {food.foodName}</p>
                <p>Price: ${food.price}</p>
                </div>
            ) }
            </div>
            
        </div>
            
    )
  }
}
