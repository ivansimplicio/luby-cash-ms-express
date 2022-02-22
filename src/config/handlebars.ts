import path from 'path';

const handlebarsConfig = {
  viewEngine: {
    extName: '.edge',
    partialsDir: path.resolve('./src/resources/views/emails'),
    layoutsDir: path.resolve('./src/resources/views/emails'),
    defaultLayout: '',
  },
  viewPath: path.resolve('./src/resources/views/emails'),
  extName: '.edge',
};

export default handlebarsConfig;
