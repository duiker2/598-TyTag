from os import walk

f = []
path = "../data/user_logs"
t1_share_before_read = 0
t2_share_before_read = 0
for (dirpath, dirnames, filenames) in walk(path):
    for filename in filenames:
        with open(path + "/" + filename, "r") as f:
            clicked_links = []
            n_share_before_read = 0
            for line in f:
                line = line.replace("\n", "")
                link_num = line.split(" ")[1]
                if "link" in line:
                    clicked_links.append(link_num)
                elif "share" in line:
                    if link_num not in clicked_links:
                        n_share_before_read += 1
                elif "upvote" in line:
                    pass
                    # print(line)
                elif "downvote" in line:
                    pass
                    # print(line)
            if "t1" in filename:
                t1_share_before_read += n_share_before_read
            elif "t2" in filename:
                t2_share_before_read += n_share_before_read
            print(filename, n_share_before_read)
print("type 1 shares before reading:", t1_share_before_read)
print("type 2 shares before reading:", t2_share_before_read)
