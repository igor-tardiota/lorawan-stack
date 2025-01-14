// Copyright © 2024 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useCallback, useState, useEffect } from 'react'
import DOM from 'react-dom'
import FocusLock from 'react-focus-lock'
import { RemoveScroll } from 'react-remove-scroll'
import { useDispatch, useSelector } from 'react-redux'

import { APPLICATION } from '@console/constants/entities'

import SearchPanel from '@ttn-lw/components/search-panel'

import PropTypes from '@ttn-lw/lib/prop-types'
import useRequest from '@ttn-lw/lib/hooks/use-request'
import attachPromise from '@ttn-lw/lib/store/actions/attach-promise'

import {
  getGlobalSearchResults,
  setSearchOpen,
  setSearchScope,
} from '@console/store/actions/search'
import { getTopEntities } from '@console/store/actions/top-entities'

import {
  selectSearchResults,
  selectSearchQuery,
  selectIsSearchOpen,
  selectSearchScope,
} from '@console/store/selectors/search'
import {
  selectApplicationTopEntities,
  selectTopEntitiesAll,
} from '@console/store/selectors/top-entities'

import style from './search-panel.styl'

const SearchPanelManager = () => {
  const isSearchOpen = useSelector(state => selectIsSearchOpen(state))
  const dispatch = useDispatch()

  // Add a handler for the Command+K keyboard shortcut.
  useEffect(() => {
    const handleSlashKey = event => {
      if ((event.key === 'k' || event.key === '/') && (event.metaKey || event.ctrlKey)) {
        dispatch(setSearchOpen(true))
      }
    }

    window.addEventListener('keydown', handleSlashKey)

    return () => window.removeEventListener('keydown', handleSlashKey)
  }, [dispatch])

  const handleClose = useCallback(() => {
    dispatch(setSearchScope(undefined))
    dispatch(setSearchOpen(false))
  }, [dispatch])

  if (!isSearchOpen) {
    return null
  }

  return DOM.createPortal(
    <SearchPanelInner onClose={handleClose} />,
    document.getElementById('modal-container'),
  )
}

const SearchPanelInner = ({ onClose }) => {
  const dispatch = useDispatch()
  const searchResults = useSelector(selectSearchResults)
  const scopedSearchResults = searchResults.filter(
    result => result.category === APPLICATION || result.category === 'top-entities',
  )
  const searchQuery = useSelector(selectSearchQuery)
  const searchScope = useSelector(selectSearchScope)
  const isApplicationScope = searchScope === APPLICATION
  const selectPath = isApplicationScope ? '/devices/add' : undefined

  const [searchResultsFetching, setSearchResultsFetching] = useState(false)
  const [searchResultsError, setSearchResultsError] = useState()
  const topEntitiesResult = useSelector(
    isApplicationScope ? selectApplicationTopEntities : selectTopEntitiesAll,
  )
  const topEntities = topEntitiesResult
    ? [
        {
          category: isApplicationScope ? APPLICATION : 'top-entities',
          source: 'top-entities',
          items: topEntitiesResult,
        },
      ]
    : []

  const [topItemsFetching, topItemsError] = useRequest(getTopEntities())

  const handleQueryChange = useCallback(
    async query => {
      if (query) {
        try {
          setSearchResultsFetching(true)
          await dispatch(attachPromise(getGlobalSearchResults(query)))
        } catch (error) {
          setSearchResultsError(error)
        } finally {
          setSearchResultsFetching(false)
        }
      }
    },
    [dispatch],
  )

  return (
    <FocusLock autoFocus returnFocus>
      <RemoveScroll>
        <div key="shadow" className={style.shadow} onClick={onClose} />
        <SearchPanel
          searchQuery={searchQuery}
          searchResults={isApplicationScope ? scopedSearchResults : searchResults}
          searchResultsFetching={searchResultsFetching}
          topEntities={topEntities}
          topEntitiesFetching={topItemsFetching}
          onClose={onClose}
          onQueryChange={handleQueryChange}
          error={topItemsError || searchResultsError}
          selectPath={selectPath}
          scope={searchScope}
        />
      </RemoveScroll>
    </FocusLock>
  )
}

SearchPanelInner.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default SearchPanelManager
