define({ "api": [
  {
    "type": "GET",
    "url": "/advertisements/",
    "title": "Get Advertisements",
    "description": "<p>Get advertisements</p>",
    "name": "GetAdvertisements",
    "group": "Advertisements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Advertisement beginning name filter.</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "tags",
            "description": "<p>Advertisement tags filter. Valid tags: [&quot;work&quot;, &quot;lifestyle&quot;, &quot;motor&quot;, &quot;mobile&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "forSale",
            "description": "<p>filter. Casted to true when value is 'true' or '1'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Price range filter with format: 'minValue-maxValue'. 'minValue-' and '-maxValue' are also accepted.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "includeTotal",
            "description": "<p>filter. Response will return elements count if value is 'true' or '1'.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start",
            "description": "<p>Start, for pagination.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit of elements to obtain.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Will sort elements by its value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>rows with advertisements information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"rows\": [\n              {\n                  \"_id\": \"572d1ccddb794a84154a16dd\",\n                  \"name\": \"Bicicleta\",\n                  \"forSale\": true,\n                  \"price\": 230.15,\n                  \"picture\": \"bici.jpg\",\n                  \"tags\": [\n                      \"lifestyle\",\n                      \"motor\"\n                  ]\n              },\n              {\n                  \"_id\": \"572d1ccddb794a84154a16de\",\n                  \"name\": \"iPhone 3GS\",\n                  \"forSale\": false,\n                  \"price\": 50,\n                  \"picture\": \"iphone.png\",\n                  \"tags\": [\n                      \"lifestyle\",\n                      \"mobile\"\n                  ]\n              }\n          ]\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "QueryError",
            "description": "<p>Error trying to get advertisements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"success\": false,\n   \"error\": {\n       \"code\": 20,\n       \"message\": \"Error trying to get advertisements.\",\n       \"name\": \"QueryError\",\n       \"error\": {\n           \"message\": \"Cast to number failed for value \\\"garbage\\\" at path \\\"price\\\"\",\n           \"name\": \"CastError\",\n           \"kind\": \"number\",\n           \"value\": \"garbage\",\n           \"path\": \"price\"\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "v1/advertisements.js",
    "groupTitle": "Advertisements"
  },
  {
    "type": "get",
    "url": "/images/advertisements/:imageName",
    "title": "",
    "description": "<p>Get advertisement image</p>",
    "name": "GetAdvertisementImage",
    "group": "Images",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageName",
            "description": "<p>Advertisement image name (including extension).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "image",
            "optional": false,
            "field": "advertisement",
            "description": "<p>image.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "v1/images.js",
    "groupTitle": "Images"
  },
  {
    "type": "POST",
    "url": "/users/authenticate",
    "title": "Get User Token",
    "name": "GetUserToken",
    "description": "<p>Authenticate user. If user and password are correct, returns a token for API comunication.</p>",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>User password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "email",
          "content": "pe@pa.com",
          "type": "String"
        },
        {
          "title": "pass",
          "content": "123",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>json with authenticate information (token).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3MmY0ZTMzNGU4ZjhkMDAyZDA5NWZlZiIsImlhdCI6MTQ2MjcxOTIzOSwiZXhwIjoxNDYyODkyMDM5fQ.nN1ROfVLEFKXejwNNwKH2hY92ievZYamU7GC21sF4IE\"\n      }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false.</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>json with error information. UnvalidPass Authentication failed, invalid password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n      \"success\": false,\n      \"error\": {\n          \"code\": 10,\n          \"message\": \"Cannot crate user, that email already exist.\",\n          \"name\": \"DuplicatedEmail\",\n          \"error\": {\n              \"code\": 13,\n              \"message\": \"Authentication failed, invalid password.\",\n              \"name\": \"UnvalidPass\",\n              \"error\": \"Authentication failed, invalid password.\"\n          }\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "v1/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "POST",
    "url": "/users/register",
    "title": "Register User",
    "description": "<p>Register new user</p>",
    "name": "RegisterUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email. If email already exists, will return an error.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>User password to later authentication.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "name",
          "content": "Pepa",
          "type": "String"
        },
        {
          "title": "email",
          "content": "pe@pa.com",
          "type": "String"
        },
        {
          "title": "name",
          "content": "123",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200 Success": [
          {
            "group": "200 Success",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true.</p>"
          },
          {
            "group": "200 Success",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>json with user information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"success\": true,\n      \"data\": {\n          \"user\": {\n              \"__v\": 0,\n              \"name\": \"Pepa\",\n              \"email\": \"pe@pa.com\",\n              \"password\": \"a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3\",\n              \"_id\": \"572f4e334e8f8d002d095fef\"\n          }\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false.</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>json with error information. DuplicatedEmail Cannot crate user, that email already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n      \"success\": false,\n      \"error\": {\n          \"code\": 10,\n          \"message\": \"Cannot crate user, that email already exist.\",\n          \"name\": \"DuplicatedEmail\",\n          \"error\": {\n              \"code\": 11000,\n              \"index\": 0,\n              \"errmsg\": \"E11000 duplicate key error collection: nodepop.users index: email_1 dup key: { : \\\"pe@pe.com\\\" }\",\n              \"op\": {\n                  \"name\": \"Pepe\",\n                  \"email\": \"pe@pe.com\",\n                  \"password\": \"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad\",\n                  \"_id\": \"572f4ded4bff3fe8197660a5\",\n                  \"__v\": 0\n              }\n          }\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "v1/users.js",
    "groupTitle": "Users"
  }
] });