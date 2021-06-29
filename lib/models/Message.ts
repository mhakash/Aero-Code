import { dbConnect } from '../utils/dbConnect';
import { Message } from 'types';
import {  UpdateWriteOpResult } from 'mongodb';
var ObjectId = require('mongodb').ObjectID;

export const addMessage = async (chat_room_id: string, sender: string,  msg: string): Promise<UpdateWriteOpResult> => {
    try {
        const message = {
            sender_id: sender,
            text:msg
        };
        console.log("creating message")
        const messageCollection = (await dbConnect()).db.collection('Message');
        const result = await messageCollection.insertOne(message);
        console.log("Message inserted", result.insertedId);
        const chatRoomCollection = (await dbConnect()).db.collection('ChatRoom');
        console.log(chat_room_id);  
        const promise = await chatRoomCollection.updateOne( { _id: ObjectId(chat_room_id) }, { $push: { messages: result.insertedId } });
        console.log(promise);
        return promise;
    } catch (err) {
        console.log(err);
      throw new Error('connection error');
    }
  };

  export const getMessageByChatRoomId = async (
    chat_room_id: string,
  ): Promise<Message[]> => {
    try {
    const chatRoomCollection = (await dbConnect()).db.collection('ChatRoom');
    const chatRoom = chatRoomCollection.findOne({_id: chat_room_id});
    let stringIds:string[] = chatRoom.messages ?? [];
    let objectIdArray = stringIds.map(s => ObjectId(s));
    const messageCollection = (await dbConnect()).db.collection('Message');
    const cursor = messageCollection.find({_id: { $in: objectIdArray }})
    const result: Message[] = [];
    for await (const doc of cursor) {
        result.push(doc);
    }
    console.log(result.length);
    return result;

    } catch (err) {
      throw new Error('cannot get');
    }
  };
  