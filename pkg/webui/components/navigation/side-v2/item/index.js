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

import React, { useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'

import Dropdown from '@ttn-lw/components/dropdown-v2'
import MenuLink from '@ttn-lw/components/sidebar/side-menu-link'
import Button from '@ttn-lw/components/button'
import Icon from '@ttn-lw/components/icon'

import Message from '@ttn-lw/lib/components/message'

import PropTypes from '@ttn-lw/lib/prop-types'

import SideNavigationList from '../list'

import style from './item.styl'

const handleItemClick = event => {
  if (event && event.target) {
    event.target.blur()
  }
}

const SideNavigationItem = props => {
  const { className, children, title, depth, icon, path, exact, isActive, isMinimized } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpandCollapsableItem = useCallback(() => {
    setIsExpanded(isExpanded => !isExpanded)
    document.activeElement.blur()
  }, [])

  useEffect(() => {
    // Make sure that the item corresponding to the currently open path is expanded
    // on initial render, if applicable
    if (Boolean(children)) {
      const paths = React.Children.toArray(children).reduce(
        (paths, child) => [...paths, ...(Boolean(child) ? child.props.path : [])],
        [],
      )
      for (const path of paths) {
        if (location.pathname.includes(path)) {
          setIsExpanded(true)
          return
        }
      }
    }
  }, [children])

  return (
    <li className={classnames(className, style.item)}>
      {Boolean(children) ? (
        <CollapsableItem
          title={title}
          icon={icon}
          onClick={handleExpandCollapsableItem}
          depth={depth}
          isActive={isActive}
          isExpanded={isExpanded}
          isMinimized={isMinimized}
          children={children}
          currentPathName={location.pathname}
          onDropdownItemsClick={handleItemClick}
        />
      ) : (
        <LinkItem
          title={title}
          icon={icon}
          exact={exact}
          path={path}
          depth={depth}
          onDropdownItemsClick={handleItemClick}
        />
      )}
    </li>
  )
}

SideNavigationItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number,
  /** A flag specifying whether the path of the linkable item should be matched exactly or not. */
  exact: PropTypes.bool,
  /** The name of the icon for the side navigation item. */
  icon: PropTypes.string,
  /** A flag specifying whether the side navigation item is active or not. */
  isActive: PropTypes.bool,
  isMinimized: PropTypes.bool,
  /** The path of the linkable side navigation item. */
  path: PropTypes.string,
  /** The title of the side navigation item. */
  title: PropTypes.message.isRequired,
}

SideNavigationItem.defaultProps = {
  className: undefined,
  children: undefined,
  exact: false,
  icon: undefined,
  isActive: false,
  depth: 0,
  path: undefined,
  isMinimized: false,
}

const CollapsableItem = ({
  children,
  onClick,
  isExpanded,
  isMinimized,
  title,
  icon,
  depth,
  onDropdownItemsClick,
  currentPathName,
}) => {
  const subItems = children
    .filter(item => Boolean(item) && 'props' in item)
    .map(item => ({
      title: item.props.title,
      path: item.props.path,
      icon: item.props.icon,
    }))

  const subItemActive = subItems.some(item => currentPathName.includes(item.path))

  return (
    <>
      <Button
        className={classnames(style.button, {
          'j-start': !isMinimized,
          'j-center': isMinimized,
          'pl-cs-xs': !isMinimized,
          'pl-0': !isMinimized,
          [style.buttonActive]: isMinimized && subItemActive,
        })}
        unstyled
        onClick={onClick}
      >
        {icon && <Icon icon={icon} className={style.icon} />}
        {!isMinimized && (
          <>
            <Message content={title} className={style.message} />
            <Icon
              icon="keyboard_arrow_down"
              className={classnames(style.expandIcon, {
                [style.expandIconOpen]: isExpanded,
              })}
            />
          </>
        )}
        {isMinimized && (
          <div className={style.flyOutListContainer}>
            <Dropdown open className={style.flyOutList} onItemsClick={onDropdownItemsClick}>
              <Dropdown.HeaderItem title={title.defaultMessage} />
              {subItems.map(item => (
                <Dropdown.Item
                  key={item.path}
                  title={item.title}
                  path={item.path}
                  icon={item.icon}
                />
              ))}
            </Dropdown>
          </div>
        )}
      </Button>
      {!isMinimized && (
        <SideNavigationList depth={depth + 1} isExpanded={isExpanded} className={style.subItems}>
          {children}
        </SideNavigationList>
      )}
    </>
  )
}

CollapsableItem.propTypes = {
  children: PropTypes.node,
  currentPathName: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.string,
  isExpanded: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDropdownItemsClick: PropTypes.func,
  title: PropTypes.message.isRequired,
}

CollapsableItem.defaultProps = {
  children: undefined,
  icon: undefined,
  onDropdownItemsClick: () => null,
}

const LinkItem = ({ onClick, title, icon, exact, path }) => {
  const handleLinkItemClick = useCallback(
    event => {
      document.activeElement.blur()
      onClick(event)
    },
    [onClick],
  )

  return (
    <>
      <MenuLink path={path} title={title} icon={icon} onClick={handleLinkItemClick} exact={exact} />
    </>
  )
}

LinkItem.propTypes = {
  exact: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  title: PropTypes.message.isRequired,
}

LinkItem.defaultProps = {
  icon: undefined,
  path: undefined,
  onClick: () => null,
}

export default SideNavigationItem
