# streama
Ever had a huge bookshelf full of shows and movies? Ever wanted to digitalize them, but didn't have a good way of organizing the files? Worry no more! Streama is your own personal netflix for just such a purpose! 

## The technical Details
This application is web-based and is programmed with [Grails 2.4.4](https://grails.org/) and Mysql. For Login & User-Handling [SpringSecurity](http://projects.spring.io/spring-security/) is used. The player is completely html5-based, meaning there are limitations as to which file-types can be played. 

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

