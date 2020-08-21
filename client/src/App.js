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
    });

  };

  onCarRemove = () => {
    axios.post('/api/removecar', {
      brand: "Ford",
    }).then( response => {
      console.log(response.data);
    });
  }

  onCarUpdate = () => {
    axios.get('/api/updatecar', {
      id: '5f3fac63221053301c1a67b8',
      brand: 'Peugeot'
    }).then( response => {
      console.log('ok');
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
        <h1>Remove Car</h1>
        <button onClick={() => this.onCarRemove()}>
          REmove Car</button>
        <br/>
        {
          this.state.cars.map( (car, i) => (
            <div key={i}>- {car.model}</div>
          ))
        }
        <br/>
        <h1>Update Car</h1>
        <button onClick={() => this.onCarUpdate()}>
          Update Car to db
        </button>
        <br/>
      </div>
    );
  }

}

export default App;
