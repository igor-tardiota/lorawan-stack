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

import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'

import Form, { useFormContext } from '@ttn-lw/components/form'
import Select from '@ttn-lw/components/select'
import Icon from '@ttn-lw/components/icon'
import Checkbox from '@ttn-lw/components/checkbox'

import Message from '@ttn-lw/lib/components/message'

import { CONNECTION_TYPES } from '@console/containers/gateway-managed-gateway/utils'
import GatewayWifiProfilesFormFields from '@console/containers/gateway-managed-gateway/wifi-profiles/wifi-profiles-form-fields'
import ShowProfilesSelect from '@console/containers/gateway-managed-gateway/show-profiles-select'
import NetworkInterfaceAddressesFormFields from '@console/containers/gateway-managed-gateway/network-interface-addresses-form-fields'

import tooltipIds from '@ttn-lw/lib/constants/tooltip-ids'

const m = defineMessages({
  ethernet: 'Ethernet',
  wifi: 'WiFi',
  settingsProfile: 'Settings profile',
  profileDescription: 'Connection settings profiles can be shared within the same organization',
  wifiConnection: 'WiFi connection',
  ethernetConnection: 'Ethernet connection',
  selectAProfile: 'Select a profile',
  connected: 'The gateway {connection} successfully connected using this profile',
  unableToConnect: 'The gateway {connection} is currently unable to connect using this profile',
  attemptingToConnect:
    'The gateway {connection} is currently attempting to connect using this profile',
  saveToConnect:
    'Please click "Save changes" to start using this {connection} profile for the gateway',
  enableEthernetConnection: 'Enable ethernet connection',
  useStaticIp: 'Use a static IP address',
})

const getTitle = type => {
  switch (type) {
    case CONNECTION_TYPES.WIFI:
      return m.wifiConnection
    default:
      return m.ethernetConnection
  }
}

const WifiSettingsFormFields = ({ index }) => {
  const { values } = useFormContext()
  const profileOptions = [
    { value: '0', label: 'profile1' },
    { value: '1', label: 'profile2' },
    { value: '2', label: 'Create new profile...' },
  ]

  const isConnected = 0

  const connectionStatus = useMemo(() => {
    if (isConnected === 1) {
      return { message: m.connected, icon: 'valid' }
    }
    if (isConnected === 2) {
      return { message: m.unableToConnect, icon: 'cancel' }
    }
    if (isConnected === 3) {
      return { message: m.attemptingToConnect, icon: 'more_horiz' }
    }
    if (isConnected === 4) {
      return { message: m.saveToConnect, icon: 'more_horiz' }
    }
    return null
  }, [])

  return (
    <>
      <Message component="h3" content={getTitle(values.settings[index]._connection_type)} />
      <div className="d-flex al-center gap-cs-m">
        <ShowProfilesSelect name={`settings.${index}.shared`} />
        <Form.Field
          name={`settings.${index}.profile`}
          title={m.settingsProfile}
          component={Select}
          options={profileOptions}
          tooltipId={tooltipIds.GATEWAY_SHOW_PROFILES}
          placeholder={m.selectAProfile}
        />
      </div>
      <Message component="div" content={m.profileDescription} className="tc-subtle-gray mb-cs-m" />
      {values.settings[index].profile === '2' && (
        <GatewayWifiProfilesFormFields namePrefix={`settings.${index}.`} />
      )}
      {connectionStatus !== null && (
        <div className="d-flex al-center gap-cs-xs">
          <Icon icon={connectionStatus.icon} />
          <Message
            content={connectionStatus.message}
            values={{
              connection: m[values.settings[index]._connection_type].defaultMessage,
            }}
          />
        </div>
      )}
    </>
  )
}

WifiSettingsFormFields.propTypes = {
  index: PropTypes.number.isRequired,
}

const EthernetSettingsFormFields = ({ index }) => {
  const { values } = useFormContext()

  return (
    <>
      <Message component="h3" content={getTitle(values.settings[index]._connection_type)} />
      <Form.Field
        name={`settings.${index}.enable_ethernet_connection`}
        component={Checkbox}
        label={m.enableEthernetConnection}
      />
      {values.settings[index].enable_ethernet_connection && (
        <>
          <Form.Field
            name={`settings.${index}.use_static_ip`}
            component={Checkbox}
            label={m.useStaticIp}
          />
          <NetworkInterfaceAddressesFormFields
            namePrefix={`settings.${index}.`}
            showOnlyDns={!values.settings[index].use_static_ip}
          />
        </>
      )}
    </>
  )
}

EthernetSettingsFormFields.propTypes = {
  index: PropTypes.number.isRequired,
}

const GatewayConnectionSettingsFormFields = () => (
  <>
    <WifiSettingsFormFields index={0} />
    <EthernetSettingsFormFields index={1} />
  </>
)

export default GatewayConnectionSettingsFormFields
