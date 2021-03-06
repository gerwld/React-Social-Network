import React from 'react';
import { connect } from 'react-redux';

export const dropDownMenu = (Component) => {
    class DropDown extends React.Component {
        render() {
            return <Component {...this.props} />
        }
    }

    let mapStateToProps = (state) => {
        return {
            
        }
    }

    let DropDownWithState = connect(mapStateToProps, {})(DropDown);

    return DropDownWithState;
}

