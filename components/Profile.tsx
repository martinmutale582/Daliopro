import React from 'react';
import { UserCircle, CreditCard, Shield, Mail, Phone } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-500">Manage your personal information and account security.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card - Avatar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
             <UserCircle size={64} />
           </div>
           <h3 className="text-xl font-bold text-gray-900">Guest Investor</h3>
           <p className="text-sm text-gray-500 mb-4">Standard Account</p>
           <button className="text-sm text-zambia-green font-medium px-4 py-2 border border-zambia-green rounded-lg hover:bg-green-50">
             Edit Photo
           </button>
        </div>

        {/* Main Details */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield size={18} className="text-gray-400"/> Personal Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
               <input type="text" value="Guest Investor" disabled className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700" />
            </div>
             <div>
               <label className="block text-xs font-medium text-gray-500 mb-1">National Registration Card (NRC)</label>
               <input type="text" value="------/--/1" disabled className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700" />
            </div>
             <div>
               <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><Mail size={12}/> Email Address</label>
               <input type="email" value="investor@nkwazi.zm" disabled className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700" />
            </div>
             <div>
               <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><Phone size={12}/> Mobile Number</label>
               <input type="tel" value="+260 97 000 0000" disabled className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
         <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <CreditCard size={18} className="text-gray-400"/> Withdrawal Methods
             </h3>
             <button className="text-sm text-zambia-orange font-medium hover:underline">Add New</button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1 p-4 rounded-xl border border-green-200 bg-green-50 flex justify-between items-center">
                <div>
                   <p className="font-bold text-gray-800">Airtel Money</p>
                   <p className="text-sm text-gray-600">+260 97 *** **00</p>
                </div>
                <span className="text-xs bg-white px-2 py-1 rounded shadow-sm text-green-700 font-bold">Primary</span>
             </div>
              <div className="flex-1 p-4 rounded-xl border border-gray-200 bg-gray-50 flex justify-between items-center opacity-60">
                <div>
                   <p className="font-bold text-gray-800">MTN MoMo</p>
                   <p className="text-sm text-gray-600">Not connected</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};