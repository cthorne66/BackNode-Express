db = new Mongo().getDB("backnode-express");

var post1 = [{"title":"Lorem Ipsum","content":"Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.","userId":"1","createDate":1367986140692,"comments":[{"content":"My comment","userId":"1","createDate":1367986140692}]}];

db.posts.insert(post1);

var user = [{"firstName":"admin","lastName":"admin","userName":"admin","email":"admin@admin.com","hashed_password":"71c90316f87a90751677fa02b6b16588e8bae54f","salt":"879800043150","createDate":0,"role":"admin"}];

db.users.insert(user);