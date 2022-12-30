import React, { useState, useRef, useEffect } from 'react'
import { BiCaretDown, BiSearch } from 'react-icons/bi'

import Dropdown from './DropDown'

const Search = ({
  handleChange,
  searchValue,
  orderBy,
  sortByOrder,
  sortBy,
  sortByName,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isMenuOpen])

  return (
    <div className='py-5'>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <BiSearch />
          <label htmlFor='query' className='sr-only' />
        </div>
        <input
          type='text'
          name='query'
          id='query'
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
          className='pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300'
          placeholder='Search'
        />
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <div>
            <button
              onClick={() => {
                setIsSortOpen(!isSortOpen)
              }}
              type='button'
              className='justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center outline-0'
              id='options-menu'
              aria-haspopup='true'
              aria-expanded='true'
            >
              Sort By <BiCaretDown className='ml-2' />
            </button>
            <Dropdown
              isSortOpen={isSortOpen}
              orderBy={orderBy}
              sortByOrder={(e) => sortByOrder(e)}
              sortBy={sortBy}
              sortByName={(e) => sortByName(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
