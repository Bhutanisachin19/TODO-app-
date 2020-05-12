import React from 'react';
import logo from './logo.svg'; 
import "./App.css";



//class based component
class App extends React.Component{

  //syntax
  constructor(props){
    super(props);
    /*
      creating state , which is an object
      whenever we will add new item it will goto newitem first , 
      if something is entered in new item we will push that item into the list so we can have entire array of todo
      and then we will loopthrough it and display it
    */
    this.state = {
      newItem : "",
      list : []
    }
  }

  addItem(todoValue){
    if(todoValue !== ""){
      //we'll create a unique ID for every item , inreact it is better to loop through using ID
      //we can store id in Db also
      const newItem = {
        id : Date.now(),
        value : todoValue,
        isDone : false
      };
      //adv js
      const list = [...this.state.list];
      // ... to append all existing values
      //we are creating a variable list which will hold all values being appended
      list.push(newItem);

      //whenever we want to update something in state we never touch the state directly we always use setstate method
      this.setState({
        //we are updating list bcause list we created in above method has a local scope
        list , newItem: ""
      });
    }
  };


  deleteItem(id){
    //getting a copy of the list
    const list = [...this.state.list];

    //it willcreate an updated list , only the item whose id matches will be omitted
    const updatedlist = list.filter(item => item.id !== id);

    //updating state
    this.setState({list: updatedlist});
  }

  //taking input
  updateInput(input){
    this.setState({newItem : input});
  }

  render(){
    return(
      <div>
        <img src={logo}  width="100" height="100" className="logo"/>
        <h1 className= "app-title"> TODO App </h1> 

        <div className="container"> 
          Add an Item...
          <br />

          <input 
          type = "text"
           className="input-text" 
           placeholder="Write a Todo" 
           required
           value = {this.state.newItem}
           onChange = {e => this.updateInput(e.target.value)}
           />


          <button 
          className="add-btn"
          onClick = {() => this.addItem(this.state.newItem)}
          disabled = {!this.state.newItem.length}
          >
             Add Todo </button>
          


          <div className="list">
            <ul> 
              {this.state.list.map(item => {
                return(
                  //to loop through value should be unique
                  <li key={item.id}>
                    <input type = "checkbox"/>
                    
                    {item.value}

                    <button 
                    className="btn"
                    onClick = {() => this.deleteItem(item.id)}
                    >Delete</button>
                  </li>
                );
              })}
              {
                /*
                <li>
                  <input type="checkbox" />
                  Record Youtube Videos
                  <button className="btn" > Delete </button>
                </li>
                */
              }
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
