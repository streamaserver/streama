# Change Log

## [0.1.5]
### Features
- added notification system for your users, that way you can send out notification emails with your new content! 


## [[0.1.4]](https://github.com/dularion/streama/commit/7f2f0b14b02711ed4596bacf59eb94c6081ae2c2) - 2015-08-10
### Features
- added subtitle-upload, subtitles in player & subtitle-controls (currently only .vtt format)
- added improved file-manager modal
- shortened video-urls (using ID instead of hash)
- added error message for mismatching base url in video-player
- created directive for video player
- improved styling for alertify
- added timeline-scrubbing to socket-events for synchronized watching
- possibly added chromecast support for mobile devices
- improved viewingStatus to only fetch videos where files are not empty and sort by lastUpdated

### Bugfixes
- improved httpIntercepter: only add the browserSocketUUID to params, if params already contains the socketSessionId
- improved socket unsubscribe functionality
- fixed several visual bugs



## [[0.1.3]](https://github.com/dularion/streama/commit/b52f98a96a759da1024daad632be382d1cef9b57) - 2015-08-01
### Features
- Added another role, "Content Manager" and improved overall security. Now the following role-schema applies:
  - Users with the role **Admin** can edit Users & Settings. 
  - Users with the role **Content Manager** can edit content. 
  - Users with **both roles** have full rights.


## [[0.1.2]](https://github.com/dularion/streama/commit/68cf2fb474226399e1558c3f1088aff6a49c7328) - 2015-07-31
### Breaking Changes
- Application now ignores settings for storage & API-Key in `config.groovy`. These values can now be adjusted in the user-interface. If the values are empty at first, the user gets redirected to the settings page when trying to access the dashboard. 

### Improvements
- Added server-side validation for the API-Key
- Added server-side validation for the storage-path
