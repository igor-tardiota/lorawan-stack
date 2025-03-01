// Copyright © 2021 The Things Network Foundation, The Things Industries B.V.
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

import { PAGE_SIZES } from '@ttn-lw/constants/page-sizes'

import IntlHelmet from '@ttn-lw/lib/components/intl-helmet'

import ApiKeysTable from '@console/containers/api-keys-table'

import sharedMessages from '@ttn-lw/lib/shared-messages'

import { getApiKeysList } from '@console/store/actions/api-keys'

import { selectApiKeys, selectApiKeysTotalCount } from '@console/store/selectors/api-keys'

const OrganizationApiKeysList = () => {
  const { orgId } = useParams()

  const getApiKeys = React.useCallback(
    filters => getApiKeysList('organization', orgId, filters),
    [orgId],
  )
  const baseDataSelector = React.useCallback(
    state => {
      const id = { id: orgId }
      return {
        keys: selectApiKeys(state, id),
        totalCount: selectApiKeysTotalCount(state, id),
      }
    },
    [orgId],
  )

  return (
    <div className="container container--xxl p-0">
      <IntlHelmet title={sharedMessages.apiKeys} />
      <div className="item-12">
        <ApiKeysTable
          pageSize={PAGE_SIZES.REGULAR}
          baseDataSelector={baseDataSelector}
          getItemsAction={getApiKeys}
        />
      </div>
    </div>
  )
}

export default OrganizationApiKeysList
