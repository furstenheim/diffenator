## Diffenator

List all files that have changed or that depend on a file that has changed. This is mainly useful to only run tests on code that has been modified.

## Installation

    npm i --save-dev diffenator

## Usage

    ## List all files in ./test that have been modified with respect to master
    npx diffenator HEAD -- test

## Combining with mocha

    npx diffenator HEAD -- test | xargs mocha

## Example

Suppose that the layout of the project is the following

    .
    ├── a.js
    ├── b.js
    └── test
        ├── aTest.js
        └── bTest.js

Where `test/aTest.js` depends on `a.js` and `test/bTest.js` depends on `b.js`. If we modify `b.js` then

    # Modify b.js
    echo "" >> b.js

    # List all files in directory that have changed or that depend in a file that has changed
    npx diffenator -- test
    > test/bTest.js