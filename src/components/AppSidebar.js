import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)

  const type = JSON.parse(localStorage.getItem('info'))?.type

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        NAROLA SUPPORT
      </CSidebarBrand>
      {/* <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand> */}
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav
            items={navigation.filter(
              (ele) =>
                (type === 3 ? ele.to !== '/users' : true) &&
                (type === 1 ? true : ele.to !== '/ticketTypes'),
            )}
          />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
          // dispatch({ type: 'set',  !sidebarShow })
        }}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
