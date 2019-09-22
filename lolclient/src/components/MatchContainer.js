import React from 'react';
import axios from 'axios';
import MatchDetails from './MatchDetails'

class MatchContainer extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      matches: [],
      accountInfo:{}
    }
  }

  async getMatchInfo(){
    if (!this.props.accountInfo) {
      return
    }
    const account  =this.props.accountInfo.account
    const matchHistory = this.props.accountInfo.matchHistory
    matchHistory.map(match => 
      axios.get(`http://localhost:5000/matches/${account}/${match}`)
        .then(response =>
          this.setState({ matches: this.state.matches.concat([response.data])})
        )
    )
  }

  componentDidUpdate(){
    this.getMatchInfo()
  }


  render(){
    console.log(this.state.matches)
    if(this.state.matches.length === 0){
      return (<div>Loading...</div>)
    }
    return(
      <div>
        {this.state.matches.map(match =>
         <MatchDetails match={match}/>
        )}
      </div>
    )
  }
}
export default MatchContainer;