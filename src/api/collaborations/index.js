const CollaborationsHandler = require('./collaborationsHandler');
const routes = require('./collaborationsRoutes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { collaborationsService, playlistService, validator }) => {
    // eslint-disable-next-line max-len
    const collaborationsHandler = new CollaborationsHandler(collaborationsService, playlistService, validator);
    server.route(routes(collaborationsHandler));
  },
};
