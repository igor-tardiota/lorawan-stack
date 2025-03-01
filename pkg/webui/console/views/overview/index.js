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

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Breadcrumb from '@ttn-lw/components/breadcrumbs/breadcrumb'
import { useBreadcrumbs } from '@ttn-lw/components/breadcrumbs/context'

import Organizations from '@console/views/organizations'
import AdminPanel from '@console/views/admin-panel'
import Notifications from '@console/views/notifications'

import sharedMessages from '@ttn-lw/lib/shared-messages'

import UserSettingsView from '../user-settings'

import Overview from './overview'

const OverviewRoutes = () => {
  useBreadcrumbs('home', <Breadcrumb path="/" content={sharedMessages.home} />)

  return (
    <Routes>
      <Route index Component={Overview} />
      <Route path="organizations/*" Component={Organizations} />
      <Route path="admin-panel/*" Component={AdminPanel} />
      <Route path="user-settings/*" Component={UserSettingsView} />
      <Route path="notifications" element={<Navigate to="/notifications/inbox" />} />
      <Route path="notifications/:category/:id?" Component={Notifications} />
    </Routes>
  )
}
export default OverviewRoutes
