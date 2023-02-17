const tableBody = document.querySelector('tbody')
const tableBodyTwo = document.querySelector('.tbody-two')
const thOne = document.querySelector('.th-one')
const thTwo = document.querySelector('.th-two')
const teams = document.querySelector('.teams')
const score = document.querySelector('.score')
const ul = document.querySelector('.timeline-list')
const ulPlayersOne = document.querySelector('.play-one')
const ulPlayersTwo = document.querySelector('.play-two')
let liContent;
let player;
let rowElement;

const dataString = location.search.substring(1);
const newString = dataString.replace(/%20/g , ' ')

const dataArr = newString.split('|')
const matchID = dataArr[0]
const teamOne = dataArr[1].replace(/%C5%82/g, 'l')
const teamTwo = dataArr[2].replace(/%C5%82/g, 'l')
const scoreOne = dataArr[3]
const scoreTwo = dataArr[4]
const matchDate = dataArr[5]

teams.textContent = `${teamOne} vs. ${teamTwo}`
score.textContent = `${scoreOne} : ${scoreTwo}`
thOne.textContent = `${teamOne}`
thTwo.textContent = `${teamTwo}`

// const URL_1 = 'https://api.sportradar.us/soccer/trial/v4/en/sport_events/'
// const URL_2 = matchID
// const URL_3 = '/timeline.json?api_key=g7z52mc5vv4exurgtynxm3cm'

// const URL = URL_1 + URL_2 + URL_3

const URL = './matchinfo_example.json'


const getPlayers = () => {
    
    fetch(URL)
    .then(res => res.json())
    .then(data => { 
    playersOneArray = data.statistics.totals.competitors[0].players;
    playersTwoArray = data.statistics.totals.competitors[1].players;
    playersObject = data.statistics.totals.competitors

     playersOneArray.forEach(element => {
        const playerOne = element.name.replace(/,/g , '')
        const listElement = document.createElement('li');
        listElement.append(playerOne)
        ulPlayersOne.appendChild(listElement)
     });


     playersTwoArray.forEach(el => {
        const playerTwo = el.name.replace(/,/g , '')
        const listElement = document.createElement('li');
        listElement.append(playerTwo)
        ulPlayersTwo.appendChild(listElement)
     })

    
    })
}

getPlayers();

const getTimeline = () => {

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        timelineArray = data.timeline

        timelineArray.forEach(element => {
            const eventType = element.type.replace(/_/g , ' ')
            const matchClock = element.match_clock
            const time = element.time.slice(11,19)
            const liElement = document.createElement('li')

            if (element.competitor == 'home'){
                player = teamOne
            } else if (element.competitor == 'away'){
                player = teamTwo
            } 
            if(player == undefined && matchClock == undefined) {
                liContent = `${eventType}, ${time}`
            } else{
                liContent = `${player}, ${eventType}, ${matchClock}`
            }
            liElement.append(liContent)
            ul.appendChild(liElement)
        })
    })
}
getTimeline();





