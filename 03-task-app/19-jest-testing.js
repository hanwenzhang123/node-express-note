// npm i jest
// in the package.json, add to "scripts": {"test": "jest"}
// fileName.test.js
// npm test

test("Hello World", ( )=>{ })    //test name and test function

test("This should fail", ()=>{ 
  throw new Error("Failure!")
})

//Why test?
// - save time
// - create reliable software
// - give flexibility to developers
// -    refactoring
// -    collaborating
// -    profiling (check speed)
// - peace of mind
