db = new Mongo().getDB("mydb");

var post1 = [{"id":1,"title":"Lorem Ipsum","content":"Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.","user_id":"1","create_date":"2013-04-07 01:01:05","comments":[{"id":"1","content":"My comment","user_id":"1","create_date":"2013-04-07 01:01:05"}]}];

db.posts.insert(post1);