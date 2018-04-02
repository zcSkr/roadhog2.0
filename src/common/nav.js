import dynamic from 'dva/dynamic';

const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m =>
    import(`models/${m}`)),
  component,
});

export const getNavData = app => {
  const navs = [{
    path: '/',
    component: dynamicWrapper(app, [], () => import('routes/StorePage')),
  }, {
    path: '/index',
    component: dynamicWrapper(app, [], () => import('routes/IndexPage')),
  }, {
    path: '/home',
    component: dynamicWrapper(app, ['example'], () => import('routes/Home')),
  }]

  return navs;
}