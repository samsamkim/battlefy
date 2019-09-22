import React from 'react';


const MatchDetails = ({match}) =>{
  return(
    <div>
      <div>champion: {match.champion}</div>
      <div>champlevel: {match.champlevel}</div>
      <div>creep: {match.creep}</div>
      <div>kills: {match.kills}</div>
      <div>assists: {match.assists}</div>
      <div>deaths: {match.deaths}</div>
      <div>gameDuration: {match.gameDuration}</div>
      <div>item0: {match.item0}</div>
      <div>item1: {match.item1}</div>
      <div>item2: {match.item2}</div>
      <div>item3: {match.item3}</div>
      <div>item4: {match.item4}</div>
      <div>item5: {match.item5}</div>
      <div>item6: {match.item6}</div>
      <div>perk1: {match.perk1}</div>
      <div>perk2: {match.perk2}</div>
      <div>perk3: {match.perk3}</div>
      <div>perk4: {match.perk4}</div>
      <div>perk5: {match.perk5}</div>
      <div>spell1: {match.spell1}</div>
      <div>spell2: {match.spell2}</div>
      <div>win: {match.win ? 'Win' : 'Lose'}</div>
      <br></br>
    </div>
  )
}

export default MatchDetails