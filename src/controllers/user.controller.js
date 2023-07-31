const UserModel = require("../models/User.model");

export const getUser = async (id) => {
	try {
		 const user = await UserModel.findById(id);
         console.log(user);
         if(!user){
            console.log("el Usuario no existe")
            return;
         }
	} catch (error) {
        console.log(error);
	}
}