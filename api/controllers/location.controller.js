import Location from "../models/locations.model.js"

export const createLocation = async (req,res,next)=>{
    try{
        const location = await Location.create(req.body);
        return res.status(201).json({location});
    } catch (error){
        next(error);
    }
}
export const updateLocation = async (req,res,next)=>{

}
export const deleteLocation = async (req,res,next)=>{

}
export const getOneLocation = async (req,res,next)=>{

}