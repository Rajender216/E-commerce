import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        slug: {
            type: String,
            lowercase: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);