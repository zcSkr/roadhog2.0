import React, { PropTypes, Component } from 'react';
import { Icon, Tabs, Drawer, List } from 'antd-mobile';
const TabPane = Tabs.TabPane;
import { isEmpty } from 'underscore';
import { trim, startsWith } from 'underscore.string';
import styles from './styles.less';

import PickerContent from './PickerContent'

function findTree(tree, id, parent) {
  for (var index in tree) {
    let item = tree[index];
    if (item.id == id) {
      item._nodePath = (parent && parent._nodePath) ? (parent._nodePath + ',' + item.id) : item.id;
      return item;
    } else {
      if (item.children && item.children.length > 0) {
        item._nodePath = (parent && parent._nodePath) ? (parent._nodePath + ',' + item.id) : item.id;
        let res = findTree(item.children, id, item);
        if (res) return res;
      }
    }
  }
  return null;
}

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      ...this.propsToState(props),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list != this.state.list || nextProps.value != this.state.value) { 
      this.setState({...this.propsToState(nextProps) });
    }
  }
  propsToState(props) {
    let area = null;
    if (!isEmpty(props.list) && !isEmpty(props.value)) {
      area = findTree(props.list, props.value);
    }
    return {
      list: props.list,
      value: props.value,
      selectedItem: area,
    };
  }

  handleDrawerChange = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  handleChange = (value, item) => {
    const { onChange } = this.props;
    this.setState({ drawerOpen: false, selectedItem: item });
    if (onChange) {
      onChange(value, item);
    }
  }

  render() {
    var { onChange, extra, title } = this.props;
    var { drawerOpen, list, value, selectedItem } = this.state;

    const sidebar = (
      <div className={styles.sidebar}>
        <div className={styles.header}> 
          <span>{title?title:'选择地区'}</span>
          <Icon className={styles.icon} type="cross" onClick={this.handleDrawerChange} /> 
        </div>
        <PickerContent list={list} value={value} onChange={this.handleChange} />
      </div>
    );
    const drawerProps = {
      sidebar,
      open: drawerOpen,
      position: "bottom",
      onOpenChange: () => {
        this.setState({ drawerOpen: !this.state.drawerOpen });
      },
      dragHandleStyle: { display: 'none' },
      sidebarStyle: { backgroundColor: 'white' }
    };
    let style = drawerOpen ? { zIndex: 2 } : undefined;

    return (
      <div className="sys-area-picker">
        <List.Item className="global-item-input" onClick={this.handleDrawerChange} extra={selectedItem?selectedItem.nodeNamePath:(extra?extra:'请选择')} arrow="horizontal"> 
          {title?title:'选择地区'}
        </List.Item>
        <Drawer style={style} {...drawerProps}><div /></Drawer>
      </div>
    );
  }
}

export default Picker;
