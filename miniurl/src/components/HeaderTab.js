import React from 'react';
import { FormattedMessage } from 'react-intl';
import config from '../json/config.json';

class HeaderTab extends React.Component{
    constructor(props){
        super(props);
        this.iconUrl = config['APP_ICON'][config['APP_ICON']['current']]
        this.headersWrapper = null;
        this.state = {
            showOptions : false,
            isElesHidden : false
        }
    }

    componentDidMount(prevProps, prevState, snapshot){
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        try{
            if(this.state.showOptions){
                this.setState({
                    showOptions : false  
                })
            }
            if(this.state.isElesHidden){
                this.setState({
                    isElesHidden : false
                })
            }
            let headersChildren = [...this.headersWrapper.children];
            
            document.querySelectorAll('.hideElement').forEach(ele => {
                ele.classList.remove('hideElement');
            })
            if(window.innerWidth <= 1000 && window.innerWidth > 900){
                if(headersChildren.slice(3, headersChildren.length -1)){
                    let childEle = headersChildren.slice(3, headersChildren.length -1);
                    childEle.forEach(ele => {
                        ele.classList.add('hideElement');
                    })
                }
                this.setState({
                    isElesHidden : true
                })
            }else if(window.innerWidth <= 900 && window.innerWidth > 800){
                if(headersChildren.slice(2, headersChildren.length -1)){
                    let childEle = headersChildren.slice(2, headersChildren.length -1);
                    childEle.forEach(ele => {
                        ele.classList.add('hideElement');
                    })
                }
                this.setState({
                    isElesHidden : true
                })
            }else if(window.innerWidth <= 800){
                if(headersChildren.slice(1, headersChildren.length -1)){
                    let childEle = headersChildren.slice(1, headersChildren.length -1);
                    childEle.forEach(ele => {
                        ele.classList.add('hideElement');
                    })
                }
                this.setState({
                    isElesHidden : true
                })
            }
        }catch(err){
            console.error('Error in handleResize ', err.stack);
        }
    }

    getMoreOptions = () => {
        try{
            let hiddenIcons = this.headersWrapper.querySelectorAll('.hideElement'),
            resultedEle = [];
            if(hiddenIcons.length){
                hiddenIcons.forEach(ele => {
                    resultedEle.push(
                        <FormattedMessage id={`he.${ele.getAttribute('ename')}`} children={val => <li className={`menu_li ${ele.getAttribute('ename')}_txt`}>{val}</li>}></FormattedMessage>
                    )
                })
            }
            return <ul className={`menu_holder`}>{resultedEle}</ul>;
        }catch(err){
            console.error('Error in getMoreOptions ',err.stack);
        }
    }

    render(){
        return(
            <div className="header_wrapper">
                <div className="headerp1_wrapper">
                    <div className="header1 app_icon_holder">
                        <img alt="app_icon" className="applogo" src={`${this.iconUrl}/images/headerIcons/appLogo.png`}></img>
                    </div>
                    <div className="header1 acc_name_holder">
                        <FormattedMessage id={'cmp.n'} children={
                            (val) => 
                                <span className="acc_name">{val}</span>
                        }></FormattedMessage>
                    </div>
                </div>
                <div className="headerp2_wrapper" ref={ele => this.headersWrapper = ele}>
                    <div className="upgrade_holder">
                        <FormattedMessage id={'h.u.tt'} children={
                            (val) => <div className="up_txt"><img alt="upgrade" className="upgrade_icon" src={`${this.iconUrl}/images/headerIcons/upgrade.png`}></img>{val}</div>
                        }></FormattedMessage>
                    </div>
                    <div className="notif_holder" ename="hnot">
                        <img alt="Notification" className="notifIcon" src={`${this.iconUrl}/images/headerIcons/notification.png`}></img>
                    </div>
                    <div className="addppl_holder" ename="hap">
                        <img alt="Add people" className="adplIcon" src={`${this.iconUrl}/images/headerIcons/addpeople.png`}></img>
                    </div>
                    
                    <div className="tour_holder" ename="hto">
                        <img alt="tourIcon" className="tourIcon" src={`${this.iconUrl}/images/headerIcons/tour.png`}></img>
                    </div>
                    <div className="profile_holder" ename="hpr">
                        <img alt="Profile Icon" className="profIcon" src={`${this.iconUrl}/images/headerIcons/profile.png`}></img>
                    </div>
                    <div className={`more_view_holder ${this.state.isElesHidden ? '' : 'hideOpt'}`}>
                        <div className="more_icon_holder" onClick={_ => {
                            this.setState({
                                showOptions : !this.state.showOptions
                            })
                        }}>
                            <img alt="more button" className="more_icon" src={`${this.iconUrl}/images/headerIcons/more.png`}></img>
                        </div>
                        <div className="more_opt_holder">
                            {(this.state.showOptions) ? this.getMoreOptions() : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderTab;