# 598-TyTag

Authors:
* Wyatt Duiker
* Shekar Brahma

# Data

Data was collected from the front page of reddit.com/r/news on 11/29. It is stored in data/input.json. Participant logs are in data/user_logs named in the format "tn_m" with n being the participant type (1 or 2) and m being the participant number (1-8).

# Tag generation
To generate tags with TF-IDF run:
```
python taggers/tfidf.py
```
* Tags generated can be found in [/data/tags_tfidf.json](https://github.com/duiker2/598-TyTag/blob/master/data/tags_tfidf.json)

To generate tags with Apriori run:
```
python taggers/apriori.py
```
* Tags generated can be found in [/data/tags_apriori.json](https://github.com/duiker2/598-TyTag/blob/master/data/tags_apriori.json)

# Website and server
The server reads information on what the user clicks on our site.

In /site
```
npm start
```

To start the website

In /site/client
```
npm run dev
```
then go to localhost:8080 in a web browser

# Tools
A text parser was used to interpret our data. This can be run with:
```
python tools/results.py
```
The output shows the number of articles shared before and after reading for both participant types. It also shows a binary array of which participants shared which article. In the first array, _arr[i][j]_ is 1 if the ith user shared the jth artcile before reading it and 0 otherwise. The second array has the same format for type 2 users.
