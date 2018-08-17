# vt-client
Virginia Tech project - Angular client

- From angular.json, before "lint" :

        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.spec.json",
            "karmaConfig": "src/karma.conf.js",
            "styles": [
              {
                "input": "styles.css"
              }
            ],
            "scripts": [],
            "assets": [
              {
                "glob": "favicon.ico",
                "input": "src/",
                "output": "/"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              }
            ]
          }
        },

Docker: (See https://medium.com/@DenysVuika/your-angular-apps-as-docker-containers-471f570a7f2 )

$ npm run ng serve --open
	- Then browse to http://localhost:4200

$ npm run build
	- This runs: ng build --prod

$ docker image build -t vt-client .
$ docker run -p 3000:80 --rm my-angular-app
	- Then browse to http://localhost:3000

$ docker-compose up
	- Then browse to http://localhost:3000
	- After you're done using the app, clean up via: $ docker-compose down
	- To really clean up: $ docker-compose down --rmi all
