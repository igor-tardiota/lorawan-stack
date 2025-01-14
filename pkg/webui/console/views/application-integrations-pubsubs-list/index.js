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

import React from 'react'
import { useParams } from 'react-router-dom'

import PageTitle from '@ttn-lw/components/page-title'

import PubsubsTable from '@console/containers/pubsubs-table'

import sharedMessages from '@ttn-lw/lib/shared-messages'

const ApplicationPubsubsList = () => {
  const { appId } = useParams()

  return (
    <div className="container container--xxl p-0">
      <PageTitle title={sharedMessages.integrations} hideHeading />
      <div className="item-12">
        <PubsubsTable appId={appId} />
      </div>
    </div>
  )
}

export default ApplicationPubsubsList
