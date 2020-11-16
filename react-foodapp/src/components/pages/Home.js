import React from 'react';
//import {Link} from 'react-router-dom';
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
        console.error(err);
    }
  }

  render() {
    return (
        <div className="flex justify-center">
            <div className="sm:flex-col md:grid grid-cols-3 gap-4">
            { this.state.foodList.map(food => 
            <div key={food._id} className="p-4">
                <img src={food.image} alt={food.foodName}></img>
                <p>{food.foodName}</p>
                <p>{food.price}</p>
                </div>
            ) }
            </div>
            
        </div>
            
    )
  }
}
