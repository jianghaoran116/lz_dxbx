import React from 'react';
import { Skeleton } from 'antd';

export class MenuControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <Skeleton loading={true} active avatar/>
    );
  }
};
export default MenuControl
