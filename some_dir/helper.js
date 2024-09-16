const foo = () => {
    console.log('hello from helper.js')
    console.log(__dirname)
    console.log(__filename)
    console.log(process.cwd())
}
// foo();
console.log('helper.js, !!!!!!!!!!');
module.exports = {sdf: foo};