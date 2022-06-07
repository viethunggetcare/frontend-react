import React, { PureComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import UserDropdown from './UserDropdown/UserDropdown';
import ServicesPanel from 'components/PageHeader/ServicesPanel/ServicesPanel';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { makeSelectLoginUser } from 'redux/selectors';
import classes from './PageHeader.module.scss';

class PageHeader extends PureComponent {
  getNavLinkClass = (pathArr) => {
    return pathArr.some((path) => this.props.location.pathname.split('/').includes(path.replace('/', '')))
      ? classes.Active
      : '';
  };
  
  handleGoToPage = (path) => {
    this.props.history.push(path);
  }

  render() {
    const {  user } = this.props;
    return (
      <div className={classes.Header}>
        <Link to="/" className={classes.Brand}>
          <img className={classes.Logo} src={`${process.env.REACT_APP_PATH}static/logo/logo-phahub.svg`} height="100" alt="Phahub" />
        </Link>
        <nav className={classes.HeaderNav}>
          <ul>
          { 
        user.getcare_menu
        .filter(x => x.code === 'products').length > 0  || user.getcare_menu
        .filter(x => x.code === 'product').length > 0  || user.getcare_menu
        .filter(x => x.code === 'product_bonus').length > 0 ?
            <li>
              <NavLink disabled to="/products" className={this.getNavLinkClass(['/products', '/product-bonus'])}>
                Sản phẩm
              </NavLink>
              <ul className={classes.SubNav}>
              { 
        user.getcare_menu
        .filter(x => x.code === 'products')
        .map(y => <li key={y}key={y}>
          <NavLink to={'/' + y.code} activeClassName={classes.Active}>
            {y.name}
          </NavLink>
        </li>) 
        }
       { 
        user.getcare_menu
        .filter(x => x.code === 'product_bonus')
        .map(y => <li key={y}>
          <NavLink to={'/' + y.code} activeClassName={classes.Active}>
            {y.name}
          </NavLink>
        </li>) 
        }     
              </ul>
            </li>
            : null
      }
            { 
        user.getcare_menu
        .filter(x => x.code === 'promotion')
        .map(y => <li key={y}>
          <NavLink to={'/' + y.code} activeClassName={classes.Active}>
            {y.name}
          </NavLink>
        </li>) 
        }     
        
        { 
        user.getcare_menu
        .filter(x => x.code === 'so')
        .map(y => <li key={y}>
          <NavLink to={'/' + y.code}  className={this.getNavLinkClass(['/so', '/store', '/fastorder'])}>
            {y.name}
          </NavLink>
        </li>) 
        } 
           
            { 
        user.getcare_menu
        .filter(x => x.code === 'customer')
        .map(y => <li key={y}>
          <NavLink to={'/' + y.code} activeClassName={classes.Active}>
            {y.name}
          </NavLink>
        </li>) 
        }  
      { 
        user.getcare_menu
        .filter(x => x.code === 'policy')
        .map(y => <li key={y}>
          <NavLink to={'/' + y.code} activeClassName={classes.Active}>
            {y.name}
          </NavLink>
        </li>) 
        }  
        <li>
          <NavLink to={'/group' } activeClassName={classes.Active}>
          Nhóm
          </NavLink>
        </li>
          </ul>
        </nav>
        <ul className={classes.RightNav}>
          <li>
            <ServicesPanel iconSize="medium" />
          </li>
          <li>
            <UserDropdown onGoToPage={this.handleGoToPage}/>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  user: makeSelectLoginUser(),
});
export default withRouter(connect(mapStateToProps)(PageHeader))
