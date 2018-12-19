from os import walk

f = []
path = "data/user_logs"
t1_share_before_read = 0
t2_share_before_read = 0
t1_share_after_read = 0
t2_share_after_read = 0
t1_data = []
t2_data = []
for (dirpath, dirnames, filenames) in walk(path):
    for filename in filenames:
        with open(path + "/" + filename, "r") as f:
            clicked_links = [0]*25
            shared_before_read_links = [0]*25
            n_share_before_read = 0
            n_share_after_read = 0
            for line in f:
                line = line.replace("\n", "")
                link_num = line.split(" ")[1]
                if "link" in line:
                    clicked_links[int(link_num)-1] = 1
                elif "share" in line:
                    if clicked_links[int(link_num)-1] == 1:
                        # shared_before_read_links[int(link_num)-1] = 1
                        n_share_after_read += 1
                    else:
                        shared_before_read_links[int(link_num)-1] = 1
                        n_share_before_read += 1
                elif "upvote" in line:
                    pass
                    # print(line)
                elif "downvote" in line:
                    pass
                    # print(line)
            if "t1" in filename:
                t1_share_before_read += n_share_before_read
                t1_share_after_read += n_share_after_read
                t1_data.append(shared_before_read_links)
            elif "t2" in filename:
                t2_share_before_read += n_share_before_read
                t2_share_after_read += n_share_after_read
                t2_data.append(shared_before_read_links)
            # print(filename, " shares before reading : ", n_share_before_read)
            # print(filename, " shares after reading  : ", n_share_after_read)
print("type 1 shares before reading:", t1_share_before_read)
print("type 1 shares after reading :", t1_share_after_read)
print("type 2 shares before reading:", t2_share_before_read)
print("type 2 shares after reading :", t2_share_after_read)
print()
print("type 1 array\n", t1_data)
print()
print("type 2 array\n", t2_data)
#
# for i in range(8):
#     print(sum(t1_data[i]))
#
# for i in range(8):
#     print(sum(t2_data[i]))
