import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', index: true },
  mealId: { type: String, required: true },            // from TheMealDB idMeal
  mealName: { type: String, required: true },
  mealThumb: { type: String }
}, { timestamps: true });

favoriteSchema.index({ userId: 1, mealId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
