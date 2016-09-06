module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js', /* следим за статикой */
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true /* перезагрузить страницу */
                }
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8080' /* запуск сервера */
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates', /* исходная директория */
                    src: '*.xml', /* имена шаблонов */
                    dest: 'public_html/js/tmpl' /* результирующая директория */
                }],
                options: {
                    template: function (data) { /* задаем формат функции-шаблона */
                        return grunt.template.process(
                            'var <%= name %>Tmpl = <%= contents %> ;', /* присваиваем функцию-шаблон переменной */
                            {data: data}
                        );
                    }
                }
            }
        },
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true /* Вывод логов */
            }
        }

    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('default', ['concurrent']); /* задача по умолчанию */

};
