import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod';
import {usernameValidation} from "@/schemas/signUpSchema";
const UsernameQuerySchema = z.object({
    username: usernameValidation

})

export async function GET(request: Request) {
  await dbConnect();

  try {
    const {searchParams} = new URL(request.url)
    const queryParam = {
      username: searchParams.get('username')
    }
    //validation with zod
    const result = UsernameQuerySchema.safeParse(queryParam)
    console.log(result); //TODO: remvoe

    if(!result.success){
      const usernameErrors = result.error.format().username?._errors || []
      return Response.json({
        success:false,
        message: usernameErrors?.length > 0
                    ? usernameErrors.join(',')
                    : 'Invalid Username'
      }, {status:400})
    }

    const {username} = result.data;

    const existingVerifiedUser = await UserModel.findOne({username, isVerified:true})
    // console.log(existingVerifiedUser)
    if(existingVerifiedUser){
      return Response.json({
        success:false,
        message:'Username is already taken',
      }, {status:400})
    }return Response.json({
      success:true,
      message:'Username is Unique',
    }, {status:200})
  

  } catch (error) {
    console.error("Error check username",error)
    return Response.json({
        success:false,
        message:"Error checking username"
    },
    {status:500}
    )
  }
}