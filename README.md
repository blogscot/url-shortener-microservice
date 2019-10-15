# URL Shortener Microservice

To obtain a shortened URL the client sends a POST request to the microservice, i.e. `https://highfalutin-dragonfruit.glitch.me/api/shorturl/new` along with a JSON payload containing the URL address to be shortened, e.g.
```json
{
    "url": "www.duckduckgo.com"
}
```
Assuming the requested URL is valid, the microservice returns a JSON response containing the shortened URL:
```
{
    "original_url": "www.duckduckgo.com",
    "short_url": 4
}
```
By using this 'short URL', see below, the client browser will be redirected to the original URL.
```
https://highfalutin-dragonfruit.glitch.me/api/shorturl/4
```
