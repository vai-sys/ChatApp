import cloudinary from "../config/cloudinary.js";

export const getUserForSidebar=async (req,res) =>{
try{
    const loggedInUser=req.user._id;
    const filteredUsers=await User.find({_id:{$ne : loggedInUser}}).select("-password");
    res.status(200).json(filteredUsers)


}
catch(err){
    console.error("Errror in getUsersForSidebar :" ,err.message)
res.status(500).json({error:"Internal Server Error"})
}
}

export const getMessages=async (req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const MyId=req.user._id;
        const messages=await MessageChannel.find({
            $or:[
                {MyId:MyId , receiverId :userToChatId} 
                ,{MyId:userToChatId ,receiverId:userToChatId}
            ]
        });
        res.status(200).json(messages);



    }
    catch(err){
         console.log("Error in getMessages Controller :" ,err.message);
         res.status(500).json("internal server error")
    }
};


export const sendMessage=async(req,res)=>{
try{
const {text,image}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user._id;
let imageUrl;
if(image){
    const uploadResponse=await cloudinary.uploader.upload(image);
    imageUrl=uploadResponse.secure_url;


}
const newMessage=new Message ({
    senderId ,
    receiverId,
    text ,
    image:imageUrl
});
await newMessage.save();
res.status(201).json(newMessage);
}
catch(err){
    console.log(err);
    return res.status(500).json("Internal Server Error");
}
};

