import React from 'react';
import config from '../json/config.json';
import { FormattedMessage } from 'react-intl';

class LinkManagement extends React.Component{
    constructor(props){
        super(props);
        this.iconUrl = config['APP_ICON'][config['APP_ICON']['current']];
        this.state = {
            topSelectedOption: '',
            subSelectedOption: '',
            closeTopOptions: true,
            closeSubOptions: true,
            openDomainOpts : false,
            domains: ['Animaker', 'AnywhereWorks', 'Facebook'],
            domainLoaded : true
        }
        this.topSelDef = null;
        this.subSelDef = null;
        this.topValEle = null;
        this.subValEle = null;
        this.domainOpts = null;
    }

    handleTopFilter = (e) => {
        try{
            if(e.target.closest('.top_opts')){
                if(!e.target.closest('.dom_hol')){
                    this.topValEle.classList.remove('opened');
                    this.subValEle.classList.remove('opened');
                    this.domainOpts.classList.remove('clicked');
                    this.setState({
                        topSelectedOption : e.target.closest('.top_opts').querySelector('.top_opt').innerText,
                        openDomainOpts : false,
                        closeTopOptions: true,
                        openDomainOpts : false
                    })
                }else{
                    if(e.target.closest('.do_name_hol')){
                        this.topValEle.classList.remove('opened');
                        this.subValEle.classList.remove('opened');
                        this.domainOpts.classList.remove('clicked');
                        this.setState({
                            topSelectedOption : e.target.closest('.do_name_hol').querySelector('.do_name').innerText,
                            openDomainOpts : false,
                            closeTopOptions: true,
                            openDomainOpts : false
                        })
                    }else{
                        if(!this.state.openDomainOpts){
                            this.setState({
                                openDomainOpts : true
                            })
                        }
                    }
                }
            }
        }catch(err){
            console.error('Error in handleTopFilter ',err.stack);
        }
    }

    handleSubFilter = (e) => {
        try{
            if(e.target.closest('.sub_opts')){
                this.subValEle.classList.remove('opened');
                this.topValEle.classList.remove('opened');
                this.domainOpts.classList.remove('clicked');
                this.setState({
                    subSelectedOption : e.target.closest('.sub_opts').querySelector('.sub_opt').innerText,
                    closeSubOptions: true,
                    openDomainOpts : false
                })
            }
        }catch(err){
            console.error('Error in handleSubFilter ',err.stack);
        }
    }

    showDomains = () => {
        try{
            let domains = [];
            this.state.domains.forEach(val => {
                domains.push(<div className="do_name_hol">
                    <span className="do_name">{val}</span>
                </div>)
            })
            return domains;
        }catch(err){
            console.error('Error in showDomains ',err.stack);
        }
    }

    componentDidMount(prevProps, prevState, snapshot){
        this.setState({
            subSelectedOption : this.subSelDef.innerText,
            topSelectedOption : this.topSelDef.innerText
        })

        window.addEventListener('click', (e) => {
            if(!e.target.closest('.filter_holder')){
                if( this.topValEle && this.subValEle && this.domainOpts){
                    this.topValEle.classList.remove('opened');
                    this.subValEle.classList.remove('opened');
                    this.domainOpts.classList.remove('clicked');
                }
                this.setState({
                    closeTopOptions: true,
                    closeSubOptions: true,
                    openDomainOpts : false
                })
            }
            
        })
    }

    render(){
        return(
            <div className={`sbov_assets ${this.props.type}`}>
                <header>
                    <div className="search_holder">
                        <div className="search_header_container">
                            <img alt="searchIcon" src={`${this.iconUrl}/images/headerIcons/search.png`} className="seearch_icon"></img>
                            <form autoComplete="false">
                                <FormattedMessage id={'he.se'} children={
                                    (val) => <input type="search" className="header_search" placeholder={val}/>
                                }></FormattedMessage>
                            </form>
                        </div>
                    </div>
                    <div className="filter_holder">
                        <div className="top_fil_wrapper">
                            <div ref={ele => this.topValEle = ele} className="top_val_holder" onClick={e => {
                                if(this.state.closeTopOptions){
                                    this.topValEle.classList.add('opened');
                                    this.subValEle.classList.remove('opened')
                                }else{
                                    this.topValEle.classList.remove('opened');
                                }
                                this.setState({
                                    closeTopOptions : !this.state.closeTopOptions,
                                    closeSubOptions : true
                                })
                            }}>
                                <span className="ttxt_holder">{this.state.topSelectedOption}</span>
                                <img alt="dropdown" className="tfil_arrow" src={`${this.iconUrl}/images/sidebarIcons/sclose.png`}></img>
                            </div>
                            <div className="top_fil_holder" style={{display: `${this.state.closeTopOptions ? 'none' : ''}`}} onClick={e => {
                                this.handleTopFilter(e);
                            }}>
                                <div className="top_opts myli_hol">
                                    <FormattedMessage id="s.ml.tt" children={val => <span className="top_opt myli_txt">{val}</span>}></FormattedMessage>
                                </div>
                                <div className="top_opts acc_hol">
                                    <FormattedMessage id="s.ac.tt" children={val => <span className="top_opt ac_txt">{val}</span>}></FormattedMessage>
                                </div>
                                <div className="top_opts dom_hol" ref={ele => this.domainOpts = ele} onMouseOver={e => {
                                    this.domainOpener.src = `${this.iconUrl}/images/sideViewIcons/opener-hover.png`
                                }} onMouseOut={e => {
                                    if(!this.state.openDomainOpts)
                                        this.domainOpener.src = `${this.iconUrl}/images/sideViewIcons/opener.png`
                                }} onClick={e => {
                                    if(!this.state.openDomainOpts){
                                        this.domainOpts.classList.add('clicked');
                                    }else{
                                        this.domainOpts.classList.remove('clicked');
                                    }
                                    this.setState({
                                        openDomainOpts : !this.state.openDomainOpts
                                    })
                                }}>
                                    <FormattedMessage id="s.do.tt" children={val => <span className="top_opt do_txt">{val}</span>}></FormattedMessage>
                                    <img alt="dropdown" ref={ele => this.domainOpener = ele} className="tfil_opener" src={`${this.iconUrl}/images/sideViewIcons/opener.png`}></img>
                                    <div className="domain_opts_holder" style={{display: `${this.state.openDomainOpts ? '' : 'none'}`}}>
                                        {this.state.domainLoaded ? 
                                            <div className="domain_opts">
                                                {this.showDomains()}
                                            </div>:
                                            <div className="dom_iconHo">
                                                <img className="dom_iconlo" alt="optionLoader" src={`${this.iconUrl}/images/sideViewIcons/optloader.gif`}></img>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sub_fil_wrapper">
                            <div ref={ele => this.subValEle = ele} className="sub_val_holder" onClick={e => {
                                if(this.state.closeSubOptions){
                                    this.subValEle.classList.add('opened');
                                    this.topValEle.classList.remove('opened');
                                }else{
                                    this.subValEle.classList.remove('opened');
                                }
                                this.domainOpts.classList.remove('clicked');
                                this.setState({
                                    closeSubOptions : !this.state.closeSubOptions,
                                    closeTopOptions : true,
                                    openDomainOpts : false
                                })
                            }}>
                                <span className="stxt_holder">{this.state.subSelectedOption}</span>
                                <img alt="dropdown" className="sfil_arrow" src={`${this.iconUrl}/images/sidebarIcons/sclose.png`}></img>
                            </div>
                            <div className="sub_fil_holder" style={{display: `${this.state.closeSubOptions ? 'none' : ''}`}} onClick={e => {
                                this.handleSubFilter(e);
                            }}>
                                <div className="sub_opts all_hol">
                                    <FormattedMessage id="f.al.tt" children={val => <span className="sub_opt fil_all">{val}</span>}></FormattedMessage>
                                </div>
                                {(this.state.optionLoaded) ? 
                                    <div className="fi_othopts_holder">
                                        {this.loadOptions}    
                                    </div>:
                                    <div className="fi_opts_loader">
                                        <img className="optlo_icon" alt="optionLoader" src={`${this.iconUrl}/images/sideViewIcons/optloader.gif`}></img>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </header>
                <div className="lang_id_holder" style={{display: 'none'}}>
                    <FormattedMessage id="tp.sl.df" children={val => <span ref={ele => this.topSelDef = ele}>{val}</span>}></FormattedMessage>
                    <FormattedMessage id="sb.sl.df" children={val => <span ref={ele => this.subSelDef = ele}>{val}</span>}></FormattedMessage>
                </div>
            </div>
        )
    }
}

export default LinkManagement;