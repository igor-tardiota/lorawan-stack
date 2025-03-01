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
import { FormattedNumber, defineMessages } from 'react-intl'
import classNames from 'classnames'
import ReactApexChart from 'react-apexcharts'

import Message from '@ttn-lw/lib/components/message'

import PropTypes from '@ttn-lw/lib/prop-types'

import style from './gateway-status-panel.styl'

const m = defineMessages({
  frequencyRange: '{minFreq} - {maxFreq}MHz',
})

const options = {
  chart: {
    type: 'radialBar',
  },
  grid: {
    padding: {
      left: -5,
      right: -5,
      bottom: -9,
      top: -5,
    },
  },
  colors: [
    ({ value }) => {
      if (value < 55) {
        return '#1CB041'
      } else if (value === 100) {
        return '#DB2328'
      }

      return '#DB7600'
    },
  ],
  stroke: {
    lineCap: 'round',
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  plotOptions: {
    radialBar: {
      track: {
        show: true,
        margin: 0.9,
      },
      dataLabels: {
        show: false,
      },
    },
  },
}

const DutyCycleUtilization = ({ band }) => {
  const maxFrequency = isNaN(band.max_frequency / 1e6) ? 0 : band.max_frequency / 1e6
  const minFrequency = isNaN(band.min_frequency / 1e6) ? 0 : band.min_frequency / 1e6
  const utilization = band.downlink_utilization
    ? (band.downlink_utilization * 100) / band.downlink_utilization_limit
    : 0

  return (
    <div className={style.gtwStatusPanelDutyCycle}>
      <Message
        content={m.frequencyRange}
        values={{
          minFreq: <FormattedNumber minimumFractionDigits={1} value={minFrequency.toFixed(1)} />,
          maxFreq: <FormattedNumber minimumFractionDigits={1} value={maxFrequency.toFixed(1)} />,
        }}
        className="fs-s"
      />
      <div className="d-flex al-center j-center gap-cs-xs">
        <div className="sm-md:d-none">
          <ReactApexChart
            options={options}
            series={[utilization.toFixed(2)]}
            type="radialBar"
            height={20}
            width={20}
          />
        </div>
        <span
          className={classNames('fs-s fw-bold', {
            'c-text-success-normal': utilization <= 60,
            'c-text-warning-normal': utilization > 60 && utilization < 100,
            'c-text-error-normal': utilization === 100,
          })}
          style={{ minWidth: '39px' }}
        >
          <FormattedNumber
            style="percent"
            value={
              isNaN(band.downlink_utilization / band.downlink_utilization_limit)
                ? 0
                : band.downlink_utilization / band.downlink_utilization_limit
            }
            minimumFractionDigits={2}
          />
        </span>
      </div>
    </div>
  )
}

DutyCycleUtilization.propTypes = {
  band: PropTypes.shape({
    downlink_utilization: PropTypes.number,
    downlink_utilization_limit: PropTypes.number,
    max_frequency: PropTypes.string,
    min_frequency: PropTypes.string,
  }).isRequired,
}

export default DutyCycleUtilization
