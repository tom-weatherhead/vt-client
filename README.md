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
