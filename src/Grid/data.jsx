import React  from 'react';
import { Avatar } from 'antd';

export const data = [];

export const columns = [
    {
      dataIndex: 'picture',
      render: picture => <Avatar src={picture.medium} />,
      // dataIndex: 'name',
      // render: name => <Avatar>{name.first}</Avatar>,
      align: "center"
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: name => `${name.first} ${name.last}`,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Adress',
      dataIndex: 'location',
      render: location => `${location.city}, ${location.street}`
    }
  ];

export const settings = {
  width: "100%",
  size: "small",                  // small | middle | default
  bordered: false,
  
};

export const pageSettings = {
    pageSize: 5,                   // amount of rows on one page
    pages: 10,                     // amount of pages
    currentRowId: null,            //
    fetchAllData: true             // true - fetch all data at once
};

export const defaultSettings = {
  bordered: false,
  size: "default"  
}