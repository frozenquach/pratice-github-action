import {test as teardown} from '@playwright/test'
import fs from 'fs'
teardown('global teardown', async() => {
    console.log('teardownnnnnnnnnnn')
    fs.unlinkSync('authenticated.json')
})