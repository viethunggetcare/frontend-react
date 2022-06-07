import React from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoginUser } from 'redux/selectors';
import classes from './ServicesPanel.module.scss';

function ServicesPanel(props) {
  const appList = [
    {
      id: 'oms',
      name: 'Quản lý đơn hàng',
      shortName: 'OMS',
      url: `${process.env.REACT_APP_PATH_OMS}`,
      bgColor: '#ed1c24',
    },
    {
      id: 'ecom',
      name: 'Gian hàng online',
      shortName: 'ECOM',
      url: `${process.env.REACT_APP_PATH_ECOM}`,
      bgColor: '#60935d',
    },
    {
      id: 'erp_vendor',
      name: 'Phần mềm Quản lý Doanh nghiệp',
      shortName: 'ERP Vendor',
      url: `${process.env.REACT_APP_PATH_ERP_VENDOR}`,
      bgColor: '#f1d302',
    },
    {
      id: 'mdm',
      name: 'Quản lý dữ liệu',
      shortName: 'MDM',
      url: `${process.env.REACT_APP_PATH_MDM}`,
      bgColor: '#b79492',
    },
    {
      id: 'tmk',
      name: 'Chương trình Giá & Khuyến Mãi',
      shortName: 'TMK',
      url: `${process.env.REACT_APP_PATH_TMK}`,
      bgColor: '#3d348b',
    },
    {
      id: 'vendor',
      name: 'Quản lý Gian hàng',
      shortName: 'Vendor',
      url: `${process.env.REACT_APP_PATH_VENDOR}`,
      bgColor: '#3e92cc',
    },
    {
      id: 'pms',
      name: 'Phần Mềm Quản lý nhà thuốc',
      shortName: 'PMS',
      url: `${process.env.REACT_APP_PATH_PMS}`,
      bgColor: '#fc7a57',
    },
  ];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  const {user} = props;

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.ServicesPanel}>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        className={`${classes.IconWrap} ${open ? classes.Active : ''}`}
        style={props.style && { ...props.style }}
        onClick={handleToggle}
      >
        <AppsRoundedIcon fontSize={props.iconSize} style={{ color: 'inherit' }} />
    
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom"
        style={{
          minWidth: anchorRef && anchorRef.current && anchorRef.current.offsetWidth,
          marginTop: '0.25rem',
          zIndex: 3,
        }}
        className={classes.Poper}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <div className={classes.Panel}>
                  <div className={classes.AppsList}>
                  { (user && user.id) ? (
                    user.modules.map(app => (
                        <Tooltip key={app.code} title={app.name} arrow placement="top">
                          <a
                            href={`${window.location.origin.toLowerCase()}/` ===  app?.url?.toLowerCase() ? window.location.href : app.url }
                            target={`${window.location.origin.toLowerCase()}/` ===  app?.url?.toLowerCase() ? '_self' : '_blank' }
                            rel="noopener noreferrer"
                            className={ `${classes.AppItem} ${classes[app.code]}`}
                          > 
                            { app.short_name }
                          </a>
                        </Tooltip>
                      ))
                      ) :  appList.map(app => (
                        <Tooltip key={app.id} title={app.name} arrow placement="top">
                          <a
                            href={`${window.location.origin.toLowerCase()}/` ===  app.url.toLowerCase() ? window.location.href : app.url}
                            target={`${window.location.origin.toLowerCase()}/` ===  app.url.toLowerCase() ? '_self' : '_blank' }
                            rel="noopener noreferrer"
                            className={classes.AppItem}
                            style={{ backgroundColor: app.bgColor }}
                          > 
                            { app.shortName }
                          </a>
                        </Tooltip>
                      ))
                    }
                  </div>
                  <div className={classes.PanelFooter}>
                    <Button className={classes.FullAppsBtn} disabled variant="outlined">
                      More from Phahub
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  user: makeSelectLoginUser(),
});
const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(ServicesPanel);

