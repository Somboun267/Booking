const jwt = require('jsonwebtoken')

exports.ProtectRoutes = async(req,res,next)=>{
    try{
         const auth = req.header("Authorization")
       

         if(!auth){
            return res.status(401).json({message:"No token, authorization "})
         }
         const token = auth.split(" ")[1];

         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);      
      
         req.user = decoded;

         next();
         
    } catch(err){
        console.log(err)
        res.status(500).json({ message:"Internal Error"})
    }
}

exports.ProtectRoutesRefresh = async(req,res,next)=>{
    try{
        const auth = req.header("Authorization")

        if(!auth){
            return res.status(401).json({message:"No token, authorization "})
         }
         const token = auth.split(" ")[1];
        
         const decoded = jwt.verify(token, process.env.REFERSH_TOKEN);
        
         req.user = decoded;
     
        next();

    }catch(err){
        console.log(err)
        res.status(500).json({ message:"Internal Error"})
    }
}