const mongoose = require('mongoose');
const modelSchema = require('../schemas/member.schema');
const model = mongoose.model('members', modelSchema);
const modelUser = require('../schemas/user.schema');
const boom = require('@hapi/boom');

class memberService {
    async find() {
        const response = await model.find()
            .populate({ path: 'userEdit', select: 'name email nickname name lastname motherlastname phone' });
        return response;
    }

    async create(data, idUser) {
        data.userEdit = idUser;
        const result = await new model({ ...data });
        await result.save();
        return await result;
    }

    async updateToUser(data, idUser) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const dateAssigned = new Date();
            const member = await model.findOne({ _id: data.idMember });
            dateAssigned.setMonth(dateAssigned.getMonth() + member.periodicity);
            data.endDay = dateAssigned;
            data.userEdit = idUser;
            data.dateUpdate = new Date();

            const result = await modelUser.updateOne({ _id: data.idUser }, { $set: { member: data } });

            session.commitTransaction();
            session.endSession();
            return result;
        } catch (e) {
            session.abortTransaction();
            session.endSession();
            throw boom.badRequest('Error al asignar la membresia');
        }
    }
};



module.exports = memberService;