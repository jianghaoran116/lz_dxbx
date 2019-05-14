const SET_ACTIVEKEY = Symbol.for('SET_ACTIVEKEY')
const SET_NEEDUPDATE = Symbol.for('SET_NEEDUPDATE')
const SET_COMPONENT = Symbol.for('SET_COMPONENT')

const recursiveFind = (list, code, data) => {
  if (!list.length) return;
  list.forEach(item => {
    if (item.children) {
      recursiveFind(item.children, code, data);
    } else {
      if (item.code !== code) return;
      data.push(item);
    }
  })
}

export function execHandler(menuCode, carryData, callback) {
  return function (dispatch, getState) {
    const treeData = getState().leftMenuTree.toJS().treeData;
    if (!treeData) return;
    try {
      menuCode = JSON.parse(menuCode);
    } catch (e) {

    }
    const returnData = [];
    if (typeof menuCode === 'object') {
      returnData.push(menuCode);
      menuCode = menuCode.code;
    } else {
      recursiveFind(treeData, menuCode, returnData);
      if (returnData.length !== 1) {
        return;
      }
    }
  }
}

function setActiveKeySuccess(key) {
  return {
    type: SET_ACTIVEKEY,
    payload: key
  }
}

function setNeedUpdate(status) {
  return {
    type: SET_NEEDUPDATE,
    payload: status
  }
}

function setComponent(component) {
  return {
    type: SET_COMPONENT,
    payload: component
  }
}

export function setActiveKey(key) {
  return (dispath, getState)=>{
    if(getState().leftMenuTree.toJS().needUpdate==key){
      dispath(setNeedUpdate(false))
    } else {
      dispath(setNeedUpdate(true))
    }
    dispath(setActiveKeySuccess(key))
  }
}

export function setImportComponent(key, preComponent) {
  return (dispatch)=>{
    let component = null

    switch(key) {
      case "consumer_list":
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "consumerList-content" */ '../../../containers/pages/consumer/ConsumerList.js').then(component => {
          dispatch(setComponent(component.default))
        })
        break;
      case "consumer_update":
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "consumer-update" */ '../../../containers/pages/consumer/ConsumerUpdate.js').then(component => {
          dispatch(setComponent(component.default))
        })
        break;
      case "consumer_role":
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "consumer-role" */ '../../../containers/pages/consumer/ConsumerRole.js').then(component => {
          dispatch(setComponent(component.default))
        })
        break;
      case "channel_list":
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "channel-list" */ '../../../containers/pages/channel/ChannelList.js').then(component => {
          dispatch(setComponent(component.default))
        })
        break;
      case "statistic_consumer_info":
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "statistic-consumer-info" */ '../../../containers/pages/statistic/StatisticConsumerInfo.js').then(component => {
          dispatch(setComponent(component.default))
        })
        break;
      case "statistic_consumer_behavior":
        dispatch(setComponent(preComponent));
        import(/* webpackChunkName: "statistic-consumer-behavior" */ '../../../containers/pages/statistic/StatisticConsumerBehavior.js').then(component => {
          dispatch(setComponent(component.default))
        })
        break;
      default:
        dispatch(setComponent(component));
        break;
    }
  }
}