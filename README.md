# 598-Title-Replacer

Wyatt Duiker

Shekar Brahma

Data was collected from the front page of r/news on 11/29

# Tag generation
To generate tags with TF-IDF run:
```
python taggers/tfidf.py
```
Tags will be in /data/tags_tfidf.json

To generate tags with Apriori run:
```
python taggers/apriori.py
```
Tags will be in /data/tags_apriori.json

# Website and server
The server reads information on what the user clicks on our site.
In /site
```
npm start
```

To star the website
In /site/client
```
npm run dev
```
then go to localhost:8080 in a web browser
