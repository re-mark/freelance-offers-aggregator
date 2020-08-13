import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function ProfileStats() {

  const { startedProjects, finishedProjects, favourites, firstName } = useSelector(state => state.slice.user)
  const offers = useSelector(state => state.slice.offers)

  const favouritesAsObjects = []
  favourites.forEach(fav => {
    const favOffer = offers.find(offer => offer._id == fav)
    favouritesAsObjects.push(favOffer)
  })

  // function startOfMonth(dt) {
  //   return new Date(dt.getFullYear(), dt.getMonth(), 1);
  // }
  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

  const dateNow = new Date()
  const thisMonth = dateNow.getUTCMonth(); //months from 1-12
  const thisDay = dateNow.getUTCDate();
  const thisYear = dateNow.getUTCFullYear();

  // const startThisMonth = startOfMonth(dateNow)
  // const startMonthM1 = startOfMonth(thisYear, thisMonth, 1)
  // const startMonthM2 = startOfMonth(thisYear, thisMonth - 1, 1)
  // const startMonthM3 = startOfMonth(thisYear, thisMonth - 2, 1)

  const statsThisMonth = {
    name: months[thisMonth],
    start: Date.parse(new Date(thisYear, thisMonth, 1)),
    year: thisYear,
    startedProjects: [],
    finishedProjects: [],
    earned: 0
  }

  const statsMonthM1 = {
    name: months[thisMonth - 1],
    start: Date.parse(new Date(thisYear, thisMonth - 1, 1)),
    year: thisYear,
    startedProjects: [],
    finishedProjects: [],
    earned: 0
  }

  const statsMonthM2 = {
    name: months[thisMonth - 2],
    start: Date.parse(new Date(thisYear, thisMonth - 2, 1)),
    year: thisYear,
    startedProjects: [],
    finishedProjects: [],
    earned: 0
  }

  finishedProjects.forEach(project => {
    console.log('finished at', project.finishedAtTS)
    console.log('month begin', statsThisMonth.start)

    if (project.finishedAtTS >= statsThisMonth.start) {
      statsThisMonth.finishedProjects.push(project)
      return
    } else if (project.finishedAtTS >= statsMonthM1.start && project.finishedAtTS < statsThisMonth.start) {
      statsMonthM1.finishedProjects.push(project)
      return
    } else if (project.finishedAtTS >= statsMonthM2.start && project.finishedAtTS < statsMonthM1.start) {
      statsMonthM1.finishedProjects.push(project)
      return
    }
  })


  startedProjects.forEach(project => {
    console.log('startedAt', project.finishedAtTS)

    if (project.startedAtTS >= statsThisMonth.start) {
      statsThisMonth.startedProjects.push(project)
      return
    } else if (project.startedAtTS >= statsMonthM1.start && project.startedAtTS < statsThisMonth.start) {
      statsMonthM1.startedProjects.push(project)
      return
    } else if (project.startedAtTS >= statsMonthM2.start && project.startedAtTS < statsMonthM1.start) {
      statsMonthM1.startedProjects.push(project)
      return
    }
  })

  statsThisMonth.earned = statsThisMonth.finishedProjects.reduce((sum, item) => sum + Number(item), 0)
  statsMonthM1.earned = statsMonthM1.finishedProjects.reduce((sum, item) => sum + Number(item), 0)
  statsMonthM2.earned = statsMonthM2.finishedProjects.reduce((sum, item) => sum + Number(item), 0)



  console.log(statsThisMonth, statsMonthM1, statsMonthM2)

  // console.log(yearNow, monthNow, dayNow)
  // const dt = new Date();
  // console.log(startOfMonth(dt).toString());

  return (
    <>
      <p>{firstName}, твои последние результаты:</p>
      {/* {{ thisYear }, { thisMonth }, { thisDay }, { startThisMonth.toString() }} */}

      {/* <p>{startMonthM1.toString()}</p>
      <p>{startMonthM2.toString()}</p>
      <p>{startMonthM3.toString()}</p> */}

      <table>
        <tbody>
          <tr>
            <td>Начато</td>
            <td>{statsMonthM2.startedProjects.length}</td>
            <td>{statsMonthM1.startedProjects.length}</td>
            <td>{statsThisMonth.startedProjects.length}</td>
          </tr>
          <tr>
            <td>Завершено</td>
            <td>{statsMonthM2.finishedProjects.length}</td>
            <td>{statsMonthM1.finishedProjects.length}</td>
            <td>{statsThisMonth.finishedProjects.length}</td>
          </tr>
          <tr>
            <td>Заработок</td>
            <td>{statsMonthM2.earned}</td>
            <td>{statsMonthM1.earned}</td>
            <td>{statsThisMonth.earned}</td>
          </tr>
          <tr>
            <td></td>
            <td>{months[thisMonth - 2]}</td>
            <td>{months[thisMonth - 1]}</td>
            <td>{months[thisMonth]}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
