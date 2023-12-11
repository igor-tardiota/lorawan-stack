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

import SideBarContext from '@ttn-lw/containers/side-bar/context'

import Footer from '.'

export default {
  title: 'Sidebar/Footer',
  component: Footer,
  decorators: [
    storyFn => (
      <SideBarContext.Provider value={{ isMinimized: false }}>{storyFn()}</SideBarContext.Provider>
    ),
  ],
}

export const Default = () => (
  <div
    style={{ width: '17rem', height: '96vh' }}
    className="d-flex pos-fixed align-center direction-column"
  >
    <Footer supportLink={'/support'} documentationBaseUrl={'/docs'} statusPageBaseUrl={'/status'} />
  </div>
)
