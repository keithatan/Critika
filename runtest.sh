#!/bin/bash

clear

# user tests
echo USER TESTS
echo ------------------------------------------------------------------------

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

#submission tests
echo SUBMISSION TESTS
echo ------------------------------------------------------------------------

mocha tests/submission/test_add_submission.js --exit
sleep 1
mocha tests/submission/test_add_comment.js --exit
sleep 1
mocha tests/submission/test_edit_submission.js --exit
sleep 1
mocha tests/submission/test_get_all_reported.js --exit
sleep 1
mocha tests/submission/test_get_all_submissions.js --exit
sleep 1
mocha tests/submission/test_get_available.js --exit
sleep 1
mocha tests/submission/test_get_mine.js --exit
sleep 1
mocha tests/submission/test_make_unavailable.js --exit
sleep 1
mocha tests/submission/test_remove_submission.js --exit
sleep 1
mocha tests/submission/test_report_comment.js --exit
sleep 1
mocha tests/submission/test_submission_mine.js --exit
sleep 1

#categories tests
echo CATEGORIES TESTS
echo ------------------------------------------------------------------------

mocha tests/category/test_create_category.js --exit
sleep 1
mocha tests/category/test_get_all_categories.js --exit
sleep 1
mocha tests/category/test_get_all_submissions_in_category.js --exit
sleep 1

#feedback tests
echo FEEDBACK TESTS
echo ------------------------------------------------------------------------

echo "All tests finished"