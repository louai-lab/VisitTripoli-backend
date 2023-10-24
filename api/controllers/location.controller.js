import Location from "../models/locations.model.js"

export const createLocation = async (req,res,next)=>{
    const {id, title, address, timeFromCenter, googleRating, entranceFee, description, smallDescription, geoLocation, images, video} = req.body;
    const newLocation = new Location({
        id, 
        title, 
        address, 
        timeFromCenter, 
        googleRating, 
        entranceFee, 
        description, 
        smallDescription, 
        geoLocation, 
        images, 
        video
    });

    try{
        await newLocation.save();
        res.status(201).json({message: "Location created successfully!"})
    } catch (error) {
        next(error);
    }
}
export const updateLocation = async (req,res,next)=>{
    try{
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, {
            $set: {
                id: req.body.id,
                title: req.body.title,
                address: req.body.address,
                timeFromCenter: req.body.timeFromCenter,
                googleRating: req.body.googleRating,
                entranceFee: req.body.entranceFee,
                description: req.body.description,
                smallDescription: req.body.smallDescription,
                geoLocation: req.body.geoLocation,
                images: req.body.images,
                video: req.body.video,
            }
        }, {new: true})


        res.status(200).json(updatedLocation);
    } catch (error){
        next(error)
    }
}
export const deleteLocation = async (req,res,next)=>{
    try{
        await Location.findByIdAndDelete(req.params.id);
        res.status(200).json('Location has been deleted successfully!')
    } catch (error) {
        next(error);
    }
}
export const getOneLocation = async (req,res)=>{
    const location = await Location.findOne({_Id: req.body.id})
    if(!location){
        return res.status(500).json({error: "can't find location. Double check id"});
    }
    try{
        res.status(200).json({location});
    } catch(error){
        res.status(500).json({error: "can't find location. Double check id"});
    }
}
export const getAllLocations = async (req,res)=>{
    const all = {};
    const allLocations = await Location.find(all);
    try{
        res.status(200).json(allLocations);
    } catch(error){
        res.status(500).json({error: "can't find locations"});
    }
}