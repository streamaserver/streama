First off, thank you for considering contributing to Streama. It’s people like you that make Streama a competitor to the big players on the market.

# Set Up Streama for Development
* Best IDE is definitely IntelliJ IDEA
* get a local mysql running
* optional: get grails 3.1.14 (Use [SDKMAN](http://sdkman.io/index.html) to download it)
* get JDK7
* import project as gradle project in IDE (with intelliJ IDEA: open the build.gradle file specifically, not the entire directory)
* run using the gradle bootrun (I always run in debug mode) 

Heres a video of streama being set up: 
https://www.youtube.com/watch?v=hn9grcWbBFM&t=11s

# How to report a bug 

## Step 1. FAQs and Issues
First, please look at the FAQs to see if your issue has been addressed there. Then, please do a rough search for your problem within the issues of the application (removing the filter, so even closed issues are included). If you couldn't solve your problem this way, please proceed with step 2. 

## Step 2: The basic info
With each bug-report, make sure to provide the most basic information: 
- What system are you running streama on? 
- What browser are you using? 
- What OS are you using? 
- Does the error also occur in another browser / OS? if so, specify
- What version of streama are you running? 
- Did you use a release-version or did you compile the war from source? 

Example: 
```
system: Ubuntu 14.04
browser: Chrome
os: OSX
other systems: The error also occurs in Firefox
streama: v1.0.21
using release: yes
```

## Step 3: going into detail 
This step varies widely depending on the kind of issue that you are encountering.  
### Visual Bug
Are you encountering a visual bug? Then provide a screenshot and the current Streama URL. 

### Internal server error
- Are you encountering an internal server error? Then please look in the console output of the running streama Application. The error usually looks like this: 

![](http://i.imgur.com/K28hY2u.png)

Please make sure when copying the stacktrace to catch the entire thing from the first ***ERROR*** to the last **at ...**. Use http://pastebin.com/ to provide the stacktrace. 

### Not sure
If you are not sure what the error might be, then please look in the server logs for the output that comes when you do the desired activity and provide any output that comes, if any, as well as check the browser console (f12) for any errors that might have come up there and copy them out either by screenshotting or copy-paste. If its a longer error, please use http://pastebin.com/
