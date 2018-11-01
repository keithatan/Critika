#!/bin/bash

clear
mocha tests/test_register.js --exit
mocha tests/test_login.js --exit
mocha tests/test_submission_mine.js --exit
mocha tests/test_user_account.js --exit
mocha tests/test_verify_email.js --exit
mocha tests/test_getAllUsers --exit
mocha tests/test_editInfo --exit

mocha tests/end_test --exti
