import { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Store, Megaphone, ShieldCheck, Power, Phone, MapPin, Mail, Loader2, Save } from 'lucide-react';

const AdminSettings = () => {
  const { settings, updateSettings, loading } = useSettings();
  const [activeTab, setActiveTab] = useState('store');
  const [formData, setFormData] = useState({
    storeName: '',
    supportPhone: '',
    whatsappNumber: '',
    supportEmail: '',
    physicalAddress: '',
    announcementText: '',
    isAnnouncementActive: true,
    storeStatus: 'active',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="p-8 pb-24 flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-8 pb-24 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Store Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage global configurations for your e-commerce platform.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('store')}
            className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm ${activeTab === 'store' ? 'bg-white shadow-sm text-primary border border-gray-100' : 'text-gray-500 hover:bg-white hover:text-slate-800'}`}
          >
            <Store size={18} /> Store Information
          </button>
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm ${activeTab === 'announcements' ? 'bg-white shadow-sm text-primary border border-gray-100' : 'text-gray-500 hover:bg-white hover:text-slate-800'}`}
          >
            <Megaphone size={18} /> Announcements
          </button>
          <button 
            onClick={() => setActiveTab('operational')}
            className={`w-full text-left px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm ${activeTab === 'operational' ? 'bg-white shadow-sm text-primary border border-gray-100' : 'text-gray-500 hover:bg-white hover:text-slate-800'}`}
          >
            <Power size={18} /> Operational Status
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          
          {/* STORE INFO TAB */}
          {activeTab === 'store' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b border-gray-100 pb-4">Store Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Store Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Store size={16}/></div>
                    <input type="text" name="storeName" value={formData.storeName || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Support Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Mail size={16}/></div>
                    <input type="email" name="supportEmail" value={formData.supportEmail || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Support Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Phone size={16}/></div>
                    <input type="text" name="supportPhone" value={formData.supportPhone || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number (Orders)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Phone size={16}/></div>
                    <input type="text" name="whatsappNumber" value={formData.whatsappNumber || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Physical Address</label>
                <div className="relative">
                  <div className="absolute top-3 left-4 text-gray-400"><MapPin size={16}/></div>
                  <textarea name="physicalAddress" rows="3" value={formData.physicalAddress || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS TAB */}
          {activeTab === 'announcements' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-slate-800">Top Banner Announcement</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="isAnnouncementActive" checked={formData.isAnnouncementActive || false} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-sm font-bold text-slate-700">{formData.isAnnouncementActive ? 'Active' : 'Hidden'}</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Banner Text</label>
                <input type="text" name="announcementText" value={formData.announcementText || ''} onChange={handleChange} placeholder="e.g. Festive Sale! Use code FANCY20 for 20% off" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <p className="text-xs text-gray-500 mt-2">This text will be displayed in the scrolling marquee at the very top of the public website.</p>
              </div>
            </div>
          )}

          {/* OPERATIONAL TAB */}
          {activeTab === 'operational' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b border-gray-100 pb-4">Store Operational Status</h2>
              
              <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Power size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Checkout Status</h3>
                    <p className="text-sm text-slate-600 mt-1 mb-4">You can temporarily pause checkouts. Customers can still view products, but cannot place new orders.</p>
                    
                    <select 
                      name="storeStatus"
                      value={formData.storeStatus || 'active'}
                      onChange={handleChange}
                      className="bg-white border border-orange-200 text-slate-800 text-sm font-bold rounded-xl focus:ring-orange-500 focus:border-orange-500 block w-full p-3 shadow-sm"
                    >
                      <option value="active">🟢 Active - Accepting Orders</option>
                      <option value="paused">⏸️ Paused - Stop New Orders</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
