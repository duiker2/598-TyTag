from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import json

def main():

    with open("data/input.json", "r") as f:
        contents = f.read()
        article_dict = json.loads(contents)

    # print(article_dict)
    for id in article_dict.keys():
        raw_text = article_dict[id]["article"]
        corpus = raw_text.split(".")

        #TODO fill corpus with article text from ../data/input.json

        tfidf = TfidfVectorizer(stop_words='english')
        tfs = tfidf.fit_transform(corpus)
        feature_names = np.array(tfidf.get_feature_names())
        idf = np.array(tfidf.idf_)
        tfidf_sorting = np.argsort(tfs.toarray()).flatten()[::-1]
        n = 10
        top_n = feature_names[tfidf_sorting][:n]
        print(top_n)

if __name__ == '__main__':
    main()
