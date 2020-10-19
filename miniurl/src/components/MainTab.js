import React from 'react';
import { FormattedMessage } from 'react-intl';
import Analytics from "../containers/Analytics";
import config from '../json/config.json';
import LinkManagement from '../containers/LinkManagement';

class MainTab extends React.Component{
    constructor(props){
        super(props);
        this.iconUrl = config['APP_ICON'][config['APP_ICON']['current']];
        this.state = {
            type: 'LINK'
        };
        this.menuList = [
            {
                type: 'LINK',
                langId: 'sm.li',
                icon: 'new icons/link.png',
                iconHover: 'new icons/link-hover.png'
            },
            {
                type: 'WORKSPACE',
                langId: 'sm.wrk',
                icon: 'new icons/workspace.png',
                iconHover: 'new icons/workspace-hover.png'
            },
            {
                type: 'DOMAIN',
                langId: 'sm.do',
                icon: 'new icons/domain.png',
                iconHover: 'new icons/domain-hover.png'
            },
            {
                type: 'ACCOUNT',
                langId: 'sm.ac',
                icon: 'new icons/account.png',
                iconHover: 'new icons/account-hover.png'
            }
        ];
        this.transEle = null;
        this.sbovEle = null;
    }

    handleSmClick = (val) => {
        try{
            let iconEle = document.querySelector(`.icon-${val.type}`).closest(`.menu_li`),
            iconPos = iconEle.getBoundingClientRect();
            document.querySelectorAll('.activesm').forEach(ele => {
                ele.classList.remove('activesm');
                ele.querySelector('.sm_img_icon').src = ele.querySelector('.sm_img_icon').src.split('-hover').join('');
            });
            iconEle.classList.add('activesm');
            this.setState({
                type: val.type
            })
            this.sbovEle.classList.remove('closeSbov');
            this.closeIcon.classList.remove('closeSbov');
            this.transEle.style.display = '';
            this.transEle.style.transform = `translate3d(0px, ${iconPos.top - document.querySelector('.header_wrapper').offsetHeight}px, 0px)`;
        }catch(err){
            console.error('Error in handleSmClick ',err.stack);
        }
    }

    renderMenuList = () => {
        try{
            let result = [];
            this.menuList.forEach((val, idx) => {
                result.push(
                    <div key={val.type} className={`menu_li ${val.type} ${idx === 0 ? 'activesm': ''}`} ttdata={val.langId} onMouseOver={e => {
                        e.target.closest('.menu_li').querySelector('.sm_img_icon').src = `${this.iconUrl}/images/sidebarIcons/${val.iconHover}`;
                    }} onMouseOut={e => {
                        if(!e.target.closest('.activesm'))  e.target.closest('.menu_li').querySelector('.sm_img_icon').src = `${this.iconUrl}/images/sidebarIcons/${val.icon}`;
                    }} onClick={_ => this.handleSmClick(val)}>
                        <img alt={`${val.type} icon`} className={`sm_img_icon icon-${val.type}`} src={`${this.iconUrl}/images/sidebarIcons/${idx === 0 ? val.iconHover : val.icon}`}></img>
                    </div>
                )
            })
            return result;
        }catch(err){
            console.error('Error in renderMenuList ', err.stack);
        }
    }

    handleSideBarView = (e) => {
        try{
            if(this.sbovEle.classList.contains('closeSbov')){
                this.sbovEle.classList.remove('closeSbov');
                this.transEle.style.display = '';
                this.transEle.style.transform = `translate3d(0px, 0px, 0px)`;
                let linkEle = document.querySelector('.menu_li');
                linkEle.classList.add('activesm');
                linkEle.querySelector('.sm_img_icon').src = linkEle.querySelector('.sm_img_icon').src.split('.png').join('-hover.png');
                this.setState({
                    type: 'LINK'
                })
                this.closeIcon.classList.remove('closeSbov');
            }else{
                this.sbovEle.classList.add('closeSbov');
                this.closeIcon.classList.add('closeSbov');
                this.transEle.style.display = 'none';
                let prevSelectedEle = document.querySelector('.activesm');
                if(prevSelectedEle){
                    prevSelectedEle.classList.remove('activesm');
                    prevSelectedEle.querySelector('.sm_img_icon').src = prevSelectedEle.querySelector('.sm_img_icon').src.split('-hover').join('');
                }
            }
        }catch(err){
            console.error('Error in handleSideBarView ',err.stack);
        }
    }

    constructSbov = () => {
        try{
            let viewEles = [];
            switch(this.state.type){
                case 'LINK':
                    viewEles.push(<LinkManagement type={this.state.type}/>)
                    break;

                default:
                    break;
            }

            return viewEles;
        }catch(err){
            console.error('Error in constructSbov ',err.stack);
        }
    }

    render(){
        let sbovElements = this.constructSbov();
        return(
            <div className="main_app_wrapper">
                <div className="smb_wrapper">
                    <div className="sml_wrapper">
                        <div className="sml_holder">{this.renderMenuList()}</div>
                        <div className="sml_trans" ref={ele => this.transEle = ele}></div>
                    </div>
                    <div className="sbov_wrapper" ref={ele => this.sbovEle = ele}>
                        {sbovElements}
                    </div>
                    <div className="sml_close_wrapper" ref={ele => this.closeIcon = ele}>
                        <div className="sml_close" onClick={e => {
                            this.handleSideBarView(e);
                        }} onMouseOver={e => {
                            this.closeIcon.querySelector('img').src = `${this.iconUrl}/images/sidebarIcons/sclose-hover.png`;
                        }} onMouseOut={e => {
                            this.closeIcon.querySelector('img').src = `${this.iconUrl}/images/sidebarIcons/sclose.png`;
                        }}>
                            <img alt="smlClose" src={`${this.iconUrl}/images/sidebarIcons/sclose.png`}></img>
                        </div>
                    </div>
                </div>
                <Analytics />
            </div>
        )
    }
}

export default MainTab;