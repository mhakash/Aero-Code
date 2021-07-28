import { dbConnect } from '../utils/dbConnect';
import { Message, User } from 'types';
import { ObjectID, UpdateWriteOpResult } from 'mongodb';
import { ObjectId } from 'mongodb';

export const addMessage = async (
  chat_room_id: string,
  sender: string,
  msg: string,
): Promise<UpdateWriteOpResult> => {
  try {
    const message = {
      sender_id: sender,
      text: msg,
    };
    // console.log('creating message');
    const messageCollection = (await dbConnect()).db.collection('Message');
    const result = await messageCollection.insertOne(message);
    // console.log('Message inserted', result.insertedId);
    const chatRoomCollection = (await dbConnect()).db.collection('ChatRoom');
    // console.log(chat_room_id);
    const promise = await chatRoomCollection.updateOne(
      { _id: new ObjectId(chat_room_id) },
      { $push: { messages: result.insertedId } },
    );
    // console.log(promise);
    return promise;
  } catch (err) {
    console.log(err);
    throw new Error('connection error');
  }
};

export const getMessageByChatRoomId = async (
  chat_room_id: string,
  user_id: string,
): Promise<{msgs:Message[], chat: { _id: string; friend_id: string; friend_name: string; friend_avatar: string }}> => {
  try {
    const chatRoomCollection = (await dbConnect()).db.collection('ChatRoom');
    const chatRoom = await chatRoomCollection.findOne({
      _id: new ObjectId(chat_room_id),
    });

    let stringIds: string[] = chatRoom.messages ?? [];
    let objectIdArray = stringIds.map((s) => new ObjectId(s));
    const messageCollection = (await dbConnect()).db.collection('Message');
    const cursor = messageCollection.find({ _id: { $in: objectIdArray } });
    const result: Message[] = [];
    for await (const doc of cursor) {
      result.push(doc);
    }

    const userCollection = (await dbConnect()).db.collection('users');
    const user: User = await userCollection.findOne({
     _id: user_id,
    });
    const chatrooms:{ _id: string; friend_id: string; friend_name: string; friend_avatar: string } [] = user?.chatRooms??[];
    const chat_detail = chatrooms.find(e => {
      const e_id = e._id.toString();
      return e_id===chat_room_id;
    });

    const ret = { msgs: result, chat: chat_detail as { _id: string; friend_id: string; friend_name: string; friend_avatar: string } };
    return ret;
  } catch (err) {
    throw new Error('cannot get');
  }
};

export const getLastMessage = async (_id: string): Promise<Message> => {
  try {
    const chatRoomCollection = (await dbConnect()).db.collection('ChatRoom');
    const chatRoom = await chatRoomCollection.findOne({ _id: new ObjectId(_id) });

    let stringIds: string[] = chatRoom.messages ?? [];
    let objectIdArray = stringIds.map((s) => new ObjectId(s));
    const last_msg_id = objectIdArray[objectIdArray.length - 1];

    const messageCollection = (await dbConnect()).db.collection('Message');
    const result = messageCollection.findOne({ _id: last_msg_id });

    return result;
  } catch (err) {
    console.log('Error in getLastMessage');
    throw new Error('cannot get');
  }
};

export const getMessageFriends = async (
  user_id: string,
): Promise<{ _id: string; friend_name: string; recentmsg: Message, friend_avatar: string }[]> => {
  try {
    const userCollection = (await dbConnect()).db.collection('users');
    const currentUser = await userCollection.findOne({ _id: user_id });
    //console.log("current user paise "+currentUser);
    let chat_rooms: { _id: string; friend_id: string; friend_name: string, friend_avatar: string }[] =
      currentUser.chatRooms ?? [];
    //let chatRoomIdArray = chat_rooms.map((s) => new ObjectId(s._id));
    //console.log(chatRoomIdArray);

    const result: { _id: string; friend_name: string; recentmsg: Message, friend_avatar: string }[] = [];

    for (let index = 0; index < chat_rooms.length; index++) {
      const temp_msg = await getLastMessage(chat_rooms[index]._id);
      result.push({
        _id: chat_rooms[index]._id,
        friend_name: chat_rooms[index].friend_name,
        recentmsg: temp_msg,
        friend_avatar: chat_rooms[index].friend_avatar,
      });
    }

    return result;
  } catch (err) {
    throw new Error('cannot get');
  }
};
