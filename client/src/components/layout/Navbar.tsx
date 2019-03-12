import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

interface NavbarProps {
	history: object;
	isLoggedIn: boolean;
	logoutUser: Function;
}

function Navbar({ history, isLoggedIn, logoutUser }): React.SFC<NavbarProps> {
	return (
		<Menu pointing secondary>
      <Menu.Menu position="left">
        {isLoggedIn ? (
          <Menu.Item as={NavLink} name="Pollstar" to={'/home'} />
        ) : (
          <Menu.Item as={NavLink} exact name="Pollstar" to={'/'} />
        )}
      </Menu.Menu>
      <Menu.Menu>
        <Menu.Item as={NavLink} exact name="Poll List" to="/polls" />
        <Menu.Item as={NavLink} name="Poll Categories" to="/polls/categories" />
        {isLoggedIn && (
          <Menu.Item as={NavLink} name="Create Poll" to="/polls/new" />
        )}
      </Menu.Menu>
      <Menu.Menu position="right">
        {isLoggedIn ? (
          <Fragment>
            <Menu.Item
              as={NavLink}
              name="Logout"
              to="#"
              onClick={() => logoutUser(history)}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Menu.Item as={NavLink} name="Register" to="/auth/register" />
            <Menu.Item as={NavLink} name="Login" to="/auth/login" />
          </Fragment>
        )}
      </Menu.Menu>
    </Menu>
	)
}

Navbar.defaultProps = {
	isLoggedIn: false,
}

Navbar.propTypes = {
	history: PropTypes.object.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired,
}

export default withRouter(Navbar);
