import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const assetSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  amount: { type: Number },
  createdAt: { type: Date, default: new Date() }
});

assetSchema.plugin(mongoosePaginate);
const asset = mongoose.model('Asset', assetSchema);

module.exports = asset;
