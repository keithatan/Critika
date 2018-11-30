#!/bin/bash

clear

ls tests/user

mocha tests/user/test_register.js --exit
sleep 1
mocha tests/user/test_verify_email.js --exit
sleep 1
mocha tests/user/test_login.js --exit
sleep 1
mocha tests/user/test_user_account.js --exit
sleep 1
mocha tests/user/test_getAllUsers.js --exit
sleep 1
mocha tests/user/test_reset_password_email.js --exit
sleep 1
mocha tests/user/test_editInfo.js --exit
sleep 1
mocha tests/user/test_add_friend.js --exit
sleep 1
mocha tests/user/test_add_coin.js --exit
sleep 1
mocha tests/user/test_ban_user.js --exit
sleep 1
mocha tests/user/test_become_admin.js --exit
sleep 1
mocha tests/user/test_change_email.js --exit
sleep 1
mocha tests/user/test_change_password.js --exit
sleep 1
mocha tests/user/test_change_security.js --exit
sleep 1
mocha tests/user/test_find_user.js --exit
sleep 1
mocha tests/user/test_remove_coin.js --exit
sleep 1
mocha tests/user/test_restore_user.js --exit
sleep 1
