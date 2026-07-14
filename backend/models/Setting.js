import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  storeName: { type: String, default: 'Hello Fancy' },
  supportPhone: { type: String, default: '+91 0000000000' },
  whatsappNumber: { type: String, default: '+91 0000000000' },
  supportEmail: { type: String, default: 'support@hellofancy.com' },
  physicalAddress: { type: String, default: 'Your Address Here' },
  announcementText: { type: String, default: 'Welcome to Hello Fancy!' },
  isAnnouncementActive: { type: Boolean, default: true },
  storeStatus: { type: String, enum: ['active', 'paused'], default: 'active' },
  instagramLink: { type: String, default: '' },
  facebookLink: { type: String, default: '' },
}, {
  timestamps: true,
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
