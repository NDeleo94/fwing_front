import React from 'react'
import { useParams } from 'react-router-dom';

export const PasswordPage = () => {

    const { token } = useParams();
    console.log(token)
  return (
    <div>PasswordPage</div>
  )
}
