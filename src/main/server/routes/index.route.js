export const routes = {
    method: 'GET',
    path: '/{page*}',
    handler: {
        file: {
            path: `${__dirname}/../../../static/index.html`
        }
    }
};
