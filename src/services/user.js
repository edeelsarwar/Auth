// this is the service class for Comments 
// it takes care of quering the database
import jwt from 'jsonwebtoken'

export default class UserService {

    // getting the model and other dependencies through arguments
    // not importing and directly defining anything
    constructor(model, ObjectId, logger) {
        this.model = model;
        this.ObjectId = ObjectId;
        this.defaultLimit = 20;
        this.logger = logger;
    }

    async AddNew(data) {
        try {
            const userRecord = await this.model.create({
                
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    
                    role:'User'
            });
            return {user: userRecord};
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async authenticate({email, password }) {
        console.log(email,password)
        const user = await this.model.findOne({  email:email ,  password:password }).select('-password');
        console.log(user)
        if (user) {
            console.log(user._id)
            const token = jwt.sign({ sub: user._id, role: user.role }, 'secret');
            return {
                user,
                token
            };
        }
    }

    async Update(id, inputDTO) {
        try {
            let set = {};
            
            if (inputDTO.firstName != null) {
                set["firstName"] = inputDTO.firstName;
            }
            if (inputDTO.lastName != null) {
                set["lastName"] = inputDTO.lastName;
            }
            if (inputDTO.email != null) {
                set["email"] = inputDTO.email;
            }
            if (inputDTO.password != null) {
                set["password"] = inputDTO.password;
            }

            const info = await this.model.updateOne({_id: this.ObjectId(id)}, {$set: set}, {upsert: false});
            return info;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async Delete({id}) {
        try {
            const info = await this.model.deleteOne({_id: this.ObjectId(id)});
            return info;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async GetAll({limit}) {
        try {
            limit = parseInt(limit, 10) || this.defaultLimit;
            const userRecords = await this.model.find().sort({'timestamp': -1}).limit(limit);;
            return userRecords;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async GetSingle({id}) {
        try {
            const userRecords = await this.model.findById(this.ObjectId(id));
            return userRecords;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

};