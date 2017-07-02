var Protobuf = require("protobufjs");
var proto = Protobuf.loadSync("./a.proto");

var TextMessage = proto.lookup("todaygame.TextMessage");

var textMessage = {name: "chenshao01", age: 25};

var errMsg = TextMessage.verify(textMessage);
if (errMsg) {
    console.log(errMsg);
}

var message = TextMessage.create(textMessage);

var buffer = TextMessage.encode(message).finish();

console.log(buffer);


var message1 = TextMessage.decode(buffer);

console.log(message1.name);
console.log(message1.age);
