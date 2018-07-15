#!/bin/bash

# get streama database user name, password and DB name for mysql
echo input mysql user name for streama database:
read -s USER
echo ''
echo input mysql user password for streama database:
read -s PASS
echo ''
echo input mysql database name for streama database:
read -s DB
echo ''

# check for 'user'/'users' table
if [ -z "$(mysql -u $USER --password=$PASS -D $DB -e "show tables like 'user'")" ]; then
	echo "'user' table does not exist"
	if [ -z "$(mysql -u $USER --password=$PASS -D $DB -e "show tables like 'users'")" ]; then
		echo "'users' table does not exist either"
		echo "there is an issue with your streama database"
	else
		echo "'users table exists'"
		echo "no need to rename table"
	fi

else
	echo "'user' table exists"
	echo "renaming 'user' table to 'users'"
	mysql -u $USER --password=$PASS -D $DB -e "ALTER TABLE user RENAME users"
        if [ -z "$(mysql -u $USER --password=$PASS -D $DB -e "show tables like 'users'")" ]; then
		echo "rename failed"
	else
		echo "rename succeeded"
	fi

fi

echo ""
echo "finished"
