# Wanderus 

This is an application that allows users to find and enjoy outdoor recreational areas. 

## Project Setup

Before you set up the application, you should make sure that the following is installed on your machine:

1. git
2. Node.js
3. MongoDB

## 1. git

Please follow the link <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git> 
and install git if you have not installed it on your computer

## 2. Node.js

Please follow the link <https://nodejs.org/en/download/> 
and install Node.js if you have not installed it on your computer. 

## 3. MongoDB

The installation of MongoDB is tricky. Be sure to follow the steps given here:

1. Mac

There are two ways to install. We will take the approach of doing it with homebrew, the depedency manager
of OSX.

Go to the root of your directory and execute the following: 

```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Next, execute the following: 

```bash
$ brew install mongodb
```

Let's do a quick sanity check to make sure that MongoDB is actually installed. Execute the following:

```bash
$ which mongod                                                                     
```

Now, we are not yet finished. MongoDB needs a data folder so let's create it. 
In your terminal execute the following:

```bash 
$ sudo mkdir -p /data/db
```

Next, change the permissions of that data directory is readable and writable:

```bash 
$ sudo chmod 777 /data/db
```

Now, let's excute the following to start up our mongo server or mongodaemon:

```bash
$ mongod
```

You will see lots of output. And something like: "waiting for connections on port 27017..."

To shut down the server, hit ctrl + C 2 times. 





