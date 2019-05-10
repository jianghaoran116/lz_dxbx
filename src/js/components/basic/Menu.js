import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export class MenuControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: props.trigger || 'hover',
      mode: props.mode || "inline",
      theme: props.theme || "dark",
      selectedKeys: props.selectedKeys || '',
      dataSource: props.dataSource || [],
      id: props.id,
      keyField: props.keyField,
      titleField: props.titleField
    };
    this.subData = [];
  }
  
  onOpenChange = (openKeys) => {
  }

  
  loopMenu(dataSource) {
    let keyField = this.state.keyField;
    let titleField = this.state.titleField;
    let menuData = [];
    const subMenuProps = {};
    if (dataSource.length > 0) {
      dataSource.forEach(function (element) {
        const title = <span>{element[titleField]}</span>;
        let ele;
        if (element.children) {
          let subMenuData = this.loopSubMenu(element.children);
          ele = <SubMenu 
                  {...subMenuProps} 
                  data={element} 
                  key={element[keyField]} 
                  title={title}
                >
                  {subMenuData}
                </SubMenu>;
        } else {
          ele = <MenuItem 
              data={element} 
              key={element[keyField]} 
            >
              {title}
            </MenuItem>;
        }
        menuData.push(ele);
      }, this);
      return menuData;
    } else {
      return "";
    }
  }
  
  loopSubMenu(dataSource) {
    let keyField = this.state.keyField;
    let titleField = this.state.titleField;
    let menuData = [];

    if (dataSource.length > 0) {
      dataSource.forEach(function (element) {
        let ele;
        if (element.children) {
          let subMenuData = this.loopSubMenu(element.children);
          const className = 'menu-group-cols-' + (element.cols || 3);
          ele = <SubMenu 
                  className={className} 
                  // data={element} 
                  key={element[keyField]} 
                  title={element[titleField]}
                >
                  {subMenuData}
                </SubMenu>;
        } else {
          ele = <MenuItem 
                  data={element} 
                  key={element[keyField]}
                  disabled={element.disabled} 
                  title={element[titleField]}
                >
                  {element[titleField]}
                </MenuItem>;
        }
        menuData.push(ele);
      }, this);
      return menuData;
    } else {
      return "";
    }
  }

  
  onMenuClick(item) {
    let selectedKeys = [];
    selectedKeys.push(item.key);
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, item);
  }

  render() {
    const subMenuNodes = this.loopMenu(this.state.dataSource);
    
    return (
      <Menu 
        onOpenChange={this.onOpenChange} 
        defaultSelectedKeys={this.props.defaultSelectedKeys} 
        theme={this.state.theme} 
        onClick={(item, key, keyPath) => this.onMenuClick(item, key, keyPath)} 
        mode={this.state.mode}
      >
        {subMenuNodes}
      </Menu>
    );
  }
};
export default MenuControl
