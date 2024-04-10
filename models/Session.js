import mongoose, { Schema } from 'mongoose'

const mambaSessionSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'MambaUser',
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		index: { expires: '30d' },
	},
})

export default mongoose.model('SessionMamba', mambaSessionSchema)
