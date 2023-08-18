// Copyright © 2023 The Things Network Foundation, The Things Industries B.V.
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

import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-grid-system'
import classNames from 'classnames'

import Button from '@ttn-lw/components/button'

import DateTime from '@ttn-lw/lib/components/date-time'

import Notification from '@console/components/notifications'

import attachPromise from '@ttn-lw/lib/store/actions/attach-promise'
import PropTypes from '@ttn-lw/lib/prop-types'

import { updateNotificationStatus } from '@console/store/actions/notifications'

import { selectUserId } from '@console/store/selectors/logout'

import style from '../notifications.styl'

const NotificationContent = ({ selectedNotification, setArchiving, fetchItems }) => {
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()

  const handleArchive = useCallback(
    async (e, id) => {
      setArchiving(true)
      await dispatch(
        attachPromise(updateNotificationStatus(userId, [id], 'NOTIFICATION_STATUS_ARCHIVED')),
      )
      setTimeout(async () => await fetchItems(), 300)
    },
    [dispatch, userId, fetchItems, setArchiving],
  )

  return (
    <>
      <Row justify="between" className={classNames(style.notificationHeader, 'm-0')}>
        <Col md={7.5}>
          <h3 className="m-0">
            <Notification.Title
              data={selectedNotification}
              notificationType={selectedNotification.notification_type}
            />
          </h3>
        </Col>
        <Col md={4.5}>
          <DateTime
            value={selectedNotification.created_at}
            dateFormatOptions={{ day: 'numeric', month: 'long', year: 'numeric' }}
            timeFormatOptions={{
              hour: 'numeric',
              minute: 'numeric',
              hourCycle: 'h23',
            }}
            className={style.notificationDate}
          />
          <Button
            onClick={handleArchive}
            message="Archive"
            icon="archive"
            value={selectedNotification.id}
            textPaddedRight
          />
        </Col>
      </Row>
      <Row direction="column" className="m-0">
        <Col>
          <Notification.Content
            reciever={userId}
            data={selectedNotification}
            notificationType={selectedNotification.notification_type}
          />
        </Col>
      </Row>
    </>
  )
}

NotificationContent.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  selectedNotification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    notification_type: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
  setArchiving: PropTypes.func.isRequired,
}

export default NotificationContent
