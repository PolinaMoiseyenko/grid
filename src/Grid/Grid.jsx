import React from 'react';

import { Table } from 'antd';
import reqwest from 'reqwest';

import SettingsModal from '../Settings/Settings';

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pagination: {},
      loading: false,
      modalVisible: false,
      settings: {}
    };
    this.handleSettingChange = this.handleSettingChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleModalCancel = e => {
    this.setState({
      visible: false,
    });
  };


  handleSettingChange = (newSettings, e) => {
    e && e.preventDefault();    
    this.setState((prevState) => ({ settings: { ...prevState.settings, ...newSettings } }));
    // Update state.pagination 
    if(newSettings.pageSize) {
      const pageSize = newSettings.pageSize;
      this.setState((prevState) => ({ pagination: { ...prevState, pageSize }}));
    }
    this.handleModalCancel();
  }

  handleTableChange = (pagination, filters, sorter) => {
    debugger
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    if (!this.props.pageSettings.fetchAllData) {
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }
  };

  fetch = (params = {}) => {
    const { pageSettings } = this.props;
    const { settings } = this.state;
    let result;
    const pagination = { ...this.state.pagination };
    const pageSize = (settings.rowsPerPage === undefined ? pageSettings.pageSize : settings.rowsPerPage);
    pagination.total = pageSettings.pages * pageSize;
    pagination.pageSize = pageSize;

    if (pageSettings.fetchAllData) {
      result = pagination.total
    } else {
      result = pagination.pageSize
    }

    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: result,
        ...params,
      },
      type: 'json',
    })
      .then(data => {
        this.setState({
          loading: false,
          data: data.results
        });
        if (this.props.pageSettings.pages === 1) {
          this.setState({
            pagination: false
          });
        } else {
          this.setState({
            pagination
          });
        }
      });
  };


  render() {
    return (
      <Table
        columns={this.props.columns}
        rowKey={record => record.login.uuid}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        size={this.state.settings.size}
        bordered={this.state.settings.bordered}
        title={() =>
          <SettingsModal
            handleSettingChange={this.handleSettingChange}
            pageSize={this.props.pageSettings.pageSize}
            showModal={this.showModal}
            handleCancel={this.handleModalCancel}
            visible={this.state.visible}
            defaultSettings={this.props.defaultSettings} />}
      />
    );
  }
}


