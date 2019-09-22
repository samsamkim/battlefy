import React from 'react';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }

  formSubmit = event => {
    event.preventDefault()
    this.props.onUsernameSearch(this.state.text)
  }

  changeHandler = event =>{
    this.setState({
      text: event.target.value
    })
  }
  render(){
    return(
      <div>
        <form>
          <label>UserName Search:</label>
          <input
            type='text'
            value={this.state.text}
            onChange={this.changeHandler}></input>

            <button onClick={this.formSubmit}></button>
        </form>
      </div>
    )
  }
}

export default SearchBar;