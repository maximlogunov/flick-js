module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions', 'not dead']
      },
      useBuiltIns: 'usage',
      corejs: 3,
      modules: false
    }],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-transform-export-namespace-from'
  ]
}; 