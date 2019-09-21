const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const LeagueJS = require('leaguejs');
const leagueJs = new LeagueJS(process.env.LEAGUE_API_KEY);
const fs = require('fs');

const getSummoner = async summonerName => leagueJs.Summoner.gettingByName(summonerName)
const getMatchHistory = async accountId => leagueJs.Match.gettingRecentListByAccount(accountId)
const getMatchInfo = async gameId => leagueJs.Match.gettingById(gameId)



const items = JSON.parse(fs.readFileSync('dragon/item.json'));
const spellJSON = JSON.parse(fs.readFileSync('dragon/summoner.json'))
const championJSON = JSON.parse(fs.readFileSync('dragon/champion.json'))

let spells = {}
let champions = {}

const keyFromJSON = (type, json) => {
  for(let key in json.data){
    const typeObject = json.data[key]
    type[typeObject.key] = typeObject.name
  }  
}

keyFromJSON(spells, spellJSON)
keyFromJSON(champions, championJSON)

const fullMatchInfo = async(gameId, accountId) =>{
  const MatchInfo = await getMatchInfo(gameId)
  let fullData = {}
  // grabbing participant using account id
  let participantId = "" 
  MatchInfo.participantIdentities.forEach(function(participant){
    if (participant.player.accountId === accountId){
      participantId = participant.participantId
    }
  })
  MatchInfo.participants.forEach(function(participantInfo){
    if (participantInfo.participantId === participantId){
      fullData['spell1'] = spells[participantInfo.spell1Id]
      fullData['spell2'] = spells[participantInfo.spell2Id]
      fullData['champion'] = champions[participantInfo.championId]
      fullData['win'] = participantInfo.stats.win
      fullData['kills'] = participantInfo. stats.kills
      fullData['deaths'] = participantInfo.stats.deaths
      fullData['assists'] = participantInfo.stats.assists
      fullData['item0'] = items.data[participantInfo.stats.item0].name
      fullData['item1'] = items.data[participantInfo.stats.item1].name
      fullData['item2'] = items.data[participantInfo.stats.item2].name
      fullData['item3'] = items.data[participantInfo.stats.item3].name
      fullData['item4'] = items.data[participantInfo.stats.item4].name
      fullData['item5'] = items.data[participantInfo.stats.item5].name
      fullData['item6'] = items.data[participantInfo.stats.item6].name
      fullData['champlevel'] = participantInfo.stats.champLevel
      fullData['creep'] = participantInfo.stats.totalMinionsKilled
      fullData['perk1'] = participantInfo.stats.perk1
      fullData['perk2'] = participantInfo.stats.perk2
      fullData['perk3'] = participantInfo.stats.perk3
      fullData['perk4'] = participantInfo.stats.perk4
      fullData['perk5'] = participantInfo.stats.perk5
      fullData['gameDuration'] = MatchInfo.gameDuration
    }
  })
  return fullData;
}

app.get('/:username', async (req, res) =>{
  const { username } = req.params
  const  accountInfo = await getSummoner(username)
  const accountId = accountInfo.accountId

  const matchHistory = await getMatchHistory(accountId)
  const matchIds = matchHistory.matches.map( (match) => {
     return match.gameId
  })

  return res.send({
    matchHistory: matchIds,
    account:accountId
  })
})

app.get('/matches/:account/:match', async (req, res) =>{
  const { match } = req.params
  const { account } = req.params
  const matchDetails = await fullMatchInfo(match, account)
  res.json(matchDetails)

  })

app.listen(5000)
