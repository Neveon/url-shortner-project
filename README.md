# FCC Backend Project - URL Shortner Microservice
Check it out [here](https://neveon-url-short.glitch.me/)
### Details:
1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response.
Example : `{"original_url":"www.google.com","short_url":1}`

2. If I pass an invalid URL that doesn't follow the `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`

3. When I visit the shortened URL, it will redirect me to my original link.

example: `POST [project_url]/api/shorturl/new - https://www.google.com`

### What I Learned:
- Learned to use a module bundler, webpack, to be able to use React on [glitch.com](https://glitch.com). Allowed me to split and load code on demand.
- Learned a known [bug](https://techoverflow.net/2018/12/09/how-to-fix-webpack-error-describe-optionsschema-definitions-output-properties-path-description/) in webpack `4.20.0` that can be worked around by changing the version
- Learned `{useNewUrlParser:true}` removes DeprecationWarning when connect to the mongo database with `mongoose.connect(process.env.MONGO_URI)`
- Learned the use of `(*)` in the route parameter ignores the server trying to get into a sub directory when encountering http:// string.
⋅⋅*Example:(`/api/shortcut/new/https://www.github.com`)
- `dns.lookup()` only takes the hostname, not the full URL. Can be used to find valid working websites.
- The use of `new URL(someURL)` is not supported in IE11 or below
- Different returns when there is no data in `.find()` and `.findOne()`. One returns `[]` and the other `null`, respectively
