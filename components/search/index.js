import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { searchCurrent } from 'Actions'

import styles from 'Styles/Home.module.scss'

export default function Search() {
  const dispatch = useDispatch()

  const [search, setSearch] = useState();

  const searchHandler = async (e) => {
    e.preventDefault();
    dispatch(searchCurrent(search))
  }

  return (
    <form className={styles.form} onSubmit={(e) => searchHandler(e)}>
      <input type="text" className={styles.search_input} placeholder="Enter city name" onChange={(e) => setSearch(e.target.value)} />
      <button><img src="search.svg" /></button>
    </form>
  )
}