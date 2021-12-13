// import * as main from "../src/main";
// import * as utils from "../src/utils";
// import * as fs from 'fs';
const main = require('../src/main');
const utils = require('../src/utils');
const sinon  = require('sinon');
const { partitionObjectKey } = require('../src/utils');
const fs = require('fs');

describe('', async () => {
    it('calling main partitions files into chunks', async () => {
        sinon.stub(utils, 'getS3Body').returns(Promise.resolve(fs.readFileSync("./src/constants/Users.txt", "utf8")));
        partitionObjectKey({
            Bucket: 'test',
            Key: 'test',
            size: 5,
        })
    });
});