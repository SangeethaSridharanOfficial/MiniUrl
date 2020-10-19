import React from 'react';
import { IntlProvider } from 'react-intl';
import EnMessages from '../languages/english.json';
import HeaderTab from '../containers/HeaderTab';
import MainTab from '../containers/MainTab';

class MiniUrl extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <IntlProvider locale="en" messages={EnMessages['language']}>
                <HeaderTab />
                <MainTab />
            </IntlProvider>
        )
    }
}

export default MiniUrl;