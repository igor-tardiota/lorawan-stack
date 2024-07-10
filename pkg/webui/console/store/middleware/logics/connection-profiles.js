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

import tts from '@console/api/tts'

import { CONNECTION_TYPES } from '@console/containers/gateway-managed-gateway/shared/utils'

import createRequestLogic from '@ttn-lw/lib/store/logics/create-request-logic'

import * as connectionProfiles from '@console/store/actions/connection-profiles'

import { selectUserId } from '@account/store/selectors/user'

const getConnectionProfilesLogic = createRequestLogic({
  type: connectionProfiles.GET_CONNECTION_PROFILES_LIST,
  latest: true,
  process: async ({ action, getState }) => {
    const { params, entityId, type } = action.payload
    const { selectors } = action.meta
    const userId = selectUserId(getState())
    let data = {
      profiles: [],
    }
    if (type === CONNECTION_TYPES.WIFI) {
      if (entityId === userId) {
        data = await tts.ConnectionProfiles.getWifiProfilesForUser(entityId, params, selectors)
      } else {
        data = await tts.ConnectionProfiles.getWifiProfilesForOrganization(
          entityId,
          params,
          selectors,
        )
      }
    }

    return {
      entities: data.profiles,
      type,
    }
  },
})

const deleteConnectionProfileLogic = createRequestLogic({
  type: connectionProfiles.DELETE_CONNECTION_PROFILE,
  process: async ({ action }) => {
    const { id } = action.payload

    // TODO: Change call to delete connection profiles
    // await tts.Authorizations.deleteToken(userId, clientId, id)

    return { id }
  },
})

const filterBestRSSI = accessPoints => {
  const ssidMap = new Map()

  accessPoints.forEach(ap => {
    if (!ssidMap.has(ap.ssid) || ssidMap.get(ap.ssid).rssi < ap.rssi) {
      ssidMap.set(ap.ssid, ap)
    }
  })

  return Array.from(ssidMap.values())
}

const getAccessPointsLogic = createRequestLogic({
  type: connectionProfiles.GET_ACCESS_POINTS,
  process: async ({ action }) => {
    const { gatewayId, gatewayEui } = action.payload
    try {
      const result = await tts.ConnectionProfiles.getAccessPoints(gatewayId, gatewayEui)
      return filterBestRSSI(result?.access_points ?? [])
    } catch (e) {
      return []
    }
  },
})

export default [getConnectionProfilesLogic, deleteConnectionProfileLogic, getAccessPointsLogic]
