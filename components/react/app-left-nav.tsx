import * as React from 'react';
import * as LeftNav from 'material-ui/lib/left-nav';
import * as MenuItem from 'material-ui/lib/menus/menu-item';
import * as ActionHome from 'material-ui/lib/svg-icons/action/home';
import {connect} from 'react-redux';

const AppLeftNavComponent = ({leftNavOpen}) => (
    <LeftNav open={leftNavOpen} className="left-nav">
        <MenuItem leftIcon={<ActionHome/>} primaryText='Feed' focusState='focused'/>
    </LeftNav>
);

const AppLeftNavContainer = connect(state => state.leftNav)(AppLeftNavComponent);

export default AppLeftNavContainer;