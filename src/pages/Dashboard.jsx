import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Youtube, Database, Plus, Edit, Trash2, 
  RefreshCw, Search, LayoutDashboard, Share2, Activity,
  DatabaseZap, Filter, ChevronLeft, ChevronRight, LogOut, Upload, AlertCircle, CheckCircle, X
} from 'lucide-react';

const TypeBadge = ({ value }) => {
  let bg = 'bg-brand-500/10 text-brand-400 border-brand-500/20';
  if (value === 'Instagram') bg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (value === 'YouTube') bg = 'bg-red-500/10 text-red-400 border-red-500/20';
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wide border ${bg}`}>
      {value}
    </span>
  );
};

const GenderBadge = ({ value }) => {
  let bg = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  if (value === 'YES') bg = 'bg-green-500/20 text-green-400 border-green-500/30';
  if (value === 'ND') bg = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  if (value === 'C') bg = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
  if (value === 'B') bg = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  if (value === 'A') bg = 'bg-teal-500/20 text-teal-400 border-teal-500/30';
  if (value === 'R') bg = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  
  return (
    <span className={`px-3 py-1 rounded text-[11px] font-bold border ${bg}`}>
      {value}
    </span>
  );
};

const StatusBadge = ({ value }) => {
  let bg = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  if (value === 'APPROVED' || value === 'COMPLETED') bg = 'bg-green-500/20 text-green-400 border-green-500/30';
  if (value === 'IN PROGRESS') bg = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  if (value === 'PENDING' || value === 'CONTACTED') bg = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  if (value === 'REJECTED') bg = 'bg-red-500/20 text-red-400 border-red-500/30';
  
  return (
    <span className={`px-2 py-1 rounded text-[9px] uppercase font-bold tracking-wider border ${bg}`}>
      {value}
    </span>
  );
};

const Checkbox = ({ checked }) => (
  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${checked ? 'bg-brand-500 border-brand-500' : 'border-gray-500/50 hover:border-brand-500 bg-black/20'}`}>
    {checked && (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.5 6.5L9 1" stroke="#0F1014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('database');
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        
        // Simple CSV Parser (Splits by newline, maps headers to values)
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) throw new Error("CSV file is empty or missing headers.");

        const headers = lines[0].split(',').map(header => header.trim());
        
        if (headers.length > 50) {
          throw new Error("Maximum 50 columns are allowed.");
        }

        // Build JSON array
        const decodedArray = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] ? values[index].trim() : '';
          });
          return obj;
        });

        if (decodedArray.length > 50) {
          throw new Error("Maximum 50 columns are allowed.");
        }

        console.log("🔥 Decoded CSV into JSON Array:", decodedArray);

        /* 
          // You will send the 'decodedArray' to your real database API like this:
          const response = await fetch('http://187.127.140.151/api/insert-records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ records: decodedArray }),
          });
        */

        // For now, simulating the success response from API:
        setTimeout(() => {
          showToast(`Success! Parsed ${decodedArray.length} records into JSON.`, 'success');
          setIsUploading(false);
          e.target.value = null; // Reset input
        }, 800);

      } catch (err) {
        console.error('Parsing Error:', err);
        showToast(err.message, 'error');
        setIsUploading(false);
        e.target.value = null;
      }
    };

    // Trigger the file reading
    reader.readAsText(file);
  };

  const [analyticsData] = useState([
    {
      slNo: '1',
      channelName: 'Tech Burner',
      channelLink: 'youtube.com/techburner',
      platform: 'YouTube',
      brandKey: 'BRD-4601',
      productName: 'Smartwatch V2',
      deliverables: 'Dedicated Review',
      brandPriceComplete: '₹2,50,000',
      deliverablesCount: '1',
      requiredPricePer: '₹2,50,000',
      projectManager: 'Sonia Das',
      pmComment: 'Contract signed',
      pmStatus: 'APPROVED',
      influencerAssociate: 'Priya Patel',
      channelPricePer: '₹2,00,000',
      iaStatus: 'APPROVED',
      iaComment: 'Advance cleared',
      postingDate: '10th Nov 2026'
    },
    {
      slNo: '2',
      channelName: 'Kritika Khurana',
      channelLink: 'instagram.com/thatbohogirl',
      platform: 'Instagram',
      brandKey: 'BRD-4602',
      productName: 'Summer Collection',
      deliverables: '2 Reels + 3 Stories',
      brandPriceComplete: '₹1,50,000',
      deliverablesCount: '5',
      requiredPricePer: '₹30,000',
      projectManager: 'Rahul Sharma',
      pmComment: 'Outfits delivered',
      pmStatus: 'IN PROGRESS',
      influencerAssociate: 'Amit Kumar',
      channelPricePer: '₹20,000',
      iaStatus: 'CONTACTED',
      iaComment: 'Sizing confirmed',
      postingDate: '05th Nov 2026'
    }
  ]);

  const [rowData] = useState([
    {
      slNo: '1',
      channelName: 'Aman Gupta',
      channelLink: 'instagram.com/aman',
      platform: 'Instagram',
      brandKey: 'BRD-4589',
      productName: 'Wireless Earbuds X1',
      deliverables: '1 Reel + 2 Stories',
      brandPriceComplete: '₹50,000',
      deliverablesCount: '3',
      requiredPricePer: '₹16,666',
      projectManager: 'Rahul Sharma',
      pmComment: 'Awaiting content script approval',
      pmStatus: 'IN PROGRESS',
      influencerAssociate: 'Priya Patel',
      channelPricePer: '₹15,000',
      iaStatus: 'CONTACTED',
      iaComment: 'Sent initial brief via email',
      postingDate: '25th Oct 2026'
    },
    {
      slNo: '2',
      channelName: 'Nisha Verma',
      channelLink: 'youtube.com/nisha',
      platform: 'YouTube',
      brandKey: 'BRD-4590',
      productName: 'Gaming Laptop Pro',
      deliverables: 'Dedicated Video 10m',
      brandPriceComplete: '₹1,20,000',
      deliverablesCount: '1',
      requiredPricePer: '₹1,20,000',
      projectManager: 'Vikram Singh',
      pmComment: 'Video draft received. Reviewing.',
      pmStatus: 'PENDING',
      influencerAssociate: 'Amit Kumar',
      channelPricePer: '₹1,00,000',
      iaStatus: 'APPROVED',
      iaComment: 'Creator requested advance payment',
      postingDate: '30th Oct 2026'
    },
    {
      slNo: '3',
      channelName: 'Neha Kakoti',
      channelLink: 'instagram.com/nehaK',
      platform: 'Instagram',
      brandKey: 'BRD-4591',
      productName: 'Fitness Tracker Plus',
      deliverables: 'Static Post + Story',
      brandPriceComplete: '₹25,000',
      deliverablesCount: '2',
      requiredPricePer: '₹12,500',
      projectManager: 'Sonia Das',
      pmComment: 'All set for posting',
      pmStatus: 'COMPLETED',
      influencerAssociate: 'Rahul Sharma',
      channelPricePer: '₹10,000',
      iaStatus: 'APPROVED',
      iaComment: 'Link shared by creator',
      postingDate: '15th Oct 2026'
    }
  ]);

  const displayData = activeTab === 'database' ? rowData : analyticsData;

  return (
    <div className="min-h-screen bg-[#0F1014] relative overflow-hidden flex flex-col text-sm text-gray-300">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md ${
              toast.type === 'error' 
                ? 'bg-red-500/10 border-red-500/30 text-red-200' 
                : 'bg-brand-500/10 border-brand-500/30 text-brand-100'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle size={18} className="text-red-500" />
            ) : (
              <CheckCircle size={18} className="text-brand-500" />
            )}
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liquid Glass Background Orbs */}
      <div className="absolute top-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-brand-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10vw] right-[-5vw] w-[35vw] h-[35vw] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-brand-accent/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Top Navigation Layout */}
      <header className="glass border-b border-white/5 shadow-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex items-center gap-8 h-14">
            
            {/* Logo area */}
            <div className="flex items-center gap-2 pr-6 border-r border-white/5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Share2 size={12} className="text-brand-900" />
              </div>
              <span className="font-bold tracking-tight text-white uppercase text-xs">Enmmey</span>
            </div>

            {/* Tab and Actions */}
            <div className="flex flex-1 items-center justify-between h-full">
              <nav className="flex items-center h-full gap-1 pl-4">
                <button 
                  onClick={() => setActiveTab('database')}
                  className={`px-4 h-full transition-colors flex items-center gap-2 text-sm font-medium border-b-2 ${activeTab === 'database' ? 'text-brand-400 border-brand-500 bg-brand-500/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                >
                  Manage Database
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 h-full transition-colors flex items-center gap-2 text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'text-brand-400 border-brand-500 bg-brand-500/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                >
                  Analytics
                </button>
              </nav>

              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium border border-transparent hover:border-red-500/20"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto flex flex-col gap-5 relative z-10">
        
        {/* Action Toolbar */}
        <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-2.5 flex flex-wrap items-center justify-between gap-4 border border-white/10">
          <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
            <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-accent text-brand-900 px-3 py-1.5 rounded-md font-bold transition-all shadow-lg shadow-brand-500/20">
              <Plus size={14} /> Add New Record
            </button>
            <label className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-md font-bold transition-all ${isUploading ? 'opacity-50 cursor-not-allowed bg-brand-500/10 text-brand-400/50 border-brand-500/10' : 'bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 border-brand-500/30 cursor-pointer'}`}>
              {isUploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />} 
              {isUploading ? 'Uploading...' : 'Upload CSV'}
              <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
            </label>
            <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-md font-medium transition-all">
              <Edit size={14} /> Edit Selected
            </button>
            <button className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-md font-medium transition-all">
              <Trash2 size={14} /> Delete Selected
            </button>
            
            <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block"></div>

            <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-md transition-all">
              <RefreshCw size={14} /> Refresh
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-1 opacity-50"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div className="relative ml-2 text-gray-400 bg-white/5 rounded-md border border-white/10 flex items-center hover:border-white/20 transition-colors">
              <Search className="absolute left-2.5" size={14} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent text-white text-[13px] pl-8 pr-3 py-1.5 focus:outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-[13px] bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-md transition-all">
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="flex items-center gap-1.5 text-[13px] bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-md transition-all">
              <Activity size={14} /> All
            </button>
          </div>
        </motion.div>

        {/* CUSTOM NATIVE TABLE */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col glass-card overflow-hidden"
        >
          {/* Table Top Controls (Header Bar) */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/10 text-[12px] text-gray-300 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Checkbox checked={false} />
              <div className="flex items-center gap-2">
                <span>Filter By:</span>
                <div className="flex items-center gap-1 bg-black/30 border border-white/10 rounded px-2 py-0.5 cursor-pointer hover:border-white/20">
                  <span className="text-gray-200">All</span>
                  <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="ml-1 opacity-70"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
            
            <div className="text-gray-400 font-medium">
              Showing 1 to 10 of 1,234 entries
            </div>

            <div className="flex items-center gap-2">
              <span>Page 1 of 124</span>
              <div className="flex items-center gap-1 ml-2">
                <button className="w-6 h-6 flex items-center justify-center bg-black/30 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50"><ChevronLeft size={14} /></button>
                <button className="w-6 h-6 flex items-center justify-center bg-black/30 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50"><ChevronRight size={14} /></button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <button className="w-6 h-6 flex items-center justify-center bg-black/30 border border-white/10 rounded hover:bg-white/5"><ChevronLeft size={14} /></button>
                <button className="w-6 h-6 flex items-center justify-center bg-black/30 border border-white/10 rounded hover:bg-white/5"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>

          {/* Table Data Wrapper */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-center border-collapse min-w-[3200px]">
              <thead className="bg-black/40 text-[12px] font-semibold text-gray-300 sticky top-0 z-10 border-b border-brand-500/20 backdrop-blur-xl">
                <tr>
                  <th className="py-3 px-4 font-semibold text-center w-[50px]"><div className="flex justify-center"><Checkbox checked={false} /></div></th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">SL. NO</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">CHANNEL NAME</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">CHANNEL LINK</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">PLATFORM</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">BRAND UNIQUE KEY</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">PRODUCT NAME</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider min-w-[200px] text-center">DELIVERABLES</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">BRANDPRICE/COMPLETE DELIVERABLES</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">DELIVERABLES COUNT</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">REQUIRED PRICE PER DELIVERABLES</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">PROJECT MANAGER</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider min-w-[250px] text-center">PROJECT MANAGER COMMENT</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">PROJECT MANAGER STATUS</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">INFLUENCER ASSOCIATE</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">CHANNEL PRICE/DELIVERABLES</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">IA STATUS</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider min-w-[250px] text-center">INFLUENCER ASSOCIATE COMMENT</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">POSTING DATE</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-200">
                {displayData.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
                    <td className="py-3 px-4 text-center border-r border-white/5"><div className="flex justify-center"><Checkbox checked={row.slNo === '1'} /></div></td>
                    <td className="py-3 px-4 text-gray-400 font-mono text-center">{row.slNo}</td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap text-center">{row.channelName}</td>
                    <td className="py-3 px-4 text-brand-400 hover:text-brand-300 hover:underline cursor-pointer whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {row.platform === 'Instagram' ? <Instagram size={14} className="text-pink-500 shrink-0" /> : <Youtube size={14} className="text-red-500 shrink-0" />}
                        {row.channelLink}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center"><TypeBadge value={row.platform} /></td>
                    <td className="py-3 px-4 font-mono text-gray-400 text-center">{row.brandKey}</td>
                    <td className="py-3 px-4 text-gray-200 text-center">{row.productName}</td>
                    <td className="py-3 px-4 text-brand-400 font-medium whitespace-nowrap text-center">{row.deliverables}</td>
                    <td className="py-3 px-4 font-bold text-brand-accent whitespace-nowrap text-center">{row.brandPriceComplete}</td>
                    <td className="py-3 px-4 text-center text-gray-300 text-center">{row.deliverablesCount}</td>
                    <td className="py-3 px-4 font-bold text-brand-500 whitespace-nowrap text-center">{row.requiredPricePer}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-white text-center">{row.projectManager}</td>
                    <td className="py-3 px-4 text-gray-400 text-center" title={row.pmComment}><span className="line-clamp-1 mx-auto max-w-[200px]">{row.pmComment}</span></td>
                    <td className="py-3 px-4 text-center"><StatusBadge value={row.pmStatus} /></td>
                    <td className="py-3 px-4 whitespace-nowrap text-white text-center">{row.influencerAssociate}</td>
                    <td className="py-3 px-4 font-bold text-gray-200 whitespace-nowrap text-center">{row.channelPricePer}</td>
                    <td className="py-3 px-4 text-center"><StatusBadge value={row.iaStatus} /></td>
                    <td className="py-3 px-4 text-gray-400 text-center" title={row.iaComment}><span className="line-clamp-1 mx-auto max-w-[200px]">{row.iaComment}</span></td>
                    <td className="py-3 px-4 whitespace-nowrap text-brand-100 font-medium text-center">{row.postingDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/20 border-t border-white/10 text-[12px] text-gray-300 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <DatabaseZap size={14} className="text-brand-500" />
              <span className="font-semibold text-brand-500">Connected:</span> 
              Real-time sync with <span className="text-white font-medium">PostgreSQL</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded hover:text-white hover:bg-white/10 transition-colors">First</button>
                <button className="px-2 py-1 rounded hover:text-white hover:bg-white/10 transition-colors">Prev</button>
                <button className="w-6 h-6 rounded bg-brand-500 text-brand-900 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(196,214,0,0.4)]">1</button>
                <button className="px-2 py-1 rounded hover:text-white hover:bg-white/10 transition-colors">Next</button>
                <button className="px-2 py-1 rounded hover:text-white hover:bg-white/10 transition-colors">Last</button>
              </div>
              
              <div className="w-px h-4 bg-white/10"></div>
              
              <div className="flex items-center gap-2">
                <span>Page 1 of 1234</span>
                <div className="flex items-center gap-1 bg-black/30 border border-white/10 rounded overflow-hidden">
                  <input type="text" className="w-8 text-center bg-transparent border-r border-white/10 py-1 text-white focus:outline-none" defaultValue="1" />
                  <button className="px-2 py-1 hover:bg-white/10 transition-colors">Last</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
      </main>
    </div>
  );
};

export default Dashboard;
