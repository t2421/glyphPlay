import babel from 'rollup-plugin-babel';



export default{
  entry:'src/js/main.js',
  format:'umd',
  moduleName:'fcklib',
  useStrict:true,
  plugins:[
  	babel(),
    // uglify()
  ],
  dest:'./public/scripts/module.js',
  sourceMap:"inline",
  treeshake:true
};