# Change Log
## [[0.0.3]](https://github.com/dularion/streama/commit/b52f98a96a759da1024daad632be382d1cef9b57) - 2015-08-01
### Features
- Added another role, "Content Manager" and improved overall security. Now the following role-schema applies:
  - Users with the role **Admin** can edit Users & Settings. 
  - Users with the role **Content Manager** can edit content. 
  - Users with **both rules** have full rights.


## [[0.0.2]](https://github.com/dularion/streama/commit/68cf2fb474226399e1558c3f1088aff6a49c7328) - 2015-07-31
### Breaking Changes
- Application now ignores settings for storage & API-Key in `config.groovy`. These values can now be adjusted in the user-interface. If the values are empty at first, the user gehts redirected to the settings page when trying to access the dashboard. 

### Improvements
- Added server-side validation for the API-Key
- Added server-side validation for the storage-path
