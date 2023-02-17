const tableBody = document.querySelector(".tbody")
let schedulesArray;
const select = document.querySelector('select');

function getapi() {

 const urls = ['ekstraklasa20_21', 'ekstraklasa21_22', 'ekstraklasa22_23'];

  Promise.all(
    urls.map(url =>
        fetch('./' + url + '.json')
        .then(res => res.json())))
        .then(data => {
           schedulesArray = data;

           schedulesArray.forEach(element => {
           const newArray = element.schedules;
                    
            for(const key in newArray) {
            const teamOne = newArray[key].sport_event.competitors[0].name;
            const teamTwo = newArray[key].sport_event.competitors[1].name;
            const scoreOne = newArray[key].sport_event_status.home_score;
            const scoreTwo = newArray[key].sport_event_status.away_score;
            const stadium = newArray[key].sport_event.venue.name;
            const matchDate = newArray[key].sport_event.start_time.slice(0,10)
            const matchID = newArray[key].sport_event.id 

            const rowElement = document.createElement('tr');
            const teamOneCell = document.createElement('td')
            const teamTwoCell = document.createElement('td')
            const matchDateCell = document.createElement('td')
            const stadiumCell = document.createElement('td')
            const halfTimeScoreCell = document.createElement('td')
            const scoreCell = document.createElement('td')
    
                rowElement.appendChild(teamOneCell)
                rowElement.appendChild(teamTwoCell)
                rowElement.appendChild(matchDateCell)
                rowElement.appendChild(stadiumCell)
                rowElement.appendChild(halfTimeScoreCell)
                rowElement.appendChild(scoreCell)
                
            teamOneCell.textContent = `${teamOne}`
            teamTwoCell.textContent = `${teamTwo}`
            matchDateCell.textContent = matchDate;
            stadiumCell.textContent = stadium;
    
       
            if (newArray[key].sport_event_status.match_status == 'not_started') {
            halfTimeScoreCell.textContent = '-';
            scoreCell.textContent = 'Not started';
            } else if (newArray[key].sport_event_status.match_status == 'postponed') {
                halfTimeScoreCell.textContent = '-';
                scoreCell.textContent = 'Postponed';
            } else if (newArray[key].sport_event_status.status == 'cancelled') {
                halfTimeScoreCell.textContent = '-';
                scoreCell.textContent = 'Cancelled';
            } else {
                    const halfScoreOne = newArray[key].sport_event_status.period_scores[0].home_score
                    const halfScoreTwo = newArray[key].sport_event_status.period_scores[0].away_score
            
                    halfTimeScoreCell.textContent = `${halfScoreOne} : ${halfScoreTwo}`
                    scoreCell.textContent = `${scoreOne} : ${scoreTwo}`

                    const info = document.createElement('a')
                    info.setAttribute('href' , `./matchinfo.html?${matchID}|${teamOne}|${teamTwo}|${scoreOne}|${scoreTwo}|${matchDate}`)
                    info.setAttribute('target', '_blank')
                    info.innerHTML = `<span class="material-symbols-sharp">info</span>`
                    rowElement.appendChild(info)
                };
            
            
                if (scoreOne > scoreTwo) {
                    teamOneCell.classList.add('winner')
                    teamTwoCell.classList.add('loser')
                } else if (scoreOne < scoreTwo) {
                    teamOneCell.classList.add('loser')
                    teamTwoCell.classList.add('winner')
                } else if(scoreOne == scoreTwo && scoreCell.textContent !== 'Postponed' && scoreCell.textContent !== 'Not started' && scoreCell.textContent !== 'Cancelled') {
                    teamOneCell.classList.add('draw')
                    teamTwoCell.classList.add('draw')
                }; 

    
            tableBody.appendChild(rowElement)
        }  
      })
    }
    )
  }
getapi();


const seasonFilter = () => {

 const selectedOption = select.options[select.selectedIndex].value;
 const rows = tableBody.querySelectorAll('tr')
        
  for (const row of rows) {
    const matchDay = row.children[2].innerText;
          
    const rowIndex = row.rowIndex
              
    if (selectedOption =='20_21' && matchDay.includes('2020')) {
    row.style.display = '';
    } else if (selectedOption =='20_21' && matchDay.includes('2021') && rowIndex <= 251){
    row.style.display = ''
    } else if (selectedOption =='21_22' && matchDay.includes('2021') && rowIndex >= 252){
    row.style.display = ''
    } else if (selectedOption =='21_22' && matchDay.includes('2022') && rowIndex <= 564){
    row.style.display = ''
    } else if (selectedOption =='22_23' && matchDay.includes('2022') && rowIndex >= 565){
    row.style.display = ''
    } else if (selectedOption =='22_23' && matchDay.includes('2023') && rowIndex <= 875){
    row.style.display = ''
    } else {
    row.style.display = 'none'
    }
 }
};

// const showMatchInfo = () => {
//  const URL_1 = 'https://api.sportradar.us/soccer/trial/v4/en/sport_events/'
//  const URL_2 = 'https://api.sportradar.us/soccer/trial/v4/en/sport_events/'
//  const URL_3 = '/timeline.json?api_key=3saujtp7ty4q83hsjbq9zzkx'

//  const urls = ['ekstraklasa20_21', 'ekstraklasa21_22', 'ekstraklasa22_23'];

//  Promise.all(urls.map(url =>
//  fetch('./' + url + '.json')
//  .then(res => res.json())))
//  .then(data => {
//  array = data; 
//  array.forEach(element => {
//  const secondArray = element.schedules

//  for (const key in secondArray) {
//     const matchID = secondArray[key].sport_event.id
//     console.log(matchID)
//     h2.textContent = matchID[0]
//      }
//     });
// })}

// showMatchInfo()






select.addEventListener('change', seasonFilter)
