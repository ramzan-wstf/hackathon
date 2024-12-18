import mongoose, { Schema, Document } from 'mongoose';

// Define the User schema
interface IUser extends Document {
    chatId: number;
    username?: string;
    points: number;
    token: number;
    activeAvatarId: Schema.Types.ObjectId;
    privateKey: string;
    swampCount : number;
    lastSwampAt: number;
    walletAddress: string;
    avatar: {
      id: Schema.Types.ObjectId,
      count: number;
    }[];
    unlocked: {
      id: Schema.Types.ObjectId;
      count: number;
    }[ 
    ]
}

const userSchema: Schema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
  },
  points: {
    type: Number,
    default: 0
  },
  walletAddress:{
    type: String,
    default: ""
  },
  privateKey:{
    type: String,
    default: ""
  },
  token:{
    type: Number,
    default : 0
  },
  swampCount:{
    type: Number,
    default: 0
  },
  lastSwampAt:{
    type: Number,
    default: 0
  },
  activeAvatarId:{
    type: Schema.Types.ObjectId,
    ref: 'Avatar'
  },
    // Add the avatar field to the User schema with id and count fields and reference the Avatar model and It should be array of objects and default value should be empty array and the id must be unique
  avatar:[
    {
      id:{
        type: Schema.Types.ObjectId,
        ref: 'Avatar',
        unique: true
      },
      count:{
        type: Number,
        default: 1
      }
    }
  ],
  unlocked: [
    {
      id:{
        type: Schema.Types.ObjectId,
        ref: 'Avatar',
        unique: true
      },
      count:{
        type: Number,
        default: 1
      }
    }
  ]

});

// Create the User model from the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
