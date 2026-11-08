import { Schema, model, type InferSchemaType } from 'mongoose';

const contactInquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
    projectType: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true, maxlength: 5000 },
    source: { type: String, default: 'website' },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
    ipAddress: { type: String, default: null },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
    timezone: { type: String, default: null },
    userAgent: { type: String, default: null },
  },
  { timestamps: true, collection: 'contact_inquiries' }
);

contactInquirySchema.index({ ipAddress: 1, createdAt: -1 });
contactInquirySchema.index({ email: 1, createdAt: -1 });

export type ContactInquiryDoc = InferSchemaType<typeof contactInquirySchema>;

export const ContactInquiry = model('ContactInquiry', contactInquirySchema);
