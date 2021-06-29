// this is the service class for Comments 
// it takes care of quering the database

export default class CommentsService {

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
            const records = await this.model.create(data);
            return records;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async TopMentions(limit) {
        try {
            const records = await this.model.aggregate([
                {$unwind: "$mentions"},
                {$group:{_id:{mention: "$mentions"}, count: {$sum:1}}},
                {$project:{_id:0, "mention":"$_id.mention", count:1}},
                {$sort:{count:-1}},
                {$limit: parseInt(limit,10) || this.defaultLimit}
            ])
            return records;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async TopHashTags(limit) {
        try {
            const records = await this.model.aggregate([
                {$unwind: "$hashTags"},
                {$group:{_id:{hashTag: "$hashTags"}, count: {$sum:1}}},
                {$project:{_id:0, "tag":"$_id.hashTag", count:1}},
                {$sort:{count:-1}},
                {$limit: parseInt(limit,10) || this.defaultLimit}
            ])
            return records;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async Update({id, data}) {
        try {
            let set = {};
            if (data.hashTags) {
                set.hashTags = data.hashTags;
            }
            if (data.mentions) {
                set.mentions = data.mentions;
            }
            if (data.text) {
                set.text = data.text;
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

    async DeleteAllForUser({id}) {
        try {
            const info = await this.model.deleteMany({userId: this.ObjectId(id)});
            return info;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async GetAll({id, limit}) {
        try {
            limit = parseInt(limit, 10) || this.defaultLimit;
            let find = {};
            if (id) {
                find = {userId:this.ObjectId(id)};
            }
            const records = await this.model.find(find).sort({timestamp: -1}).limit(limit);
            return records;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

    async GetSingle({id}) {
        try {
            const records = await this.model.findById(this.ObjectId(id));
            return records;
        } catch (e) {
            this.logger.debug('🔥 error: %o', e);
            throw e;
        }
    }

};