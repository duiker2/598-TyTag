from sklearn.feature_extraction.text import TfidfVectorizer

def main():
	vect = TfidfVectorizer()
	vect.fit_transform(corpus)
    vocab = vect.get_feature_names()


if __name__ == '__main__':
    main()
