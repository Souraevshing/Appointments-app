import React, { useCallback, useEffect, useState } from 'react'
import { BiArchive } from 'react-icons/bi'

import Search from './components/Search'
import './App.css'
import AddAppointments from './components/AddAppointments'
import AppointmentInfo from './components/AppointmentInfo'

const App = () => {
  const [appointments, setAppointments] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState('petName')
  const [orderBy, setOrderBy] = useState('asc')

  const fetchAppointments = useCallback(() => {
    fetch('./fakeData.json')
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data)
      })
  }, [])

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  const searchAppointment = appointments
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
    .sort((a, b) => {
      const order = orderBy === 'asc' ? 1 : -1
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order
    })

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  return (
    <div className='App container mx-auto mt-3 font-thin'>
      <h1 className='text-5xl mb-5'>
        <BiArchive className='inline-block text-red-200 align-top' />
        Appointments
      </h1>
      <AddAppointments
        onSendAppointments={(newAppointment) =>
          setAppointments([...appointments, newAppointment])
        }
        lastId={appointments.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        searchValue={searchValue}
        handleChange={(e) => setSearchValue(e)}
        orderBy={orderBy}
        sortByOrder={(e) => setOrderBy(e)}
        sortBy={sortBy}
        sortByName={(e) => setSortBy(e)}
      />
      <ul className='divide-y divide-gray-600'>
        {searchAppointment.map((items, id) => {
          return (
            <AppointmentInfo
              items={items}
              key={items.id}
              deleteAppointment={deleteAppointment}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default App
