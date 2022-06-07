/*eslint-disable*/
import React from "react"
import clsx from 'clsx'

import {
  Drawer,
  List,
  makeStyles
} from '@material-ui/core'
import RedeemIcon from '@material-ui/icons/Redeem'
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
import NavbarContainer from 'components/NavbarContainer/NavbarContainer'
import NavbarLogo from 'components/NavbarLogo/NavbarLogo'
import NavLink from "./Navlink/NavLink"

import styles from "./sidebarStyles"

const useStyles = makeStyles(styles);

const navLinks = [{
  header: 'Đơn hàng',
  link: '/so',
  activeURL: ['/so','/so'],
  // iconComponent: ShoppingCartOutlinedIcon,
  permissionCode: 'so',
},{
  header: 'Sản phẩm',
  link: '/products',
  activeURL: '/products',
  // iconComponent: ProductIcon,
  childrenLinks: [{
    header: 'Danh sách sản phẩm',
    link: '/products',
    linkExact: true,
    activeURL: '/products',
    permissionCode: 'products'
  },{
    header: 'Sản phẩm khuyến mãi',
    link: '/products/bonus',
    activeURL: '/products/bonus',
    permissionCode: 'product_bonus'
  }],
  permissionCode: ['products','product_bonus'],
},{
  header: 'Khách hàng',
  link: '/customers',
  activeURL: '/customers',
  permissionCode: 'customer',
},{
  header: 'Khuyến mãi',
  link: '/promotions',
  activeURL: '/promotions',
  permissionCode: 'promotion',
},{
  header: 'Chính sách giá',
  link: '/policy',
  activeURL: '/policy',
  permissionCode: 'policy',
},{
  header: 'Nhóm',
  link: '/group',
  activeURL: '/group',
},,{
  header: 'Trang trí shop',
  link: '/shop-decoration',
  activeURL: '/shop-decoration',
}]

const Sidebar = (props) => {
  const {
    open,
    positionFixed,
    onSidebarToggle,
    onSidebarClose,
  } = props;

  const classes = useStyles();
  
  const drawerContainer = (
    <div 
      onMouseEnter={() => !positionFixed ? onSidebarToggle() : {}} 
      onMouseLeave={() => !positionFixed ? onSidebarClose() : {}} 
      className={classes.drawerContainer}
    >
      <div className={classes.drawerContent}>
        <List>
          {navLinks.map((navLink, index) => (
            <NavLink 
              {...navLink}
              key={index}
              className={classes.listItem} 
              disabledCollapse={open}
            />
          ))}
        </List>
      </div>
    </div>
  )

  const drawer = (
    <Drawer
      variant="permanent"
      classes={{
        root: clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <NavbarContainer/>
      {drawerContainer}
    </Drawer>
  )

  const drawerFixed = (
    <Drawer
      anchor="left"
      open={open}
      variant="temporary"
      onClose={onSidebarClose}
      classes={{
        root: clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <NavbarContainer className={classes.toolbar}>
        <NavbarLogo
          onMenuButtonClick={onSidebarClose}
        />
      </NavbarContainer>
      {drawerContainer}
    </Drawer>
  )
  
  return positionFixed ? drawerFixed : drawer
}

Sidebar.propTypes = {
  
};

export default Sidebar