import React from 'react'

import { useNavigate } from 'react-router-dom'

import { LearnCard } from 'modules/learnCard/LearnCard'
import s from 'modules/learnCard/LearnCard.module.scss'

export const LearnPage = () => {
  const navigate = useNavigate()

  console.log('learn page')

  return (
    <>
      <div onClick={() => navigate(-1)} className={`${s.link}`}>
        <p>&lArr; Back to Pack List</p>
      </div>
      <LearnCard />
    </>
  )
}
