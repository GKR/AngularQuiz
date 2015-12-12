
module.exports = function(config) {
  config.set({
    logLevel: config.LOG_INFO,
    browserNoActivityTimeout: 40000,
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['dots'],
    browsers: ['PhantomJS'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,

    files: [
      'public/js/vendor.js',
      'public/js/bundle.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/setup.js',
      'test/**/*-test.js'
    ],
    exclude: [],

    preprocessors: {
      'test/setup.js': ['sourcemap'],
      'test/**/*-test.js': ['sourcemap']
    },

    plugins: [
      'karma-junit-reporter',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ]
  });
};
