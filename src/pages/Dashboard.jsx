import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram, Youtube, Database, Plus, Edit, Trash2,
  RefreshCw, Search, LayoutDashboard, Share2, Activity,
  DatabaseZap, Filter, ChevronLeft, ChevronRight, LogOut, Upload, AlertCircle, CheckCircle, X, Save, Undo2, Home, Check
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

const STATUS_OPTIONS = [
  { value: '', label: '— Select Status —' },
  { value: 'Go Ahead', label: 'Go Ahead' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Under Negotiation', label: 'Under Negotiation' },
  { value: 'Working', label: 'Working' },
  { value: 'Posted', label: 'Posted' },
  { value: 'Cancel', label: 'Cancel' },
];

const StatusBadge = ({ value }) => {
  let bg = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  if (value === 'Go Ahead') bg = 'bg-green-400/20 text-green-300 border-green-400/30';
  if (value === 'Confirmed') bg = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25';
  if (value === 'Under Negotiation') bg = 'bg-amber-500/15 text-amber-300 border-amber-500/25';
  if (value === 'Working') bg = 'bg-gray-400/15 text-gray-300 border-gray-400/25';
  if (value === 'Posted') bg = 'bg-emerald-600/20 text-emerald-300 border-emerald-600/30';
  if (value === 'Cancel') bg = 'bg-red-500/20 text-red-300 border-red-500/30';
  // Legacy API values
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

const Checkbox = ({ checked, onChange }) => (
  <div
    onClick={(e) => { e.stopPropagation(); onChange && onChange(); }}
    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${checked ? 'bg-brand-500 border-brand-500' : 'border-gray-500/50 hover:border-brand-500 bg-black/20'}`}
  >
    {checked && (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.5 6.5L9 1" stroke="#0F1014" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

const HoverText = ({ text, children, className = "", maxWidth = "max-w-[180px]" }) => {
  const [hovered, setHovered] = useState(false);
  const displayValue = text?.toString() || '';
  const isLong = displayValue.length > 20;

  return (
    <div
      className={`relative flex items-center justify-center mx-auto w-full group/ht ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children ? children : (
        <span className={`block text-center whitespace-nowrap overflow-hidden text-ellipsis px-1 ${maxWidth}`}>
          {displayValue}
        </span>
      )}
      <AnimatePresence>
        {hovered && isLong && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            className="absolute bottom-full mb-2 z-[200] w-max max-w-[350px] bg-[#15171C]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl p-3 text-left whitespace-normal break-words pointer-events-auto select-text"
          >
            <p className="text-[12px] text-gray-200 leading-relaxed font-medium">
              {displayValue}
            </p>
            <div className="absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 bg-[#15171C] border-b border-r border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----- PM Status colour map -----
const PM_STATUS_CHIP_STYLES = {
  'Go Ahead': 'bg-green-400/20 text-green-300 border-green-400/30',
  'Confirmed': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'Under Negotiation': 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'Working': 'bg-gray-400/15 text-gray-300 border-gray-400/25',
  'Posted': 'bg-emerald-600/20 text-emerald-300 border-emerald-600/30',
  'Cancel': 'bg-red-500/20 text-red-300 border-red-500/30',
};
const PM_STATUS_LIST = ['Go Ahead', 'Confirmed', 'Under Negotiation', 'Working', 'Posted', 'Cancel'];

// ----- IA Status colour map -----
const IA_STATUS_CHIP_STYLES = {
  'Assigned': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Confirm': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'Posted': 'bg-emerald-600/20 text-emerald-300 border-emerald-600/30',
  'Cancel': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Under Negotiation': 'bg-amber-500/15 text-amber-300 border-amber-500/25',
};
const IA_STATUS_LIST = ['Assigned', 'Confirm', 'Posted', 'Cancel', 'Under Negotiation'];

const project_manager_LIST = ['Kritika', 'Ajay', 'Sayan', 'Arnab'];

// Merged lookup used by StatusBadge
const ALL_STATUS_CHIP_STYLES = { ...PM_STATUS_CHIP_STYLES, ...IA_STATUS_CHIP_STYLES };

// ----- Platform / Brand / PM / IA Option Lists -----
const PLATFORM_LIST = ['Instagram', 'YouTube', 'Facebook', 'LinkedIn', 'Twitter', 'TikTok'];
const BRAND_KEY_LIST = ['BRAND_01', 'BRAND_02', 'BRAND_03', 'BRAND_04', 'BRAND_05'];
const PM_LIST = ['Manager A', 'Manager B', 'Manager C'];
const DELIVERABLE_CATEGORIES = ['Reels', 'Shorts', 'Posts', 'Stories', 'Videos', 'Static', 'Carousel'];

const PLATFORM_CHIP_STYLES = {
  'Instagram': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'YouTube': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Facebook': 'bg-blue-600/10 text-blue-400 border-blue-600/20',
  'LinkedIn': 'bg-blue-700/10 text-blue-400 border-blue-700/20'
};

/**
 * Custom Excel/Sheets-style status picker.
 * Accepts `options` (string[]) and `chipStyles` (object) props for per-column configuration.
 * `onAdd` (function) is optional - adds searchable add-mode.
 * `onBulkAdd` (function) is optional - adds integrated bulk-add interface.
 */
const QuickStatusDropdown = ({ value, onChange, options, chipStyles, onAdd, onBulkAdd }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingBulk, setIsAddingBulk] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (!open) {
      setSearchTerm('');
      setIsAddingBulk(false);
      setBulkText('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const chipStyle = (chipStyles || ALL_STATUS_CHIP_STYLES)[value] || 'bg-gray-500/15 text-gray-400 border-gray-500/20';

  return (
    <div ref={ref} className="relative inline-flex flex-col items-center">
      {/* Trigger */}
      <div
        className="flex items-center gap-1.5 cursor-pointer group/qd"
        onClick={() => setOpen(v => !v)}
        title="Click to change"
      >
        {value
          ? (
            <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wide border transition-all group-hover/qd:scale-105 ${chipStyle}`}>
              {value}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wide border border-dashed border-white/20 text-gray-500 group-hover/qd:border-brand-500/40 group-hover/qd:text-gray-400 transition-all">
              None
            </span>
          )
        }
      </div>

      {/* Floating Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 z-[100] min-w-[200px] bg-[#0F1014]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1"
          >
            {isAddingBulk ? (
              <div className="p-3">
                <div className="text-[10px] uppercase font-bold text-gray-500 mb-2 tracking-wider">Bulk Add Associates</div>
                <textarea
                  autoFocus
                  placeholder="Type names here...&#10;(one per line)"
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-md p-2 text-[11px] text-white focus:outline-none focus:border-brand-500/50 transition-all placeholder-gray-600 resize-none mb-3 custom-scrollbar"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const names = bulkText.split('\n').map(n => n.trim()).filter(n => n !== '');
                      if (names.length > 0) onBulkAdd(names);
                      setOpen(false);
                    }}
                    disabled={!bulkText.trim()}
                    className="flex-1 bg-brand-500 hover:bg-brand-accent disabled:opacity-50 disabled:bg-brand-500/10 text-brand-900 py-1.5 rounded text-[11px] font-bold transition-all"
                  >
                    Save All
                  </button>
                  <button
                    onClick={() => setIsAddingBulk(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-1.5 rounded text-[11px] font-bold transition-all border border-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Search Input */}
                {onAdd && (
                  <div className="px-2 py-1.5 border-b border-white/5 mb-1 group/search relative">
                    <Search size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/search:text-brand-400 transition-colors" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search/Type Name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchTerm.trim()) {
                          const exists = options.find(o => o.toLowerCase() === searchTerm.trim().toLowerCase());
                          if (!exists) {
                            onAdd(searchTerm.trim());
                            setOpen(false);
                          }
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-md pl-8 pr-2 py-1 text-[11px] text-white focus:outline-none focus:border-brand-500/50 transition-all placeholder-gray-600"
                    />
                  </div>
                )}

                <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                  {options
                    .filter(opt => !searchTerm || opt.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(opt => {
                      const isSelected = value === opt;
                      const style = (chipStyles || ALL_STATUS_CHIP_STYLES)[opt] || 'bg-gray-500/15 text-gray-400 border-gray-500/20';
                      return (
                        <button
                          key={opt}
                          onClick={() => { onChange(opt); setOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 transition-colors ${isSelected ? 'bg-white/5' : 'hover:bg-white/[0.04]'}`}
                        >
                          <span className={`flex-1 text-center px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wide border ${style}`}>
                            {opt}
                          </span>
                        </button>
                      );
                    })}

                  {/* Add New Shortcut for search term */}
                  {onAdd && searchTerm && !options.some(o => o.toLowerCase() === searchTerm.toLowerCase()) && (
                    <>
                      <div className="h-px bg-white/10 my-1 mx-2" />
                      <button
                        onClick={() => { onAdd(searchTerm.trim()); setOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-brand-400 hover:text-brand-300 hover:bg-white/[0.04] transition-colors"
                      >
                        <Plus size={14} className="ml-1" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Add "{searchTerm}"...</span>
                      </button>
                    </>
                  )}
                </div>

                {!searchTerm && onBulkAdd && (
                  <>
                    <div className="h-px bg-white/10 my-1 mx-2" />
                    <button
                      onClick={() => setIsAddingBulk(true)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-brand-400 hover:text-brand-300 hover:bg-white/[0.04] transition-colors"
                    >
                      <Plus size={14} className="ml-1" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Bulk Add...</span>
                    </button>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Refined Deliverables Paster as requested.
 * Shows a list of added items 1-by-1 with removal options.
 */
const DeliverablesPaster = ({ value = '', onChange }) => {
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState(DELIVERABLE_CATEGORIES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Helper to parse string back to list for display
  const items = (value || '').split('+').map(i => i.trim()).filter(Boolean);

  const handleAdd = () => {
    const newItem = `${count} ${category}`;
    const newValue = value ? `${value} + ${newItem}` : newItem;
    onChange(newValue);
  };

  const removeItem = (idx) => {
    const newList = items.filter((_, i) => i !== idx);
    onChange(newList.join(' + '));
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div ref={ref} className="relative inline-block w-full min-w-[200px]">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0d1108]/80 border border-brand-500/30 rounded px-2.5 py-2 min-h-[40px] text-[12px] text-brand-300 flex items-center justify-between cursor-pointer hover:border-brand-500/50 transition-all font-medium group overflow-hidden"
      >
        <span className="truncate pr-2">{value || <span className="text-gray-600 italic">Click to build deliverables...</span>}</span>
        <Plus size={14} className="text-brand-500 shrink-0 group-hover:scale-110 transition-transform" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-[150] bg-[#121418] border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col gap-4 min-w-[280px] backdrop-blur-xl"
          >
            {/* Current List Section */}
            {items.length > 0 && (
              <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-0.5">Current List</label>
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-md px-2 py-1.5 group/item">
                    <span className="text-[11px] text-brand-300 font-medium">{item}</span>
                    <button 
                      onClick={() => removeItem(idx)}
                      className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 items-end">
              <div className="w-16">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Count</label>
                <input 
                  type="number" 
                  min="1"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-2 text-[11px] text-white focus:outline-none focus:border-brand-500/50 transition-all font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-2 text-[11px] text-white focus:outline-none focus:border-brand-500/50 transition-all font-medium appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px' }}
                >
                  {DELIVERABLE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat} style={{ background: '#121418', color: '#fff' }}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleAdd}
                className="flex-[2] bg-brand-500 hover:bg-brand-accent text-brand-900 py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-bold text-[11px] uppercase shadow-lg shadow-brand-500/20"
              >
                <Plus size={14} strokeWidth={3} /> Add Item
              </button>
              <button 
                onClick={handleClear}
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-2 rounded-lg transition-all font-bold text-[11px] uppercase"
              >
                Clear
              </button>
            </div>

            <div className="pt-2 border-t border-white/5 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-brand-500 hover:text-brand-400 text-[10px] font-bold uppercase transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----- Custom Website Delete Alert (Modal) -----
const ConfirmModal = ({ show, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#15171C] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Trash2 className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold transition-all border border-white/5"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold transition-all shadow-lg shadow-red-500/20"
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};


const DATABASE_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'channelCode', label: 'Channel Code' },
  { key: 'channelName', label: 'Channel Name' },
  { key: 'channelLink', label: 'Channel Link' },
  { key: 'platform', label: 'Platform' },
  { key: 'brandUniqueKey', label: 'Brand Unique Key' },
  { key: 'productName', label: 'Product Role/Name' },
  { key: 'deliverables', label: 'Deliverables' },
  { key: 'brandPrice', label: 'Brand Price' },
  { key: 'deliverablesCount', label: 'Deliverables Count' },
  { key: 'requiredPrice', label: 'Required Price' },
  { key: 'projectManager', label: 'Project Manager' },
  { key: 'projectManagerComment', label: 'PM Comment' },
  { key: 'projectManagerStatus', label: 'PM Status' },
  { key: 'influencerAssociate', label: 'Influencer Associate' },
  { key: 'channelPrice', label: 'Channel Price' },
  { key: 'iaStatus', label: 'IA Status' },
  { key: 'iaComment', label: 'IA Comment' },
  { key: 'postingDate', label: 'Posting Date' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
];

const ANALYTICS_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'channelCode', label: 'Channel Code' },
  { key: 'postingDate', label: 'Posting Date' },
  { key: 'channelName', label: 'Channel Name' },
  { key: 'channelLink', label: 'Channel Link' },
  { key: 'platform', label: 'Platform' },
  { key: 'brandUniqueKey', label: 'Brand Unique Key' },
  { key: 'productName', label: 'Product Name' },
  { key: 'deliverables', label: 'Deliverables' },
  { key: 'projectManager', label: 'Project Manager' },
  { key: 'influencerAssociate', label: 'Influencer Associate' },
  { key: 'channelPrice', label: 'Channel Price / Deliverables' },
  { key: 'productStatus', label: 'Product Status' },
  { key: 'productReimbursement', label: 'Product Reimbursement' },
  { key: 'paymentTerm', label: 'Payment Term' },
  { key: 'advanceAmount', label: 'Advance Amount' },
  { key: 'paymentDate', label: 'Payment Date' },
  { key: 'postedLink', label: 'Posted Link' },
  { key: 'postedStatus', label: 'Posted Status' },
  { key: 'brandPrice', label: 'Brand Price / Complete Deliverables' },
  { key: 'profit', label: 'Profit' },
  { key: 'name', label: 'Name' },
  { key: 'address', label: 'Address' },
  { key: 'landmark', label: 'Landmark' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'phoneNo', label: 'Phone No.' },
  { key: 'emailId', label: 'Email ID' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // Store navigate in a ref so it never triggers effect re-runs
  const navigateRef = useRef(navigate);
  useEffect(() => { navigateRef.current = navigate; }, [navigate]);
  const [activeTab, setActiveTab] = useState('database');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pastedState, setPastedState] = useState(null);
  const [iaList, setIaList] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchIAs = async () => {
    // try {
    //   const token = localStorage.getItem('token');
    //   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ia/getAll`, {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   });
    //   if (res.ok) {
    //     const data = await res.json();
    //     const names = Array.isArray(data) ? data.map(item => typeof item === 'string' ? item : item.name) : [];
    //     setIaList(names);
    //   }
    // } catch (err) {
    //   console.error('Failed to fetch IAs', err);
    // }
    setIaList(['Associate X', 'Associate Y', 'Associate Z', 'Associate W']);
  };

  const handleAddIA = async (providedName) => {
    const finalName = providedName?.trim();
    if (!finalName) return null;
    
    // Optimistic local update
    setIaList(prev => {
      if (prev.includes(finalName)) return prev;
      return [...prev, finalName];
    });

    try {
      showToast(`Adding IA: ${finalName}...`, 'success');
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ia/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: finalName })
      });
      if (res.ok) {
        showToast("IA added successfully!", "success");
        fetchIAs();
      }
    } catch (err) {
      console.error("API error adding IA", err);
    }
    return finalName;
  };

  const handleBulkAddIA = async (names) => {
    if (!names || names.length === 0) return;
    
    // Filter out existing ones to avoid duplicates
    const uniqueNew = names.filter(n => !iaList.includes(n));
    if (uniqueNew.length === 0) return;

    // Optimistic update
    setIaList(prev => [...prev, ...uniqueNew]);
    showToast(`Adding ${uniqueNew.length} associates...`, 'success');

    try {
      const token = localStorage.getItem('token');
      // Sequential addition if no bulk endpoint, or just optimistic if server is slow
      for (const name of uniqueNew) {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/ia/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name })
        }).catch(err => console.error(`Failed to add ${name}`, err));
      }
      showToast(`${uniqueNew.length} IAs added successfully!`, "success");
      fetchIAs();
    } catch (err) {
      console.error("Error in bulk IA addition", err);
    }
  };

  // Quietly re-fetches the current tab's data without showing the loading overlay.
  // Use this after any mutating operation (create / update / delete) so the table
  // always reflects the true server state.
  const silentRefresh = async (tab) => {
    const currentTab = tab ?? activeTab;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const endpoint = currentTab === 'database' ? '/channels/getAll' : '/dashboard/data';
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) { localStorage.removeItem('token'); navigateRef.current('/login'); return; }
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.length > 0) {
          setRowData(data);
          setTableColumns(Object.keys(data[0]));
        } else {
          setRowData([]);
          setTableColumns([]);
        }
      }
    } catch { /* silent — don't surface background refresh errors */ }
  };

  // Manual refresh — shows the loading overlay so the user gets clear feedback.
  const handleRefresh = async () => {
    if (isRefreshing || isLoading) return;
    setIsRefreshing(true);
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigateRef.current('/login'); return; }
      const endpoint = activeTab === 'database' ? '/channels/getAll' : '/dashboard/data';
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) { localStorage.removeItem('token'); navigateRef.current('/login'); return; }
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.length > 0) {
          setRowData(data);
          setTableColumns(Object.keys(data[0]));
        } else {
          setRowData([]);
          setTableColumns([]);
        }
      }
    } catch (err) {
      console.error('Manual refresh failed', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleUndoPaste = () => {
    if (!pastedState) return;
    if (pastedState.tab === 'database') {
      setRowData(prev => prev.slice(pastedState.records.length));
    } else {
      setAnalyticsData(prev => prev.slice(pastedState.records.length));
    }
    setPastedState(null);
    showToast("Pasted records removed.", "success");
  };

  const handleSavePasted = async () => {
    if (!pastedState) return;
    try {
      showToast("Saving pasted records to API...", "success");
      console.log("🔥 Posting pasted data to API:", pastedState.records);

      const token = localStorage.getItem('token');

      // Clean internal frontend temp flags before transmission to Java backend
      const finalRecords = pastedState.records.map(r => {
        const clean = { ...r };
        delete clean.tempId;
        delete clean.isNewUnsaved;
        return clean;
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ records: finalRecords }),
      });
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      if (!response.ok) throw new Error("Failed to update array");

      setTimeout(() => {
        showToast(`Successfully saved ${pastedState.records.length} pasted records!`, 'success');
        setPastedState(null);
        silentRefresh();
      }, 800);
    } catch (err) {
      showToast('Error saving records to API.', 'error');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;

        // Split into rows, skip the header row (row 0), ignore blank lines
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) throw new Error('CSV file is empty or has no data rows.');

        const dataRows = lines.slice(1); // skip header — we use positional mapping

        if (dataRows.length > 50) throw new Error('Maximum 50 rows are allowed per upload.');

        const parseNum = (val) => {
          if (!val) return 0;
          const cleaned = val.toString().replace(/[^0-9.-]+/g, '');
          return parseFloat(cleaned) || 0;
        };

        // RFC 4180 CSV parser — handles quoted fields containing commas/newlines
        // and "" escape sequences inside quoted fields.
        const parseCSVLine = (line) => {
          const fields = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
              if (inQuotes && line[i + 1] === '"') {
                current += '"'; i++; // escaped quote → single "
              } else {
                inQuotes = !inQuotes; // toggle quoted mode, don't add the quote char
              }
            } else if (ch === ',' && !inQuotes) {
              fields.push(current.trim());
              current = '';
            } else {
              current += ch;
            }
          }
          fields.push(current.trim()); // last field
          return fields;
        };

        // Map columns by position — now for 21 columns
        const decodedArray = dataRows.map(line => {
          const col = parseCSVLine(line);
          const getStr = (i) => (col[i] !== undefined && col[i] !== '') ? col[i] : '';
          return {
            id: '', // Always empty while importing
            channelCode: '', // Always empty while importing
            channelName: getStr(0),
            channelLink: getStr(1),
            platform: getStr(2),
            brandUniqueKey: getStr(3),
            productName: getStr(4),
            deliverables: getStr(5),
            brandPrice: parseNum(col[6]),
            deliverablesCount: parseNum(col[7]),
            requiredPrice: parseNum(col[8]),
            projectManager: getStr(9),
            projectManagerComment: getStr(10),
            projectManagerStatus: getStr(11),
            influencerAssociate: getStr(12),
            channelPrice: parseNum(col[13]),
            iaStatus: getStr(14),
            iaComment: getStr(15),
            postingDate: getStr(16),
            createdAt: getStr(17),
            updatedAt: getStr(18),
          };
        });

        console.log('🔥 CSV mapped to 21 keys:', decodedArray);

        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ records: decodedArray }),
        });
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        if (!response.ok) throw new Error('Failed to save CSV data to API.');

        setTimeout(() => {
          showToast(`Uploaded ${decodedArray.length} records successfully!`, 'success');
          setIsUploading(false);
          e.target.value = null;
          silentRefresh();
        }, 800);

      } catch (err) {
        console.error('CSV Upload Error:', err);
        showToast(err.message, 'error');
        setIsUploading(false);
        e.target.value = null;
      }
    };

    reader.readAsText(file);
  };


  // Listen for Excel/Sheets copy-paste events anywhere on the screen!
  useEffect(() => {
    const handleGlobalPaste = (e) => {
      // Ignore if user is currently typing in an input or textarea
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text');

      if (!pastedText) return;

      try {
        const rows = pastedText.split('\n').filter(row => row.trim() !== '');
        if (rows.length === 0) return;

        if (rows.length > 50) {
          showToast(`Maximum 50 rows are allowed per paste. You pasted ${rows.length}.`, 'error');
          return;
        }

        // Clean numbers in case they paste "₹50,000" or just plain strings
        const parseNum = (val) => {
          if (!val) return 0;
          const cleaned = val.toString().replace(/[^0-9.-]+/g, "");
          return parseFloat(cleaned) || 0;
        };

        // Parse tab-separated values exactly as they copy from their standard 21-column Excel sheet
        const newRecords = rows.map((row, index) => {
          const columns = row.split('\t');

          // Helper to grab cell text safely as an empty string instead of fake placeholders
          const getStr = (idx) => (columns[idx] !== undefined && columns[idx].trim() !== '') ? columns[idx].trim() : '';

          return {
            id: '', // Always empty while pasting
            channelCode: '', // Always empty while pasting
            channelName: getStr(0),
            channelLink: getStr(1),
            platform: getStr(2),
            brandUniqueKey: getStr(3),
            productName: getStr(4),
            deliverables: getStr(5),
            brandPrice: parseNum(columns[6]),
            deliverablesCount: parseNum(columns[7]),
            requiredPrice: parseNum(columns[8]),
            projectManager: getStr(9),
            projectManagerComment: getStr(10),
            projectManagerStatus: getStr(11),
            influencerAssociate: getStr(12),
            channelPrice: parseNum(columns[13]),
            iaStatus: getStr(14),
            iaComment: getStr(15),
            postingDate: getStr(16),
            createdAt: '',
            updatedAt: '',
          };
        });

        if (newRecords.length > 0) {
          setPastedState({ records: newRecords, tab: activeTab });
          if (activeTab === 'database') {
            setRowData(prev => [...newRecords, ...prev]);
          } else {
            setAnalyticsData(prev => [...newRecords, ...prev]);
          }
          showToast(`Pasted ${newRecords.length} records. Please save to confirm!`, 'success');
          console.log("📥 Appended from Clipboard:", newRecords);
        }
      } catch (err) {
        showToast('Error pasting data from clipboard', 'error');
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [activeTab]);

  const [analyticsData, setAnalyticsData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [pendingDropdowns, setPendingDropdowns] = useState({}); // { rowId: { fieldKey: newValue } }

  // Custom Confirmation Modal State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);

  const getRowId = (row, idx) => row.id || row.tempId || idx;

  const toggleRowSelection = (row, idx) => {
    const uniqueId = getRowId(row, idx);
    setSelectedRowIds(prev =>
      prev.includes(uniqueId) ? prev.filter(id => id !== uniqueId) : [...prev, uniqueId]
    );
  };

  const handleSelectAll = () => {
    const allIds = displayData.map((row, idx) => getRowId(row, idx));
    const allSelected = allIds.length > 0 && allIds.every(id => selectedRowIds.includes(id));
    if (allSelected) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(allIds);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRowIds.length === 0) {
      showToast('Please select at least one record to delete.', 'error');
      return;
    }

    // Filter for real database IDs (handles both numbers and strings, excludes local temp IDs)
    const validIds = selectedRowIds.filter(id =>
      id !== undefined &&
      id !== null &&
      !String(id).includes('temp_') &&
      typeof id !== 'object'
    );

    if (validIds.length > 0) {
      setIdsToDelete(validIds);
      setShowDeleteConfirm(true);
    } else {
      // If only local records are selected, delete instantly
      setRowData(prev => prev.filter((row, idx) => !selectedRowIds.includes(getRowId(row, idx))));
      setSelectedRowIds([]);
      showToast(`Removed local records.`, 'success');
    }
  };

  const executeDelete = async () => {
    const validIds = idsToDelete;
    setShowDeleteConfirm(false);
    setIdsToDelete([]);

    const token = localStorage.getItem('token');

    try {
      showToast(`Deleting ${validIds.length} record(s)...`, 'success');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/delete-bulk`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validIds)
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!res.ok) {
        showToast('Failed to delete records from server.', 'error');
        return;
      }

      // If we reach here, server delete was successful. 
      // Now remove all selected (both DB and local) from local state.
      setRowData(prev => prev.filter((row, idx) => !selectedRowIds.includes(getRowId(row, idx))));
      setSelectedRowIds([]);

      showToast(`Successfully deleted ${validIds.length} record(s).`, 'success');
      silentRefresh();
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Error connecting to server for deletion.', 'error');
    }
  };

  const handleEditSelected = () => {
    if (selectedRowIds.length !== 1) {
      showToast("Please select exactly 1 record to edit inline.", "error");
      return;
    }
    const targetId = selectedRowIds[0];
    const targetIndex = displayData.findIndex((row, idx) => getRowId(row, idx) === targetId);
    if (targetIndex !== -1) {
      handleDoubleClickRow(displayData[targetIndex], targetIndex);
    }
  };

  const handleDoubleClickRow = (row, index) => {
    setEditingRowIndex(index);
    setEditFormData({ ...row }); // clone the row to start editing
  };

  const handleAddNewRecord = () => {
    const newRecord = {
      id: '',
      channelCode: '',
      channelName: '',
      channelLink: '',
      platform: '',
      brandUniqueKey: '',
      productName: '',
      deliverables: '',
      brandPrice: '',
      deliverablesCount: '',
      requiredPrice: '',
      projectManager: '',
      projectManagerComment: '',
      projectManagerStatus: '',
      influencerAssociate: '',
      channelPrice: '',
      iaStatus: '',
      iaComment: '',
      postingDate: '',
      createdAt: '',
      updatedAt: '',
      isNewUnsaved: true
    };

    if (activeTab === 'database') {
      setRowData(prev => [newRecord, ...prev]);
    } else {
      setAnalyticsData(prev => [newRecord, ...prev]);
    }

    // Auto-focus the exact new row in Inline Editing Mode simultaneously
    setEditingRowIndex(0);
    setEditFormData({ ...newRecord });
  };

  const handleEditChange = (col, value) => {
    setEditFormData(prev => ({ ...prev, [col]: value }));
  };

  const handleSaveInlineEdit = async () => {
    try {
      showToast("Saving changes...", "success");
      const token = localStorage.getItem('token');
      // HTML Inputs convert everything to strings. We must cast these back to strict numbers for Java!
      const finalPayload = { ...editFormData };
      finalPayload.brandPrice = parseFloat(finalPayload.brandPrice) || 0;
      finalPayload.requiredPrice = parseFloat(finalPayload.requiredPrice) || 0;
      finalPayload.channelPrice = parseFloat(finalPayload.channelPrice) || 0;
      finalPayload.deliverablesCount = parseInt(finalPayload.deliverablesCount, 10) || 1;

      if (finalPayload.isNewUnsaved) {
        delete finalPayload.isNewUnsaved;
        delete finalPayload.tempId;

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ records: [finalPayload] })
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
          return;
        }
        if (!response.ok) throw new Error("Failed to create record");

        if (activeTab === 'database') {
          const newData = [...rowData];
          newData[editingRowIndex] = finalPayload;
          setRowData(newData);
        } else {
          const newData = [...analyticsData];
          newData[editingRowIndex] = finalPayload;
          setAnalyticsData(newData);
        }
        setEditingRowIndex(null);
        setEditFormData(null);
        showToast("Record created successfully!", "success");
        silentRefresh();
        return;
      }

      const id = finalPayload.id;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/${id}`, {
        method: 'PUT', // or PUT, verify with backend if 404 occurs
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalPayload)
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
        return;
      }
      if (!response.ok) throw new Error("Failed to save record");

      // Update local UI immediately
      if (activeTab === 'database') {
        const newData = [...rowData];
        newData[editingRowIndex] = editFormData;
        setRowData(newData);
      } else {
        const newData = [...analyticsData];
        newData[editingRowIndex] = editFormData;
        setAnalyticsData(newData);
      }

      setEditingRowIndex(null);
      setEditFormData(null);
      showToast("Record updated successfully!", "success");
      silentRefresh();
    } catch (err) {
      showToast("Error updating record", "error");
    }
  };

  const handleCancelEdit = () => {
    if (editFormData && editFormData.isNewUnsaved) {
      if (activeTab === 'database') {
        const newData = [...rowData];
        newData.splice(editingRowIndex, 1);
        setRowData(newData);
      } else {
        const newData = [...analyticsData];
        newData.splice(editingRowIndex, 1);
        setAnalyticsData(newData);
      }
    }
    setEditingRowIndex(null);
    setEditFormData(null);
  };

  // Quick-edit handlers for always-visible dropdown cells
  const handleQuickDropdownChange = (rowId, key, value) => {
    setPendingDropdowns(prev => ({
      ...prev,
      [rowId]: { ...(prev[rowId] || {}), [key]: value }
    }));
  };

  const handleQuickSave = async (row, idx) => {
    const rowId = getRowId(row, idx);
    const changes = pendingDropdowns[rowId];
    if (!changes || !row.id) return;
    try {
      showToast('Saving...', 'success');
      const token = localStorage.getItem('token');
      const updatedRow = { ...row, ...changes };
      updatedRow.brandPrice = parseFloat(updatedRow.brandPrice) || 0;
      updatedRow.channelPrice = parseFloat(updatedRow.channelPrice) || 0;
      updatedRow.requiredPrice = parseFloat(updatedRow.requiredPrice) || 0;
      updatedRow.deliverablesCount = parseInt(updatedRow.deliverablesCount, 10) || 1;
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/${row.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updatedRow)
      });
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); return; }
      if (!res.ok) throw new Error('Failed to save');
      setRowData(prev => prev.map((r, i) => getRowId(r, i) === rowId ? { ...r, ...changes } : r));
      setPendingDropdowns(prev => { const n = { ...prev }; delete n[rowId]; return n; });
      showToast('Saved successfully!', 'success');
    } catch {
      showToast('Error saving record.', 'error');
    }
  };

  const handleQuickCancelCell = (rowId, key) => {
    setPendingDropdowns(prev => {
      const rowPending = { ...(prev[rowId] || {}) };
      delete rowPending[key];
      if (Object.keys(rowPending).length === 0) {
        const n = { ...prev };
        delete n[rowId];
        return n;
      }
      return { ...prev, [rowId]: rowPending };
    });
  };
  // ----------------------------------------

  // Clear stale data immediately when tab changes, then fetch fresh
  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setRowData([]);
    setTableColumns([]);
    setEditingRowIndex(null);
    setEditFormData(null);
    setSelectedRowIds([]);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigateRef.current('/login');
          return;
        }

        const endpoint = activeTab === 'database' ? '/channels/getAll' : '/dashboard/data';

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
          signal,
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (signal.aborted) return; // tab switched while request was in flight

        if (res.status === 401) {
          localStorage.removeItem('token');
          navigateRef.current('/login');
          return;
        }
        if (res.ok) {
          const rawText = await res.text();
          if (signal.aborted) return;
          try {
            const data = JSON.parse(rawText);
            if (data && data.length > 0) {
              setRowData(data);
              setTableColumns(Object.keys(data[0]));
            } else {
              setRowData([]);
              setTableColumns([]);
            }
          } catch (parseError) {
            console.error('Backend sent invalid JSON! Raw string:', rawText);
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') return; // expected — request was cancelled
        console.error('Failed to fetch API data', err);
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    };

    fetchData();
    fetchIAs();

    // Cancel the request if activeTab changes before this one completes
    return () => controller.abort();
  }, [activeTab]); // ← only activeTab; navigate is accessed via ref

  // Use rowData for both tabs now since we update it based on activeTab
  const displayData = rowData;

  // For analytics tab: use fixed ordered columns with display labels.
  // For database tab: use formal fixed database headers.
  const activeColumns = activeTab === 'analytics'
    ? ANALYTICS_COLUMNS
    : DATABASE_COLUMNS;

  // Column totals — only meaningful on database tab
  const fmt = (n) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const totalBrandPrice = displayData.reduce((s, r) => s + (parseFloat(r.brandPrice) || 0), 0);
  const totalChannelPrice = displayData.reduce((s, r) => s + (parseFloat(r.channelPrice) || 0), 0);
  const PRICE_TOTALS = { brandPrice: totalBrandPrice, channelPrice: totalChannelPrice };

  const renderCell = (col, value, row) => {
    switch (col) {
      case 'platform':
        return <HoverText text={value}><TypeBadge value={value || ''} /></HoverText>;
      case 'projectManagerStatus':
      case 'iaStatus':
        return <HoverText text={value}><StatusBadge value={value || ''} /></HoverText>;
      case 'channelLink':
        return (
          <HoverText text={value}>
            <div className="flex items-center justify-center gap-1.5 text-brand-400 hover:text-brand-300 hover:underline cursor-pointer">
              {row.platform === 'Instagram' ? <Instagram size={14} className="text-pink-500 shrink-0" /> : <Youtube size={14} className="text-red-500 shrink-0" />}
              <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] inline-block">{value}</span>
            </div>
          </HoverText>
        );
      case 'brandPrice':
        return <HoverText text={value}><span className="font-bold text-brand-accent whitespace-nowrap">{value}</span></HoverText>;
      case 'requiredPrice':
        return <HoverText text={value}><span className="font-bold text-brand-500 whitespace-nowrap">{value}</span></HoverText>;
      case 'channelPrice':
        return <HoverText text={value}><span className="font-bold text-gray-200 whitespace-nowrap">{value}</span></HoverText>;
      case 'brandUniqueKey':
      case 'channelCode':
        return <HoverText text={value}><span className="font-mono text-gray-400 text-[11px]">{value}</span></HoverText>;
      case 'channelName':
        return <HoverText text={value} className="font-bold text-white" />;
      case 'projectManager':
      case 'influencerAssociate':
      case 'productName':
      case 'deliverables':
      case 'projectManagerComment':
      case 'iaComment':
      case 'postingDate':
        return <HoverText text={value} />;
      case 'createdAt':
      case 'updatedAt': {
        const d = value ? new Date(value) : null;
        const formatted = d && !isNaN(d)
          ? `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
          : value;
        return <HoverText text={value}>{formatted}</HoverText>;
      }
      default:
        return <HoverText text={value} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1014] relative overflow-hidden flex flex-col text-sm text-gray-300">

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md ${toast.type === 'error'
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

      <ConfirmModal
        show={showDeleteConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${idsToDelete.length} selected record(s)? This action is permanent and cannot be undone.`}
        confirmText="Delete Anyway"
        onConfirm={executeDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Undo/Save Toolbar for Pasted Records */}
      <AnimatePresence>
        {pastedState && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 flex items-center gap-4 px-5 py-3 rounded-xl border border-brand-500/30 bg-black/60 shadow-2xl backdrop-blur-xl"
          >
            <span className="font-semibold text-white">
              {pastedState.records.length} Unsaved Records
            </span>
            <div className="w-px h-6 bg-white/20 mx-1"></div>
            <button
              onClick={handleSavePasted}
              className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-400 text-brand-900 px-4 py-1.5 rounded-md font-bold transition-all shadow-lg"
            >
              <Save size={16} /> Save to Database
            </button>
            <button
              onClick={handleUndoPaste}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-gray-200 px-4 py-1.5 rounded-md font-medium transition-all"
            >
              <Undo2 size={16} /> Undo Paste
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline Edit Floating Toolbar */}
      <AnimatePresence>
        {editingRowIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 flex items-center gap-4 px-5 py-3 rounded-xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-semibold text-white text-sm">Editing Row</span>
              {editFormData?.channelName && (
                <span className="text-gray-400 text-sm font-normal truncate max-w-[160px]">— {editFormData.channelName}</span>
              )}
            </div>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button
              onClick={handleSaveInlineEdit}
              className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-400 text-brand-900 px-4 py-1.5 rounded-md font-bold transition-all shadow-lg"
            >
              <Save size={16} /> Save &amp; Exit
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-gray-200 px-4 py-1.5 rounded-md font-medium transition-all"
            >
              <X size={16} /> Cancel
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
              {/* <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Share2 size={12} className="text-brand-900" />
              </div> */}
              <span className="font-bold tracking-tight text-white uppercase text-xs">Enmmey</span>
            </div>

            {/* Tab and Actions */}
            <div className="flex flex-1 items-center justify-between h-full">
              <nav className="flex items-center h-full gap-1 pl-4">
                <button
                  onClick={() => handleTabSwitch('database')}
                  className={`px-4 h-full transition-colors flex items-center gap-2 text-sm font-medium border-b-2 ${activeTab === 'database' ? 'text-brand-400 border-brand-500 bg-brand-500/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                >
                  Channel Co-ordination
                </button>
                <button
                  onClick={() => handleTabSwitch('analytics')}
                  className={`px-4 h-full transition-colors flex items-center gap-2 text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'text-brand-400 border-brand-500 bg-brand-500/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                >
                  Posting Schedule
                </button>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium border border-transparent hover:border-white/10"
                >
                  <Home size={16} /> Home
                </button>
                <button
                  onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium border border-transparent hover:border-red-500/20"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto flex flex-col gap-5 relative z-10">

        {/* Action Toolbar */}
        <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-2.5 flex flex-wrap items-center justify-between gap-4 border border-white/10">
          <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
            <button onClick={handleAddNewRecord} className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-accent text-brand-900 px-3 py-1.5 rounded-md font-bold transition-all shadow-lg shadow-brand-500/20">
              <Plus size={14} /> Add New Record
            </button>
            <button
              onClick={handleAddIA}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-md font-medium transition-all"
            >
              <Plus size={14} /> Add IA
            </button>
            <label className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-md font-bold transition-all ${isUploading ? 'opacity-50 cursor-not-allowed bg-brand-500/10 text-brand-400/50 border-brand-500/10' : 'bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 border-brand-500/30 cursor-pointer'}`}>
              {isUploading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
              {isUploading ? 'Uploading...' : 'Upload CSV'}
              <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
            </label>
            <AnimatePresence>
              {selectedRowIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2.5"
                >
                  <button onClick={handleEditSelected} className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-md font-medium transition-all">
                    <Edit size={14} /> Edit Selected
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-md font-medium transition-all"
                  >
                    <Trash2 size={14} />
                    Delete Selected
                    {selectedRowIds.length > 1 && (
                      <span className="ml-0.5 text-[11px] text-red-400/70">({selectedRowIds.length})</span>
                    )}
                  </button>
                  <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />
                </motion.div>
              )}
            </AnimatePresence>


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
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className={`flex items-center gap-1.5 text-[13px] border px-3 py-1.5 rounded-md transition-all ${isRefreshing
                ? 'bg-brand-500/10 text-brand-400 border-brand-500/20 cursor-not-allowed'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
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
          className="flex-1 flex flex-col glass-card overflow-hidden relative"
        >
          {/* Table Top Controls (Header Bar) */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/10 text-[12px] text-gray-300 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Checkbox checked={displayData.length > 0 && selectedRowIds.length === displayData.length} onChange={handleSelectAll} />
              <div className="flex items-center gap-2">
                <span>Filter By:</span>
                <div className="flex items-center gap-1 bg-black/30 border border-white/10 rounded px-2 py-0.5 cursor-pointer hover:border-white/20">
                  <span className="text-gray-200">All</span>
                  <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className="ml-1 opacity-70"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
          <div className="flex-1 overflow-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0F1014]/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 animate-spin"></div>
                    <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-brand-400/60 animate-spin" style={{ animationDuration: '0.6s', animationDirection: 'reverse' }}></div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold text-white">Loading data</span>
                    <span className="text-xs text-gray-500">Fetching from API...</span>
                  </div>
                  {/* Skeleton rows */}
                  <div className="flex flex-col gap-2 w-80 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-7 rounded bg-white/5 animate-pulse" style={{ opacity: 1 - i * 0.15, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <table className="w-full text-center border-collapse min-w-[3200px]">
              <thead className="bg-[#0F1014] text-[12px] font-semibold text-gray-300 sticky top-0 z-20 border-b border-brand-500/20">
                <tr>
                  {/* Sticky checkbox col */}
                  <th className="py-3 px-4 font-semibold text-center w-[50px] sticky left-0 z-30 bg-[#0F1014] border-r border-white/5">
                    <div className="flex justify-center">
                      <Checkbox checked={displayData.length > 0 && selectedRowIds.length === displayData.length} onChange={handleSelectAll} />
                    </div>
                  </th>
                  {activeColumns.map((col, idx) => {
                    const hasTotal = activeTab === 'database' && col.key in PRICE_TOTALS;
                    return (
                      <th
                        key={idx}
                        className={`py-3 px-4 font-semibold uppercase tracking-wider text-center whitespace-nowrap relative group ${col.key === 'id'
                          ? 'sticky left-[50px] z-30 bg-[#0F1014] border-r border-white/5'
                          : ''
                          }`}
                      >
                        <span className={hasTotal ? 'cursor-help border-b border-dashed border-gray-500/50 pb-px' : ''}>
                          {col.label}
                        </span>
                        {hasTotal && (
                          <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
                            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                            transition-all duration-200 whitespace-nowrap">
                            <div className="bg-black/90 border border-white/10 backdrop-blur-md rounded-lg px-3 py-2 shadow-2xl">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                                Total {col.label}
                              </p>
                              <p className={`text-sm font-bold ${col.key === 'brandPrice' ? 'text-brand-accent' : 'text-gray-100'
                                }`}>
                                ₹ {fmt(PRICE_TOTALS[col.key])}
                              </p>
                              <p className="text-[10px] text-gray-500 mt-0.5">{displayData.length} records</p>
                            </div>
                            {/* Arrow */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 border-l border-t border-white/10 rotate-45" />
                          </div>
                        )}
                      </th>
                    );
                  })}
                  {activeColumns.length === 0 && (
                    <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">NO DATA</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-200">
                {displayData.map((row, idx) => {
                  const isEditing = editingRowIndex === idx;
                  const rowBg = isEditing ? '#1a1f0a' : idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)';
                  return (
                    <tr
                      key={idx}
                      onDoubleClick={() => !isEditing && handleDoubleClickRow(row, idx)}
                      className={`border-b border-white/5 transition-colors group ${isEditing ? 'bg-brand-500/10' : 'hover:bg-white/[0.04]'}`}
                    >
                      {/* Sticky checkbox cell — always shows checkbox, dimmed while editing */}
                      <td
                        className="py-3 px-4 text-center border-r border-white/5 relative sticky left-0 z-10"
                        style={{ background: isEditing ? '#151a08' : '#0F1014' }}
                      >
                        <div className={`flex justify-center ${isEditing ? 'opacity-30 pointer-events-none' : ''}`}>
                          <Checkbox checked={selectedRowIds.includes(getRowId(row, idx))} onChange={() => toggleRowSelection(row, idx)} />
                        </div>
                      </td>
                      {activeColumns.map((col, colIdx) => (
                        <td
                          key={colIdx}
                          className={`px-3 text-center ${isEditing ? 'py-2' : 'py-3'} ${col.key === 'id'
                            ? 'sticky left-[50px] z-10 border-r border-white/5'
                            : ''
                            }`}
                          style={col.key === 'id' ? { background: isEditing ? '#151a08' : '#0F1014' } : undefined}
                        >
                          {isEditing ? (
                            col.key === 'id' ? (
                              <span className="text-gray-500 font-mono text-[12px]">{editFormData[col.key] || 'N/A'}</span>
                            ) : (col.key === 'projectManagerStatus' || col.key === 'iaStatus') ? (
                              <select
                                value={editFormData[col.key] || ''}
                                onChange={(e) => handleEditChange(col.key, e.target.value)}
                                className="bg-[#0d1108] border border-brand-500/40 rounded px-2 py-1.5 text-white text-[13px] w-full min-w-[160px] focus:outline-none focus:border-brand-500 focus:bg-white/5 transition-all text-center cursor-pointer appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px' }}
                              >
                                {(col.key === 'iaStatus' ? IA_STATUS_LIST : PM_STATUS_LIST).map(opt => (
                                  <option key={opt} value={opt} style={{ background: '#0d1108', color: '#fff' }}>{opt}</option>
                                ))}
                              </select>
                            ) : (col.key === 'platform' || col.key === 'brandUniqueKey' || col.key === 'projectManager' || col.key === 'influencerAssociate') ? (
                              <select
                                value={editFormData[col.key] || ''}
                                onChange={async (e) => {
                                  if (col.key === 'influencerAssociate' && e.target.value === 'ADD_NEW_IA') {
                                    const newName = await handleAddIA();
                                    if (newName) handleEditChange(col.key, newName);
                                  } else {
                                    handleEditChange(col.key, e.target.value);
                                  }
                                }}
                                className="bg-[#0d1108] border border-brand-500/40 rounded px-2 py-1.5 text-white text-[13px] w-full min-w-[160px] focus:outline-none focus:border-brand-500 focus:bg-white/5 transition-all text-center cursor-pointer appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: '28px' }}
                              >
                                {(col.key === 'platform' ? PLATFORM_LIST :
                                  col.key === 'brandUniqueKey' ? BRAND_KEY_LIST :
                                    col.key === 'projectManager' ? PM_LIST :
                                      iaList).map(opt => (
                                        <option key={opt} value={opt} style={{ background: '#0d1108', color: '#fff' }}>{opt}</option>
                                      ))
                                }
                                {col.key === 'influencerAssociate' && (
                                  <option value="ADD_NEW_IA" style={{ background: '#0d1108', color: '#c4d600', fontStyle: 'italic', fontWeight: 'bold' }}>+ Add New Associate...</option>
                                )}
                              </select>
                            ) : col.key === 'deliverables' ? (
                              <DeliverablesPaster 
                                value={editFormData[col.key] || ''}
                                onChange={(newVal) => handleEditChange(col.key, newVal)}
                              />
                            ) : (
                              <input
                                type="text"
                                value={editFormData[col.key] || ''}
                                onChange={(e) => handleEditChange(col.key, e.target.value)}
                                className="bg-black/50 border border-brand-500/40 rounded px-2 py-1.5 text-white text-[13px] w-full min-w-[120px] focus:outline-none focus:border-brand-500 focus:bg-white/5 transition-all text-center placeholder-gray-600"
                                placeholder={`Enter ${col.label}`}
                              />
                            )
                          ) : (col.key === 'projectManagerStatus' || col.key === 'iaStatus') ? (() => {
                            const rowId = getRowId(row, idx);
                            const pendingVal = pendingDropdowns[rowId]?.[col.key];
                            const displayVal = pendingVal !== undefined ? pendingVal : (row[col.key] || '');
                            const hasPending = pendingVal !== undefined;
                            const isIa = col.key === 'iaStatus';
                            return (
                              <div className="flex flex-col items-center gap-1.5">
                                <QuickStatusDropdown
                                  value={displayVal}
                                  onChange={(newVal) => handleQuickDropdownChange(rowId, col.key, newVal)}
                                  options={isIa ? IA_STATUS_LIST : PM_STATUS_LIST}
                                  chipStyles={isIa ? IA_STATUS_CHIP_STYLES : PM_STATUS_CHIP_STYLES}
                                />
                                {hasPending && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleQuickSave(row, idx)}
                                      className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-brand-500/20 hover:bg-brand-500/40 text-brand-300 text-[10px] font-bold border border-brand-500/30 transition-all"
                                    >
                                      <Check size={10} /> Save
                                    </button>
                                    <button
                                      onClick={() => handleQuickCancelCell(rowId, col.key)}
                                      className="flex items-center px-1 py-0.5 rounded bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 text-[10px] border border-white/10 hover:border-red-500/20 transition-all"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })() : (col.key === 'platform' || col.key === 'brandUniqueKey' || col.key === 'projectManager' || col.key === 'influencerAssociate') ? (() => {
                            const rowId = getRowId(row, idx);
                            const pendingVal = pendingDropdowns[rowId]?.[col.key];
                            const displayVal = pendingVal !== undefined ? pendingVal : (row[col.key] || '');
                            const hasPending = pendingVal !== undefined;

                            let options = [];
                            let chipStyles = {};
                            if (col.key === 'platform') { options = PLATFORM_LIST; chipStyles = PLATFORM_CHIP_STYLES; }
                            else if (col.key === 'brandUniqueKey') { options = BRAND_KEY_LIST; }
                            else if (col.key === 'projectManager') { options = PM_LIST; }
                            else { options = iaList; }

                            return (
                              <div className="flex flex-col items-center gap-1.5">
                                  {col.key === 'influencerAssociate' ? (
                                    <QuickStatusDropdown
                                      value={displayVal}
                                      onChange={(newVal) => handleQuickDropdownChange(rowId, col.key, newVal)}
                                      options={iaList}
                                      chipStyles={undefined}
                                      onAdd={handleAddIA}
                                      onBulkAdd={handleBulkAddIA}
                                    />
                                 ) : col.key === 'deliverables' ? (
                               <DeliverablesPaster 
                                 value={displayVal}
                                 onChange={(newVal) => handleQuickDropdownChange(rowId, col.key, newVal)}
                               />
                             ) : (
                                    <QuickStatusDropdown
                                      value={displayVal}
                                      onChange={(newVal) => handleQuickDropdownChange(rowId, col.key, newVal)}
                                      options={options}
                                      chipStyles={chipStyles}
                                    />
                                  )}
                                {hasPending && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleQuickSave(row, idx)}
                                      className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-brand-500/20 hover:bg-brand-500/40 text-brand-300 text-[10px] font-bold border border-brand-500/30 transition-all"
                                    >
                                      <Check size={10} /> Save
                                    </button>
                                    <button
                                      onClick={() => handleQuickCancelCell(rowId, col.key)}
                                      className="flex items-center px-1 py-0.5 rounded bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 text-[10px] border border-white/10 hover:border-red-500/20 transition-all"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })() : renderCell(col.key, row[col.key], row)}
                        </td>
                      ))}
                      {activeColumns.length === 0 && (
                        <td className="py-3 px-4 text-center text-gray-500 py-10">
                          No columns found from API
                        </td>
                      )}
                    </tr>
                  );
                })}
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
