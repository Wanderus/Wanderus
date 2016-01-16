# Wanderus

This is an application that allows users to find and enjoy outdoor recreational areas.

## Installations

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

### Mac

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

This will give you a path indicating that mongo is indeed installed.

Now, we are not yet finished. MongoDB needs a data folder so let's create it. In your terminal execute the following:

```bash
$ sudo mkdir -p /data/db
```

Next, change the permissions of that data directory to being readable and writable:

```bash
$ sudo chmod 777 /data/db
```

Now, let's excute the following to start up our mongo server or mongodaemon:

```bash
$ mongod
```

You will see lots of output. And something like: "waiting for connections on port 27017..."

To shut down the server, hit ctrl + C 2 times.

### Windows

Follow the link to install the latest version of mongoDB:

<https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/>

Make sure that you install the appropriate version for 32 bit or 64 bit machines.

Go to the Computer Setting and then the C: Drive.

Go into the Program files and look for the MongoDB folder.

Go into the server folder.

Look for the bin folder.

Open up Command Prompt.

Navigate to the directory that we are in.

```bash
$ cd "\Program Files\MongoDB\Server\3.0\bin"
```

Create the data directory.

```bash
$ mkdir \data\db
```

Now, you should have the folder.

Now, run the database with the following:

```bash
$ mongod
```

Now that you have installed all the neccessary components to make the project work, we can go ahead and set up the project.

## Project Setup

First, go to a directory on the computer that you want to put the project in and execute the following:

```bash
$ git clone https://github.com/Wanderus/Wanderus
```
Now, the project won't run now since we don't have all the node_modules required. Go inside the project root and execute the following:

```bash
$ npm install
```
npm grabs all of the dependencies listed in package.json and adds it to the project.

Now, start the MongoDB server with this command:

```bash
$ mongod
```

Finally, to start the project, execute the following:

```bash
$ npm start
```

This starts the project and uses port 3000 as a default. Go into the browser and visit http://localhost:3000. You should see the root page of the project!

Congratualations! You made it to the end. To terminate the server, hit Ctrl + C. Note that you should also terminate mongoDB as well. The command is given earlier in the walkthrough.
