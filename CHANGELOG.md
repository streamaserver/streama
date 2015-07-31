# Change Log

## [0.0.2] - 2015-07-31
### Breaking Changes
- Application now ignores settings for storage & API-Key in config.groovy. These values can now be adjusted in the user-interface. If the values are empty at first, the user gehts redirected to the settings page when trying to access the dashboard. 

### Improvements
- Added server-side validation for the API-Key
- Added server-side validation for the storage-path
