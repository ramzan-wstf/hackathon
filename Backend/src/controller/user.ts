import { Request, response, Response } from "express";
import axios from "axios";
import mongoose from "mongoose";
import url from "node:url"
import User from "../models/userSchema";
import { finalChain, neoXRag, transactionDetails } from "../service/Agent";
import { getTransactions } from "../service/walletAdd";
import Transaction from "../models/transactions";
import { queryFilter,extractAndParseJSON, fetchReward, fetchAvatar, getRandomTokenReward, getRandomTapReward } from "../helper";
import { getTransactionInfo } from "../service/txnHash";
import { DbService } from "../service/dbService";

let txnObj:any = {
}

export class Users {
    
  static userdetails = async (req: Request, res: Response) => {
    try {
      const chatId = req.body.chatId
      console.log(chatId)
      const user = await DbService.getUser(chatId);
      console.log(user)
      console.log(user?.points)
      res.status(200).send({mesage:"User Found",data:user});
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  }


  static updatePoints = async (req: Request, res: Response) => {
    const { chatId, points } = req.body;
    if(points > 500) throw new Error("MAx Tap Limit Exceeded");
    console.log(chatId, points, "..............");
  
    try {
      const user = await User.findOne({ chatId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let swampActive = false;
      const lastRewardedPoints = user.lastSwampAt || 0;
  
      // Check if the points have crossed a 1K milestone since the last reward
      const milestonesCrossed = Math.floor(points / 1000) - Math.floor(lastRewardedPoints / 1000);
  
      if (milestonesCrossed > 0) {
        // Increment swamp count by the number of milestones crossed
        user.swampCount = (user.swampCount || 0) + milestonesCrossed;
  
        // Update the last rewarded points to the most recent milestone
        user.lastSwampAt = Math.floor(points / 1000) * 1000;
  
        swampActive = true;
      }
  
      // Update the user's points
      user.points = points;
  
      // Save changes to the user
      await user.save();
  
      return res.status(200).json({
        message: "Points updated successfully",
        user,
        swampActive,
      });
    } catch (error) {
      console.error("Error updating points:", error);
      res.status(500).json({ message: "Failed to update points", error });
    }
  };
  
  


  static getTransaction = async(req:Request,res:Response)=>{
    const { hash,chatId } = req.body;
    try {
      const transaction = await getTransactionInfo(hash);
      if(!transaction) return res.status(200).send({message:"Transaction not found. Please try Again",data: null});
      txnObj[chatId] = transaction;
      const txnSummary = await transactionDetails(hash,[],JSON.stringify(transaction));
      console.log(txnSummary)
      res.status(200).send({ message:"Transaction Found",data: {detail:transaction,explanation:txnSummary}});
    } catch (error) { 
      res.status(500).json({ message: "Failed to fetch transaction. Please Try Again", data:null });
    }
  }


  static getTransactionMsg = async(req:Request,res:Response)=>{
    const { message, history, chatId } = req.body;
    const hash = ""
    try {
      const transaction = await transactionDetails(message,history,JSON.stringify(txnObj[chatId]));
      res.status(200).send({ message:"Transaction Found",data: transaction});
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transaction. Please Try Again", data:null });
    }
  }


  static getNeox = async(req:Request,res:Response)=>{
    const { message, history } = req.body;
    try {
      const neox = await neoXRag(message,history);
      res.status(200).send({ message:"NeoX Found",data: neox});
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NeoX. Please Try Again", data:null });
    }
  }


  static fillWallet = async(req:Request,res:Response)=>{
    const { walletAddress } = req.body;
    try {
      const transaction = await getTransactions("0x8697477f54897ACADD7673B7c325ac31bd7F080d");
      res.status(200).send({ message:"Transaction Found",data: "Wallet Has been synced with RPC. You can now query the wallet"});
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transaction. Please Try Again", data:null });
    }
  }


  static queryWallet = async(req:Request,res:Response)=>{
    const { message } = req.body;
    try {
      const query:any = await finalChain(message,[]);
      console.log(query)
      const jsonObj = extractAndParseJSON(query);
      console.log(jsonObj)
      if(jsonObj){
        const query = queryFilter(jsonObj);
        try {
          let qStr = JSON.stringify(query);
          console.log(qStr)
          const transactions = await Transaction.find(query);
          return res.status(200).send({ message:"Transactions Found",data: transactions});
        } catch (error:any) {
          throw new Error(error);
        }
      }
      else {
        return res.status(200).send({ message:"Error Parsing the Message please try again",data: null});
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Failed to fetch transactions. Please Try Again", data:null });
    }
  }

  static avatars = async(req:Request,res:Response)=>{
    try {
      const {chatId} = req.body;
      const avatars = await DbService.getAvatars(chatId);
      return res.status(200).send({message:"Avatars Found",data:avatars});
    } catch (error) {
      return res.status(500).send({message:"Failed to fetch Avatars",data:null});
    }

  }

  static buyAvatar = async(req:Request,res:Response)=>{
    try {
      const { chatId, avatarId } = req.body;
      await DbService.assignAvatarToUser(chatId,avatarId);
      return res.status(200).send({message:"Avatar Bought Successfully",data:null});
    } catch (error) {
      return res.status(500).send({message:"Failed to buy Avatar",data:null});
    }
  }

  static swamp = async(req:Request,res:Response)=>{
    try {
      const { chatId } = req.body;
      const user = await User.findOne({ chatId });
      if (!user) {
        return res.status(404).send({message:"User not found",data:null});
      }
      if(user.swampCount == 0){
        return res.status(200).send({message:"No Swamp Available",data:null});
      }
      user.swampCount -= 1;
      await user.save();
      const reward = fetchReward();
      let response = {};
      if(reward == "Tokens"){
        const tokAmount = getRandomTokenReward();
        const user = await User.findOneAndUpdate(
          { chatId },
          { $inc: { token:  tokAmount} },
          { new: true }
        )
        response = {data:tokAmount,currentPoints:user?.points,type:"Tokens",message:"Token Reward Swamp Successfully"};
      }else if(reward == "Avatar"){
        const rank = fetchAvatar();
        const avatar:any = await DbService.fetchAvatarByRank(rank,chatId);
        response = {data:avatar,type:"Avatar",message:"Avatar Reward Swamp Successfully"};
      }else if(reward == "BonusTaps"){
        const tapPoints = getRandomTapReward()
        await User.findOneAndUpdate(
          { chatId },
          { $inc: { points:  tapPoints} },
          { new: true }
        );
        response = {data:tapPoints,type:"BonusTaps",message:"Bonus Taps Reward Swamp Successfully"};
      }
      return res.status(200).send(response);
    } catch (error) {
      console.log(error)
      return res.status(500).send({message:"Failed to Swamp",data:null});
    }
  } 
  

  static activeAvatar = async(req:Request,res:Response)=>{

    try {
      const { chatId, avatarId } = req.body;
      await DbService.setActiveAvatar(chatId,avatarId);
      return res.status(200).send({message:"Active Avatar Set Successfully",data:null});
    } catch (error) {
      return res.status(500).send({message:"Failed to set Active Avatar",data:null});
    }
  }

}