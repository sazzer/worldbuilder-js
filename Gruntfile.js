module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    // Keep the plugins in alphabetical order
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                plugins: [
                    'rewire'
                ],
                presets: ['es2015']
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/main',
                    src: ['**/*.js'],
                    dest: 'target/main'
                }]
            }
        },
        clean: ['target'],
        eslint: {
            options: {
                configFile: 'eslintrc'
            },
            main: {
                files: [{
                    expand: true,
                    src: ['src/main/**/*.js']
                }]
            }
        },
        execute: {
            main: {
                src: 'target/main/index.js'
            }
        },
        jscpd: {
            main: {
                path: 'src/main'
            }
        },
        mochaTest: {
            main: {
                src: [
                    'target/main/**/*.spec.js'
                ],
                options: {
                    reporter: 'spec',
                    growl: true,
                    require: 'target/main/testSetup'
                }
            }
        },
        watch: {
            build: {
                files: [
                    'src/**/*',
                    'Gruntfile.js',
                    'eslintrc'
                ],
                tasks: ['build'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }
    });

    grunt.registerTask('build', ['eslint:main', 'jscpd:main', 'babel:main', 'mochaTest']);
    grunt.registerTask('start', ['build', 'execute:main']);
};
