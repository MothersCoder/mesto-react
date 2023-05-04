import React from 'react';
import { api } from '../utils/Api';

export const CurrentUserContext = React.createContext();

export const UserData = () => {
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  return (currentUser)
}
