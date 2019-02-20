# FCC Backend Project - URL Shortner Microservice
Check it out [here](https://neveon-url-short.glitch.me/)
### Details:
1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response.
Example : `{"original_url":"www.google.com","short_url":1}`

2. If I pass an invalid URL that doesn't follow the `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`

3. When I visit the shortened URL, it will redirect me to my original link.

example: `POST [project_url]/api/shorturl/new - https://www.google.com`

### What I Learned:
