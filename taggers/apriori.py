import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import json
frequency_dict = {}
max_freq = 0

def most_freq_20_patterns(sequences, id, output_dict, minsup=2, maxlen=5):
    global max_freq
    global frequency_dict

    patterns = generate_patterns(sequences, minsup, maxlen)

    #collect long enough patterns and their support
    n = 10
    top_n = []
    flag = False
    for frequency in range(max_freq ,1,-1):
        if frequency in frequency_dict:
            for element in sorted(frequency_dict[frequency]):
                top_n.append((frequency, element))
                if len(top_n) >= n:
                    flag = True
                    break
        if flag:
            break

    #print results in correct format
    output_dict[id] = {}
    p = []
    for pattern in top_n:
    #     print('[%i, \'%s\']' % (pattern[0], pattern[1]))
    # print()
        p.append(pattern[1])
    output_dict[id]["tags"] = p
    # print(output_dict[id]["tags"])


#generate list of all patterns with given constraints
#using an algorithm similar to SPADE
def generate_patterns(sequences, minsup, maxlen):
    global max_freq
    global frequency_dict
    # print(sequences[0])

    patterns = {}
    freq_one_itemset = {}

    #fill freq_one_itemset dictionary with each element's SIDs and EIDs
    temp = {}
    for sid in range(len(sequences)):
        seq_elems = sequences[sid].split(' ')
        for eid in range(len(seq_elems)):
            if seq_elems[eid] in temp:
                temp[seq_elems[eid]].append((sid,eid))
                freq_one_itemset[seq_elems[eid]] = temp[seq_elems[eid]]
            else:
                temp[seq_elems[eid]] = [(sid,eid)]

    #add to pattern dictionary
    patterns[1] = freq_one_itemset

    currlen = 2

    while len(patterns[currlen-1]) > 1 and currlen<(maxlen+1):
        patterns[currlen] = generate_patterns_of_length(patterns[currlen-1], currlen, minsup)
        for item in patterns[currlen]:
            length = len(patterns[currlen][item])
            if length in frequency_dict:
                frequency_dict[length].append(item)
            else:
                frequency_dict[length] = [item]
                if length > max_freq:
                    max_freq = length
        currlen += 1

    #remove empty pattern list
    if patterns[currlen-1] == {}:
        del patterns[currlen-1]

    return patterns


#returns patterns with given length under given constraints
def generate_patterns_of_length(freq_patterns, length, minsup):
    locations = {}
    pattern_dict = {}
    temp = {}

    for pattern in freq_patterns:
        for location in freq_patterns[pattern]:
            locations[location] = pattern

    for pattern in freq_patterns:
        for location in freq_patterns[pattern]:
            next_elem = (location[0], location[1]+1)
            if next_elem in locations:
                phrase = combined_string(pattern, locations[next_elem])
                if phrase in temp:
                    temp[phrase].append(location)
                    pattern_dict[phrase] = temp[phrase]
                else:
                    temp[phrase] = [location]

    return pattern_dict


# return starts of contiguous sequences
def contiguous_locations(first_locations, second_locations):
    locations = []
    for start in first_locations:
        #check if element has EID+1
        #also point of overlap for length > 1
        next_elem = (start[0], start[1]+1)
        if next_elem in second_locations:
            locations.append(start)
    return locations


# combines two strings and takes into account overlaps
def combined_string(first, second):
    first_words = first.split(' ')
    return first_words[0] + ' ' + second


if __name__ == "__main__":
    with open("data/input.json", "r") as f:
        contents = f.read()
        article_dict = json.loads(contents)
    stop_words = set(stopwords.words('english'))
    output_dict = {}
    for id in article_dict.keys():
        frequency_dict = {}
        max_freq = 0
        raw_text = article_dict[id]["article"]

        corpus = raw_text.split(".")
        preprocessed_corpus = []
        for sent in corpus:
            sent = sent.strip()
            words = sent.split(" ")
            for word in words:
                if word in stop_words:
                    words.remove(word)
            sent = " ".join(words)
            preprocessed_corpus.append(sent)
        most_freq_20_patterns(preprocessed_corpus, id, output_dict, minsup=4, maxlen=4)

    with open("data/tags_apriori.json", "w") as f:
        json.dump(output_dict, f, indent=4)
