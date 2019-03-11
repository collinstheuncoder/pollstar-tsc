import * as mongoose from 'mongoose';

import PollInterface from './poll.interface';

const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
  name: { type: String },
  votes: { type: Number }
});

const PollSchema = new Schema({
  title: { type: String },
  category: { type: String },
  choices: [ChoiceSchema],
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  votedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{
	timestamps: true,
});

const Poll = mongoose.model<PollInterface & mongoose.Document>('Poll', PollSchema);

export default Poll;
