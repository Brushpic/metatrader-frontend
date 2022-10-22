const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        translate: 'EXAMPLE',
        type: 'item',
        icon: 'whatshot',
        url: '/example',
      },
      {
        id: 'userAdmin-component',
        title: 'User Manage',
        translate: 'UserManage',
        type: 'item',
        icon: 'whatshot',
        url: '/userAdmin',
      },
    ],
  },
];

export default navigationConfig;
