import React from 'react';
import SearchBar from './SearchBar'
import MatchContainer from './MatchContainer'

import axios from 'axios';

class App extends React.Component{
  state = {
    accountInfo:{}
  }

  async getAccountInfo(user){
    const response = await axios.get(`http://localhost:5000/${user}`)
      .catch(function(){
        this.setState({
          accountInfo: {}
        })
      })
    this.setState({accountInfo: response.data})
  }

  onUsernameSearch = searchUser =>{
    if(searchUser.length){
      this.getAccountInfo(searchUser)
    }
    
  }
  render(){
    return(
      <div className='container'>
        <SearchBar onUsernameSearch={ this.onUsernameSearch } />
        <MatchContainer accountInfo={this.state.accountInfo}/>
      </div>
    )

  }
}

export default App;