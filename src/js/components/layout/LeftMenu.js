import React, { Component } from "react"
import { connect } from 'react-redux'
import Menu from '../basic/Menu'
import PreLoadComponent from '../basic/PreLoadComponent'

import {execHandler, setActiveKey, setImportComponent} from '../../redux/leftMenuTree/action'

@connect(
  state=>state.leftMenuTree.toJS(),
  {execHandler, setActiveKey, setImportComponent}
)
class LeftMent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyField: 'code',
      titleField: 'name'
    };
  }
  
  onClick = (selectedKeys) => {
    this.props.execHandler(selectedKeys[0]);
    this.props.setActiveKey(selectedKeys[0]);
    this.props.setImportComponent(selectedKeys[0], PreLoadComponent);
  }

  render() {
    return (
      <div>
        <Menu 
          trigger='click' 
          defaultSelectedKeys={['']} 
          titleField={this.state.titleField} 
          keyField={this.state.keyField}
          dataSource={this.props.treeData} 
          onSelect={this.onClick}
          id={`menu${this.props.id}`} 
        />
      </div>
    );
  }
}

export default LeftMent 