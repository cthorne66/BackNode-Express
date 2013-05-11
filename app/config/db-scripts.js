db = new Mongo().getDB("backnode-express");

var post1 = [{"id":1,"title":"Lorem Ipsum","content":"Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.","userId":"1","createDate":1367986140692,"comments":[{"id":"1","content":"My comment","userId":"1","createDate":1367986140692}]}];

db.posts.insert(post1);