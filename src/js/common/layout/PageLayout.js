import React, { Component } from "react";

import config from '../../../../config';
import PageContent from './PageContent.js'

import "../../../style/index.less"
import styles from "../../../style/pages/layout.less"

const headerRoutes = [
    // {
    //     path: `${config.routerPath.urlPath}/pages/home.html`,
    //     label: 'home'
    // },
    {
        path: `${config.routerPath.urlPath}/pages/javascript.html`,
        label: 'javascript',
    },
    {
        path: `${config.routerPath.urlPath}/pages/css.html`,
        label: 'css'
    },
    {
        path: `${config.routerPath.urlPath}/pages/browser.html`,
        label: 'browser'
    }
    // {
    //     path: `${config.routerPath.urlPath}/pages/undersocre.html`,
    //     label: 'undersocre',
    // },
    // {
    //     path: `${config.routerPath.urlPath}/pages/jsbaseknowledge.html`,
    //     label: 'jsbaseknowledge'
    // },
    // {
    //     path: `${config.routerPath.urlPath}/pages/es6.html`,
    //     label: 'es6'
    // }
];

class pageLayout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    }

    render() {

        const sidebar = (
            <div>
                {headerRoutes.map((item, index) => {
                    return (
                        <div 
                            key={index}
                        >                        
                            <a className="custom-nav" href={item.path} target="_self">{item.label}</a>
                        </div>
                    );
                })}
            </div>
        );


        return (
            <div>
                js
            </div>
        );
    }
}

export default pageLayout;