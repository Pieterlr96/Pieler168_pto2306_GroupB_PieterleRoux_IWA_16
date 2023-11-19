const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  
  const data = {
    response: {
      requestType: "FETCH_ATHLETE_DATA",
      requestBy: "ALL_MATCHING_ATHLETES",
      forDisplay: "BEST_RACES",
  
      data: {
        NM372: {
          firstName: "Nwabisa",
          surname: "Masiko",
          id: "NM372",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [9, 7, 8, 6],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [6, 7, 8, 7],
            },
          ],
        },
  
        SV782: {
          firstName: "Schalk",
          surname: "Venter",
          id: "SV782",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [10, 8, 3, 12],
            },
            {
              date: '2022-11-25T20:00:00.000Z',
              time: [6, 8, 9, 11],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [10, 11, 4, 8],
            },
            {
              date: '2022-12-09T20:00:00.000Z',
              time: [9, 8, 9, 11],
            },
          ],
        },
      },
    },
  }
  
  // Only edit below this comment
  
  const createHtml = (athlete) => {
    const { firstName, surname, id, races } = athlete

  const latestRace = races.reduce((latest, current) => {
    const currentDate = new Date(current.date)
    const latestDate = new Date(latest.date)
    return currentDate > latestDate ? current : latest
  })

  const { date: dateAsString, time: timeAsArray } = latestRace
  const date = new Date(dateAsString)
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()
  const totalTime = timeAsArray.reduce((acc, curr) => acc + curr, 0)
  const hours = Math.floor(totalTime / 60)
  const minutes = Math.floor((totalTime % 60))
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  const fragment = document.createDocumentFragment()

  const title = document.createElement('h2')
  title.textContent = id
  fragment.appendChild(title)

  const list = document.createElement('dl')

    list.innerHTML = /* html */`
      <dt>Athlete</dt>
      <dd>${firstName} ${surname}</dd>
  
      <dt>Total Races</dt>
      <dd>${races.length}</dd>
  
      <dt>Event Date (Latest)</dt>
      <dd>${day} ${month} ${year}</dd>
  
      <dt>Total Time (Latest)</dt>
      <dd>${formattedTime} </dd>
    `
  
    fragment.appendChild(list)
    return fragment
  }
  
 
  const NM372data = data.response.data.NM372
  const SV782data = data.response.data.SV782
  
  const NM372Element = document.querySelector('[data-athlete="NM372"]')
  const SV782Element = document.querySelector('[data-athlete="SV782"]')
  
  const NM372Html = createHtml(NM372data)
  const SV782Html = createHtml(SV782data)
  
  while (NM372Html.firstChild) {
    NM372Element.appendChild(NM372Html.firstChild)
  }
  
  while (SV782Html.firstChild) {
    SV782Element.appendChild(SV782Html.firstChild)
  }
