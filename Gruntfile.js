module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.config.init({
        connect: {
            server: {
                options: {
                    bases: [__dirname],
                    keepalive: true,
                    middleware: function(connect, options) {
                        return [
                            connect.static(options.bases[0])
                        ];
                    },
                    open: 'http://0.0.0.0:<%= connect.server.options.port %>/examples/index.html',
                    port: 9024
                }
            }
        },

        copy: {
            assets: {
                files: [{
                    // XRegExp
                    expand: true,
                    cwd: 'bower_components/xregexp/src/',
                    src: ['xregexp.js'],
                    dest: 'examples/syntax-highlighter/static/xregexp/'
                }, {
                    // SyntaxHighlighter JS files
                    expand: true,
                    cwd: 'lib/syntax-highlighter-custom/',
                    src: ['**/*'],
                    dest: 'examples/syntax-highlighter/static/sh/'
                }, {
                    // Bootstrap assets for SyntaxHighlighter example
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: ['css/*', 'fonts/**/*', 'js/*'],
                    dest: 'examples/syntax-highlighter/static/bootstrap/'
                }, {
                    // jQuery for SyntaxHighlighter example
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: ['*'],
                    dest: 'examples/syntax-highlighter/static/jquery/'
                }]
            }
        }
    });

    grunt.registerTask('default', ['copy:assets', 'connect:server']);
};
