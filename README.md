# Textomate public API

Currently we have api examples in 3 languages: 
 - java
 - php 
 - shell

If you want to support project, your prs are highly welcome.

## shell example

To test api from shell, please run following command:

```bash
cd shell
sh wordcount.sh
```

You will receive following response:

```json
{
  "countedFiles": [
    {
      "wordsNumber": 340,
      "charsNumber": 2908,
      "charsNoSpacesNumber": 2506,
      "wordsNumberNN": 312,
      "charsNumberNN": 2755,
      "charsNoSpacesNumberNN": 2353,
      "md5": null,
      "fileName": "textomate-api.pdf",
      "error": null
    }
  ],
  "total": {
    "wordsNumber": 340,
    "charsNumber": 2908,
    "charsNoSpacesNumber": 2506,
    "wordsNumberNN": 312,
    "charsNumberNN": 2755,
    "charsNoSpacesNumberNN": 2353,
    "md5": null
  }
}
```