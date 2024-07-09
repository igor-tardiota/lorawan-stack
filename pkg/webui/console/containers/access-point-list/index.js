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

import React, { useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import { defineMessages } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@ttn-lw/components/icon'
import Button from '@ttn-lw/components/button'
import Spinner from '@ttn-lw/components/spinner'

import DateTime from '@ttn-lw/lib/components/date-time'
import Message from '@ttn-lw/lib/components/message'

import PropTypes from '@ttn-lw/lib/prop-types'
import sharedMessages from '@ttn-lw/lib/shared-messages'
import attachPromise from '@ttn-lw/lib/store/actions/attach-promise'
import { selectFetchingEntry } from '@ttn-lw/lib/store/selectors/fetching'

import { getAccessPoints } from '@console/store/actions/connection-profiles'

import { selectSelectedGateway } from '@console/store/selectors/gateways'
import { selectAccessPoints } from '@console/store/selectors/connection-profiles'

import style from './access-point-list.styl'

PropTypes.accessPoint = PropTypes.shape({
  _type: PropTypes.oneOf(['all', 'other']),
  ssid: PropTypes.string,
  bssid: PropTypes.string,
  channel: PropTypes.number,
  authentication_mode: PropTypes.string,
  rssi: PropTypes.number,
})

const m = defineMessages({
  lastRefresh: 'Last refresh',
  description:
    'This list shows WiFi networks as detected by your gateway. You can select an access point or choose "Other..." to enter an SSID of a hidden access point.',
})

const computeDeltaInSeconds = (from, to) => {
  // Avoid situations when server clock is ahead of the browser clock.
  if (from > to) {
    return 0
  }

  return Math.floor((from - to) / 1000)
}

const AccessPointListItem = ({ accessPoint, onClick, isActive }) => {
  const handleClick = useCallback(() => {
    onClick(accessPoint)
  }, [accessPoint, onClick])
  const isOther = accessPoint._type === 'other'

  return (
    <div
      className={classnames(style.item, 'd-flex al-center j-between', {
        [style.active]: isActive,
      })}
      onClick={handleClick}
    >
      <div className="d-flex al-center gap-cs-xs">
        {!isOther && <Icon icon="wifi" />}
        {isOther ? <Message content={sharedMessages.otherOption} /> : accessPoint.ssid}
      </div>
      {accessPoint.authentication_mode !== 'open' && !isOther && <Icon icon="lock" />}
    </div>
  )
}

AccessPointListItem.propTypes = {
  accessPoint: PropTypes.accessPoint.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

const AccessPointList = ({ onChange, value, className, inputWidth, onBlur }) => {
  const [lastRefresh, setLastRefresh] = useState(undefined)

  const dispatch = useDispatch()
  const isLoading = useSelector(state => selectFetchingEntry(state, 'GET_ACCESS_POINTS'))
  const accessPoints = useSelector(selectAccessPoints)
  const selectedGateway = useSelector(selectSelectedGateway)
  const { ids } = selectedGateway

  const handleScanAccessPoints = useCallback(() => {
    dispatch(attachPromise(getAccessPoints(ids.gateway_id, ids.eui))).then(() => {
      setLastRefresh(new Date())
    })
  }, [dispatch, ids.eui, ids.gateway_id])

  useEffect(() => {
    handleScanAccessPoints()
  }, [handleScanAccessPoints])

  const handleSelectAccessPoint = useCallback(
    accessPoint => {
      onChange(accessPoint, true)
    },
    [onChange],
  )

  return (
    <div className={classnames(className, style.container)} onBlur={onBlur}>
      <div className="w-full">
        {isLoading ? (
          <div className="d-flex mt-cs-m">
            <Spinner>
              <Message content={sharedMessages.fetching} />
            </Spinner>
          </div>
        ) : (
          <div className="d-flex gap-cs-l">
            <div className={classnames(style.list, [style[`input-width-${inputWidth}`]])}>
              {accessPoints.map(a => (
                <AccessPointListItem
                  key={a.bssid}
                  accessPoint={{ ...a, _type: 'all' }}
                  onClick={handleSelectAccessPoint}
                  isActive={value.bssid === a.bssid}
                />
              ))}
              <AccessPointListItem
                accessPoint={{ ssid: '', bssid: '', password: '', _type: 'other' }}
                onClick={handleSelectAccessPoint}
                isActive={value._type === 'other'}
              />
            </div>
            <Message content={m.description} className="tc-subtle-gray" />
          </div>
        )}

        <div className="d-flex al-center gap-cs-s mt-cs-m">
          <Button
            type="button"
            message={sharedMessages.scanAgain}
            onClick={handleScanAccessPoints}
            icon="autorenew"
          />
          {Boolean(lastRefresh) && (
            <div className="tc-subtle-gray d-flex gap-cs-xxs">
              <Message content={m.lastRefresh} />
              <DateTime.Relative
                value={lastRefresh}
                computeDelta={computeDeltaInSeconds}
                relativeTimeStyle="short"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AccessPointList.propTypes = {
  className: PropTypes.string,
  inputWidth: PropTypes.inputWidth,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.accessPoint.isRequired,
}

AccessPointList.defaultProps = {
  className: undefined,
  inputWidth: 'm',
}

export default AccessPointList
