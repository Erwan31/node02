import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    cars: [],
  }

  componentDidMount(){
    axios.get('/api/getcars').then(response => {
      this.setState({cars: response.data});
      console.log(response.data)
    })
  }

  onCarSubmit = () => {
    axios.post('/api/addcar', {
      brand: "Ford",
      model: "Fiesta",
      year: 2016,
      avail: true,
    }).then( response => {
      console.log(response.data);
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Add Car</h1>
        <button onClick={() => this.onCarSubmit()}>
          Add Car to db
        </button>
        <br/>
        {
          this.state.cars.map( (car, i) => (
            <div key={i}>- {car.model}</div>
          ))
        }
      </div>
    );
  }

}

export default App;
