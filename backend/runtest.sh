#!/bin/bash

mocha tests/test_register.js --exit
mocha tests/test_login.js --exit
mocha tests/test_submission_mine.js --exit
mocha tests/test_user_account.js --exit