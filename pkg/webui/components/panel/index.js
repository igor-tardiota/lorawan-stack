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
import classnames from 'classnames'

import Icon, { IconArrowUpRight } from '@ttn-lw/components/icon'
import Button from '@ttn-lw/components/button'

import Message from '@ttn-lw/lib/components/message'

import PropTypes from '@ttn-lw/lib/prop-types'

import Link from '../link'

import Toggle from './toggle'

import styles from './panel.styl'

const PanelError = ({ className, children }) => (
  <div className={classnames(className, 'd-flex', 'j-center', 'h-full', 'al-center')}>
    {children}
  </div>
)

PanelError.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
}

PanelError.defaultProps = {
  className: undefined,
}

const Panel = ({
  children,
  title,
  icon,
  iconClassName,
  toggleOptions,
  activeToggle,
  onToggleClick,
  onMouseEnter,
  onMouseLeave,
  shortCutLinkTitle,
  shortCutLinkPath,
  className,
  messageDecorators,
  divider,
  shortCutLinkTarget,
  shortCutLinkDisabled,
  shortCutLinkButton,
  compact,
}) => (
  <div
    className={classnames(styles.panel, className, {
      [styles.divider]: divider,
      [styles.compact]: compact,
    })}
    data-test-id={`overview-panel-${title?.defaultMessage ?? ''}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {title && (
      <div className={styles.panelHeader}>
        <div className="d-flex gap-cs-xs al-center overflow-hidden">
          {icon && (
            <Icon icon={icon} className={classnames(styles.panelHeaderIcon, iconClassName)} />
          )}
          <Message content={title} className={styles.panelHeaderTitle} />
          {messageDecorators}
        </div>
        {toggleOptions ? (
          <Toggle options={toggleOptions} active={activeToggle} onToggleChange={onToggleClick} />
        ) : (
          <>
            {shortCutLinkButton && !shortCutLinkTitle && (
              <Button.Link
                to={shortCutLinkPath}
                target={shortCutLinkTarget}
                disabled={shortCutLinkDisabled}
                icon={IconArrowUpRight}
                primary
                naked
                large
              />
            )}
            {shortCutLinkTitle && !shortCutLinkButton && (
              <Link
                primary
                to={shortCutLinkPath}
                className={styles.panelButton}
                target={shortCutLinkTarget}
                disabled={shortCutLinkDisabled}
              >
                <Message content={shortCutLinkTitle} /> →
              </Link>
            )}
          </>
        )}
      </div>
    )}
    {children}
  </div>
)

Panel.propTypes = {
  activeToggle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  compact: PropTypes.bool,
  divider: PropTypes.bool,
  icon: PropTypes.icon,
  iconClassName: PropTypes.string,
  messageDecorators: PropTypes.node,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onToggleClick: PropTypes.func,
  shortCutLinkButton: PropTypes.bool,
  shortCutLinkDisabled: PropTypes.bool,
  shortCutLinkPath: PropTypes.string,
  shortCutLinkTarget: PropTypes.string,
  shortCutLinkTitle: PropTypes.message,
  title: PropTypes.message,
  toggleOptions: PropTypes.arrayOf(PropTypes.shape({})),
}

Panel.defaultProps = {
  icon: undefined,
  toggleOptions: undefined,
  activeToggle: undefined,
  onToggleClick: () => null,
  onMouseEnter: () => null,
  onMouseLeave: () => null,
  className: undefined,
  compact: false,
  messageDecorators: undefined,
  divider: false,
  shortCutLinkDisabled: false,
  shortCutLinkButton: false,
  shortCutLinkPath: undefined,
  shortCutLinkTitle: undefined,
  shortCutLinkTarget: undefined,
  iconClassName: undefined,
  title: undefined,
}

export { Panel as default, PanelError }
