import User from "../models/User.js"



/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );
        const formatttedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        )
        res.status(200).json(formatttedFriends);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(id);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId); // Removing the friend
            friend.friends = friend.friends.filter(id => id !== friendId); // Removing the friend
        } else {
            user.friends.push(friendId); // Add friend to main guy's friend list
            friend.friends.push(id); // Add main guy to friend's list
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );
        const formatttedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        );

        res.status(200).json(formatttedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

