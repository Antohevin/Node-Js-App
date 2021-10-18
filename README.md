# NodejsApp

Api end point url and request body

Topic--

http://localhost:3030/topic/createtopic

{
    "topicname":"Nature",
    "createdby":"61691123612d2a05e4d735aa",
    "modifiedby":"61691123612d2a05e4d735aa",
    "statusflag":"A"
 
}

--post
http://localhost:3030/post/createpost

{
    "imageurl":"imageurl",
    "topicid":"616a48cde8565a36fc36ea5f",
    "caption":"imageurl",
    "createdby":"61691123612d2a05e4d735aa",
    "modifiedby":"61691123612d2a05e4d735aa"
 
}

--comment
http://localhost:3030/comment/createcomment

{
    "comment":"first Comment",
    "topicid":"616a48cde8565a36fc36ea5f",
    "postid":"616a48fde8565a36fc36ea60",
    "caption":"imageurl",
    "createdby":"61691123612d2a05e4d735aa",
    "modifiedby":"61691123612d2a05e4d735aa"
 
}

--get topic--
http://localhost:3030/topic/gettopic?pagesize=2&pageno=1

--get post--
http://localhost:3030/post/getpost?pagesize=2&pageno=1
