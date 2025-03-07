// issue.controller.js
const Issue = require('../models/issue.model');
const user = require('../models/user.model');
// const mechanic = require('../models/mechanic.model');
const Mechanic = require('../models/mechanic.model'); // Fix import name

// const upload = require('../middlewares/uploads');
// const upload =  require('../middlewares/uploads')

// exports.createIssue = async (req, res) => {
//     try {
//         const { user_Id, issueType, description, address, latitude, longitude } = req.body;
//         const photoUrl = req.file ? req.file.location : null;

//         if (!user_Id || !issueType || !description || !address || !latitude || !longitude || !photoUrl) {
//             return res.status(400).send({ message: 'All fields are required', status: 400 });
//         }

//         const newIssue = await Issue.create({
//             user_Id,
//             issueType,
//             description,
//             address,
//             latitude,
//             longitude,
//             photoUrl
//         });

//         // Find nearby mechanics based on latitude and longitude
//         const nearbyMechanics = await mechanic.find({
//             latitude: { $near: latitude },
//             longitude: { $near: longitude }
//         });

//         // Notify nearby mechanics (you can implement this logic as per your requirements)
//         // For example, send a notification to nearby mechanics

//         return res.status(200).send({ data: newIssue, message: 'Issue created successfully', status: 200 });
//     } catch (error) {
//         return res.status(500).send({ message: error.message, status: 500 });
//     }
// };



// exports.createIssue = async (req, res) => {
//     try {
//         const { user_Id, issueType, description, address, latitude, longitude } = req.body;
//         const photoUrl = req.file ? req.file.path : null; // Get the file path from Multer

//         // Convert latitude and longitude to numbers
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             return res.status(400).json({ message: "Invalid latitude or longitude format." });
//         }

//         if (!user_Id || !issueType || !description || !address || !photoUrl) {
//             return res.status(400).send({ message: 'All fields are required', status: 400 });
//         }

//         const newIssue = await Issue.create({
//             user_Id,
//             issueType,
//             description,
//             address,
//             // latitude,
//             // longitude,
//             latitude: lat,
//             longitude: lon,
//             photoUrl // Save the file path in the database
//         });

//         // Find nearby mechanics based on latitude and longitude
//         // const nearbyMechanics = await mechanic.find({
//         //     latitude: { $near: latitude },
//         //     longitude: { $near: longitude }
//         // });

//         // ✅ FIXED: Use converted `lat` and `lon` in the query
//         const nearbyMechanics = await mechanic.find({
//             latitude: { $near: lat },  
//             longitude: { $near: lon }
//         });

//         // ✅ Find nearby mechanics using GeoJSON $near
//         // const nearbyMechanics = await mechanic.find({
//         //     location: {
//         //         $near: {
//         //             $geometry: {
//         //                 type: "Point",
//         //                 coordinates: [lon, lat] // [longitude, latitude]
//         //             },
//         //             $maxDistance: 5000 // 5 km radius
//         //         }
//         //     }
//         // });


//         // Notify nearby mechanics (you can implement this logic as per your requirements)
//         // For example, send a notification to nearby mechanics

//         return res.status(200).send({ 
//             data: newIssue, 
//             message: 'Issue created successfully', 
//             nearbyMechanics,
//             status: 200 
//         });
//     } catch (error) {
//         return res.status(500).send({ message: error.message, status: 500 });
//     }
// };



// exports.createIssue = async (req, res) => {
//     try {
//       const { user_Id, issueType, description, address, latitude, longitude } = req.body;
//       const photoUrl = req.file ? req.file.path : null;
  
//       // Debugging: Log the request body
//       console.log("Request Body:", req.body);
  
//       // Convert latitude and longitude to numbers
//       const lat = parseFloat(latitude);
//       const lon = parseFloat(longitude);
  
//       // Validate latitude and longitude
//       if (isNaN(lat) || isNaN(lon)) {
//         return res.status(400).json({ message: "Invalid latitude or longitude format. They must be numbers." });
//       }
  
//       if (!user_Id || !issueType || !description || !address || !photoUrl) {
//         return res.status(400).send({ message: 'All fields are required', status: 400 });
//       }
  
//       const newIssue = await Issue.create({
//         user_Id,
//         issueType,
//         description,
//         address,
//         latitude: lat,
//         longitude: lon,
//         photoUrl
//       });
  
//       // Find nearby mechanics
//       const nearbyMechanics = await mechanic.find({
//         latitude: { $near: lat },
//         longitude: { $near: lon }
//       });
  
//       return res.status(200).send({
//         data: newIssue,
//         message: 'Issue created successfully',
//         nearbyMechanics,
//         status: 200
//       });
//     } catch (error) {
//       return res.status(500).send({ message: error.message, status: 500 });
//     }
//   };



exports.createIssue = async (req, res) => {
  try {
    const { user_Id, issueType, description, address, latitude, longitude } = req.body;
    const photoUrl = req.file ? req.file.path : null;

    // Debugging: Log the request body
    // console.log("Request Body:", req.body);

    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Debugging: Log the parsed latitude and longitude
    // console.log("Parsed Latitude:", lat, "Type:", typeof lat);
    // console.log("Parsed Longitude:", lon, "Type:", typeof lon);

    // Validate latitude and longitude
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "Invalid latitude or longitude format. They must be numbers." });
    }

    if (!user_Id || !issueType || !description || !address || !photoUrl) {
      return res.status(400).send({ message: 'All fields are required', status: 400 });
    }

    const newIssue = await Issue.create({
      user_Id,
      issueType,
      description,
      address,
      latitude: lat,
      longitude: lon,
      photoUrl
    });

    // Find nearby mechanics
    // const nearbyMechanics = await mechanic.find({
    //   latitude: { $near: lat },
    //   longitude: { $near: lon }
    // });

    return res.status(200).send({
      data: newIssue,
      message: 'Issue created successfully',
    //   nearbyMechanics,
      status: 200
    });
  } catch (error) {
    console.error("Error in createIssue:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};




// exports.createIssue = async (req, res) => {
//     try {
//         const { user_Id, issueType, description, address, latitude, longitude } = req.body;
//         const photoUrl = req.file ? req.file.path : null; // Get the file path from Multer

//         // Convert latitude and longitude to numbers
//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             return res.status(400).json({ message: "Invalid latitude or longitude format." });
//         }

//         // if (!user_Id || !issueType || !description || !address || !photoUrl) {
//             if (!user_Id || !issueType || !description || !address || !photoUrl) {
//             return res.status(400).send({ message: 'All fields are required', status: 400 });
//         }

//         const newIssue = await Issue.create({
//             user_Id,
//             issueType,
//             description,
//             address,
//             latitude: lat,
//             longitude: lon,
//             photoUrl // Save the file path in the database
//         });

//         // Find nearby mechanics based on latitude and longitude
//         const nearbyMechanics = await mechanic.find({
//             latitude: { $near: lat },
//             longitude: { $near: lon }
//         });

//         // Notify nearby mechanics (you can implement this logic as per your requirements)
//         // For example, send a notification to nearby mechanics

//         return res.status(200).send({ 
//             data: newIssue, 
//             message: 'Issue created successfully', 
//             nearbyMechanics,
//             status: 200 
//         });
//     } catch (error) {
//         return res.status(500).send({ message: error.message, status: 500 });
//     }
// };



exports.getUserIssues = async (req, res) => {
    try {
        const user_Id = req.params.userId;
        // const totalCount = await user.countDocuments({ deleteFlag: false }); // Count the total users

        const issues = await Issue.find({ user_Id }).sort({ createdAt: -1 });

        return res.status(200).send({ data: issues,  
            // totalCount, // Include the total count 
            message: 'Issues fetched successfully', 
            status: 200 });
    } catch (error) {
        return res.status(500).send({ message: error.message, status: 500 });
    }
};




// exports.findNearbyMechanics = async (req, res) => {
//     try {
//         const { latitude, longitude, radius } = req.query;

//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);
//         const searchRadius = parseFloat(radius) || 5000; // Default: 5km

//         if (isNaN(lat) || isNaN(lon)) {
//             return res.status(400).json({ message: "Invalid latitude or longitude format." });
//         }

//         // Find mechanics within the search radius
//         const nearbyMechanics = await Mechanic.find({
//             location: {
//                 $near: {
//                     $geometry: { type: "Point", coordinates: [lon, lat] },
//                     $maxDistance: searchRadius // Distance in meters
//                 }
//             }
//         });

//         return res.status(200).json({ data: nearbyMechanics, message: "Nearby mechanics found", status: 200 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };



// exports.findNearbyMechanics = async (req, res) => {
//     try {
//         const { latitude, longitude, maxDistance = 5000 } = req.body; // Distance in meters (default: 5km)

//         const lat = parseFloat(latitude);
//         const lon = parseFloat(longitude);

//         if (isNaN(lat) || isNaN(lon)) {
//             return res.status(400).json({ message: "Invalid latitude or longitude format." });
//         }

//         const mechanics = await Mechanic.find({
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [lon, lat]
//                     },
//                     $maxDistance: maxDistance // Find within 5km radius
//                 }
//             }
//         });

//         return res.status(200).json({ message: "Nearby mechanics found", data: mechanics });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };



exports.findNearbyMechanics = async (req, res) => {
    try {
        // const { latitude, longitude, maxDistance = 5000 } = req.query; // Use query params

        // Support both GET (req.query) and POST (req.body)
        const { latitude, longitude, maxDistance = 5000 } = req.method === "GET" ? req.query : req.body;

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ message: "Invalid latitude or longitude format." });
        }

        const mechanics = await Mechanic.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDistance // Find within 5km radius
                }
            }
        });

        return res.status(200).json({ message: "Nearby mechanics found", data: mechanics });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
