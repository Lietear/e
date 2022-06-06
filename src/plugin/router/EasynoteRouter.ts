exports.plugin = {
    name: 'EasynoteRouter',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/getnote',
                handler: async (request, h) => {
                    return new server.app.EasynoteController(request,h).getNote(request)
                }
            },
            {
                method: 'GET',
                path: '/findnote',
                handler: async (request, h) => {
                    return new server.app.EasynoteController(request,h).findNote(request)
                }
            },
            {
                method:'POST',
                path:'/writenote',
                handler:async (request, h) => {
                    return new server.app.EasynoteController(request,h).writeNote(request)
                }
            }
        ]
        );
    }
};