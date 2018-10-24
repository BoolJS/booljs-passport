# Bool.js - Passport authentication Middleware

[![Build Status](https://travis-ci.org/BoolJS/booljs-passport.svg?branch=master)](https://travis-ci.org/BoolJS/booljs-passport) [![Dependencies status for booljs-passport](https://david-dm.org/booljs/booljs-passport.svg)](https://david-dm.org/booljs/booljs-passport) [![devDependency Status](https://david-dm.org/booljs/booljs-passport/dev-status.svg)](https://david-dm.org/booljs/booljs-passport#info=devDependencies) [![Code Climate](https://codeclimate.com/github/BoolJS/booljs-passport/badges/gpa.svg)](https://codeclimate.com/github/BoolJS/booljs-passport) [![Inline docs](http://inch-ci.org/github/booljs/booljs-passport.svg?branch=master)](http://inch-ci.org/github/booljs/booljs-passport)

[![booljs-passport NPM icon](https://nodei.co/npm/@booljs/passport.png)](https://npmjs.com/package/@booljs/passport)

[![Join the chat at https://gitter.im/BoolJS/booljs-passport](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/BoolJS/booljs-passport?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`booljs-passport` is a route middleware intended to enable developers to use Passport authentication strategies in the [bool.js Framework](http://booljs.co).

## Install

Install the package using

```
npm i -S booljs-passport
```

Bool.js Passport uses some peerDependencies you must have in your project. We encourage using `npm 3+` in all your projects, because is strict in making you declare them in your project.

```
npm i -S passport@0.3.2
```

Finally, you will need to install packages for the authentication strategies you will use in `booljs-passport`. Find them in [Passport](http://www.passportjs.org) website.

## Usage

First, register `booljs-passport` as well as the strategies you want to use in your bool.js application.

In `index.js`, declare:

```js
var booljs = require('bool.js');

(booljs('com.example.api', [ 'booljs-passport', 'passport-http-bearer' ])
    .setServerLoader('booljs-express')
    .setDatabaseLoader('booljs-mongoose')
    .run()
);
```

Then, define the strategies to be used, as well as the default one in a configuration file called `configuration/security.json`

```json
{
    "passport": {
        "strategies": [
            "bearer"
        ],
        "defaultStrategy": "bearer",
        "strategyOptions": {
            "session": false
        }
    }
}
```

Finally, create a new DAO module in `dao/passport.js` and implement them.

```js
'use strict';

module.exports = function (app) {
    var Bearer          = app.utilities['passport-http-bearer']
    ,   Token           = app.dao.Token
    ,   User            = app.dao.User;

    this.bearer = function (passport) {
        function convertUser(user, done) { done(null, user); }
        passport.serializeUser(convertUser);
        passport.deserializeUser(convertUser);

        return new Bearer.Strategy(function (accessToken, done) {
            var token = new Token()
            ,   user  = new User();

            return token.find(accessToken).then((_token) => {
                return _token && user.find(_token.user) || false;
            }).then((_user) => {
                done(null, _user || false);
            }).catch(done);
        });
    };

};
```

`booljs-passport` is an Omittable middleware. That means it's executed by default in all routes, unless you explicitly declare not to use it. The policy you must apply to a route in order to achieve it is `public: true`.

For example, in here, we declare a resource to list public venues as omitting the use of the middleware.

```js
'use strict';

module.exports = function (app) {
    var venue = new app.Controllers.Venue();

    return [
        {
            method: 'get',
            url: '/venues',
            action: venue.list,
            cors: true,
            public: true
        }
    ];

};
```

> Have in mind this policy will invalidate any authentication strategy, even if you declare one as a policy, thus you won't have any chance to get user info while using those routes. If you think you know how to solve this issue, please, help us; read the Contributing section to find out how.

### Customize settings

#### Configuration file

You must declare an object named `passport` in the configuration file to declare settings.

| Value           | Type       | Description                                                                          |
| :-------------- | :--------- | :----------------------------------------------------------------------------------- |
| defaultStrategy | String     | Describes the default authentication strategy to be used when not declared in route  |
| module          | String     | The name of the DAO module that contains strategies definitions. (Defaults Passport) |
| strategies      | String[]   | A list of strategies to be loaded into passport                                      |
| strategyOptions | Object     | The options to be passed by default to passport `authenticate` call                  |

#### Route options

In route, declare a policy called `authentication`.

| Value    | Type       | Description                                              |
| :------- | :--------- | :------------------------------------------------------- |
| strategy | String     | The authentication strategy to be used in the route      |
| options  | Object     | The options to be passed to passport `authenticate` call |

## Contributing

We're still making -or looking for- a serious contributing document. By now, feel free to contribute the way you usually do in other projects. If this is your first time, follow these steps:

1. Fork us
2. Make your changes
3. Commit by each file change, indicating what you did in that file.
4. Please –¡please!-, don't push until you get the tests completely passing (in this case is just once).
5. Push and make a pull request, describing what you did in general.
6. PR will go through an automated revision in Travis CI. If everything is correct, a peer-revision will start.

## FAQ

### What is bool.js?
Bool.js is an MVC Framework. But is not just any other framework; it gives us back the power to choose how to organize a well-designed project, so we can choose our dependencies, craft our architecture, choose our data connectors, and finally, work based on cool development structures without hesitating about learning the framework as is.

Bool.js also reminds the importance of having a cool workspace structure. That's why it's based on namespaces, leading us to focus on our code rather than focusing on managing complicated references to other files in our project.

### Can I migrate my projects to bool.js?
Of course you can. Bool.js is Free Software (not as in a *free* beer, but in *free* as a bird). Just remember to update all of your dependencies, arrange your code in the right project structure (we're very tight at that) and finally, use Node.js `4.0.0` or further versions.
