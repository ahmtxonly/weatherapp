import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link'

import { SearchInput, MultiResult } from 'Components'
import { slug } from 'Utils'
import { resetSearchCurrent } from 'Actions'

import styles from 'Styles/Home.module.scss'

export default function Home(props) {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.search) || {};

  const { ssrData } = props;

  useEffect(() => {
    dispatch(resetSearchCurrent());
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>


      <div className={styles.searchSide}>
        <SearchInput />
      </div>

      {
        data?.name && <Link href={`/detail/${slug(data?.name)}`}>
          <a className={styles.currentResult}>
            <div className={styles.statusIcon}>
              <img src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} />
            </div>
            <div className={styles.detailSide}>
              <div className={styles.cityAndStatus}>
                <span>{data?.name}, {data?.sys?.country}</span>
                <img src={`http://openweathermap.org/images/flags/${data?.sys?.country.toLowerCase()}.png`} className={styles.flag} />
              </div>
              <div className={styles.weatherStatus}>
                {data?.weather[0]?.description}
              </div>
            </div>
            <div className={styles.instantResult}>
              <span className={styles.mainTemp}>
                {Math.round(data?.main?.temp)}°С
          </span>
              <span className={styles.dailyStatus}>
                {Math.round(data?.main?.temp_min)}°С / {Math.round(data?.main?.temp_max)}°С
          </span>
            </div>
          </a>
        </Link>
      }

      <div className={styles.five_daily_result}>
        {
          <div className={styles.daily_result}>
            <div className={styles.five_daily_title}>Ankara, İstanbul, İzmir, Antalya and Berlin weather results</div>
            <div className={`${styles.hours} ${styles.hours_home}`}>
              {ssrData?.list?.map((hourly, hourlyIndex) => <MultiResult key={hourlyIndex} hourly={hourly} home />)}
            </div>
          </div>
        }
      </div>
    </div>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${process.env.apiUrl}/group?id=323786,745042,311044,323776,2950159&appid=${process.env.apiKey}&units=metric`)
  const resData = await res.json()
  return { props: { ssrData: resData } }
}