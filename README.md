# streama
Ever had a huge bookshelf full of shows and movies? Ever wanted to digitalize them, but didn't have a good way of organizing the files? Worry no more! Streama is your own personal netflix for just such a purpose! 

## The technical Details
This application is web-based and is programmed with [Grails 2.4.4](https://grails.org/) and Mysql. For Login & User-Handling [SpringSecurity](http://projects.spring.io/spring-security/) is used. The player is completely html5-based, meaning there are limitations as to which file-types can be played. 

As an API for all the movies and shows I used the awesome API from theMovieDatabase. 
![theMovieDatabase](https://d3a8mw37cqal2z.cloudfront.net/images/header_v2.png)

##### getting started
All you need is a server (preferably ubuntu) with the following configurations:
- tomcat7
- mysql
- a mysql database called "streama" (default config uses username "root" and no password)
- a folder under /data/streama that is owned by tomcat7 (this is where all the files will be stored)


## The Application

### Dashboard
![Streama Dashboard](http://new.tinygrab.com/d9072ef564654c6e245c442e9c7d95facd4b738538.png)

On the dashboard a user can see his recently watched Tv-shows and Movies and their progress (he can continue where he left off) as well start new shows and movies that he hasn't yet seen. The "Continue Watching" Feature works by periodically updating the database with info about the currently watched Video and how far it has been seen.

If a Movie or Episode does not contain any video-files, it won't show up in the dashboard.


### The Player
![Streama Player](http://new.tinygrab.com/d9072ef56407e5d1ac40fab040aedc398a9abb3609.png)

The Streama-Player is (heavily) inspired by netflix, so you get all the good stuff from there. For Shows, there is "next episode" button, a handy episode- and season-browser, and then there are the basics, like volume-control, play/pause, and fullscreen. 
Later down the road I will add a feature to add subtitles and switch between video-files (for instance for different quality uploads). 
The player is html5-based and has only really been tested in chrome so far.


### The Admin-Panel
![Streama Admin](http://new.tinygrab.com/d9072ef56484ebb444cc2fc7bc11f18e9f1706f68f.png)

One of the most important things to me was to make managing shows, movies and episodes as easy and fun as possible. For this I made heavy use of the API from (theMovieDatabase.org)[https://www.themoviedb.org/], which auto-fills the episodes, shows and movies with useful information and great images, so that you, the user, will have hardly any work. 

For instance, creating a new Tv-Show and the episodes for the first season looks something like this: 

![Streama Creating Show](http://i.imgur.com/TLptKdp.gif)


And uploading video-files for each episode is as easy as drag-and-drop! 


![Streama Uploading Episode](http://i.imgur.com/StgES0S.gif)

