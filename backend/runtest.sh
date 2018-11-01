#!/bin/bash

clear
mocha tests/user/test_register.js --exit
mocha tests/user/test_login.js --exit
mocha tests/submission/test_submission_mine.js --exit
mocha tests/user/test_user_account.js --exit
mocha tests/user/test_verify_email.js --exit
mocha tests/user/test_getAllUsers --exit
mocha tests/user/test_editInfo --exit

