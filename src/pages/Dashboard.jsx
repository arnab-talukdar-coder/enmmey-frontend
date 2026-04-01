import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram, Youtube, Database, Plus, Edit, Trash2,
  RefreshCw, Search, LayoutDashboard, Share2, Activity,
  DatabaseZap, Filter, ChevronLeft, ChevronRight, LogOut, Upload, AlertCircle, CheckCircle, X, Save, Undo2, Home
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

const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = typeof text === 'string' && text.length > 25;

  if (!isLong) return <span>{text}</span>;

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[250px]">
      <span className={expanded ? 'whitespace-normal break-words text-left block w-full' : 'line-clamp-1 w-full'}>{text}</span>
      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="text-[10px] text-brand-500 font-bold hover:text-brand-400 mt-1 uppercase tracking-wider flex items-center gap-1"
      >
        {expanded ? '▲ Collapse' : '▼ Expand'}
      </button>
    </div>
  );
};

// Fixed column order + display labels for the Analytics tab
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

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
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

        // Map columns by position — same fixed order as the Excel paste handler
        const decodedArray = dataRows.map(line => {
          const col = parseCSVLine(line);
          const getStr = (i) => (col[i] !== undefined && col[i] !== '') ? col[i] : '';
          return {
            channelCode:            getStr(0),
            channelName:            getStr(1),
            channelLink:            getStr(2),
            platform:               getStr(3),
            brandUniqueKey:         getStr(4),
            productName:            getStr(5),
            deliverables:           getStr(6),
            brandPrice:             parseNum(col[7]),
            deliverablesCount:      parseNum(col[8]),
            requiredPrice:          parseNum(col[9]),
            projectManager:         getStr(10),
            projectManagerComment:  getStr(11),
            projectManagerStatus:   getStr(12),
            influencerAssociate:    getStr(13),
            channelPrice:           parseNum(col[14]),
            iaStatus:               getStr(15),
            iaComment:              getStr(16),
            postingDate:            getStr(17),
          };
        });

        console.log('🔥 CSV mapped to fixed keys:', decodedArray);

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

        // Parse tab-separated values exactly as they copy from their standard 18-column Excel sheet
        const newRecords = rows.map((row, index) => {
          const columns = row.split('\t');

          // Helper to grab cell text safely as an empty string instead of fake placeholders
          const getStr = (idx) => (columns[idx] !== undefined && columns[idx].trim() !== '') ? columns[idx].trim() : '';

          return {
            channelCode: getStr(0),
            channelName: getStr(1),
            channelLink: getStr(2),
            platform: getStr(3),
            brandUniqueKey: getStr(4),
            productName: getStr(5),
            deliverables: getStr(6),
            brandPrice: parseNum(columns[7]),
            deliverablesCount: parseNum(columns[8]),
            requiredPrice: parseNum(columns[9]),
            projectManager: getStr(10),
            projectManagerComment: getStr(11),
            projectManagerStatus: getStr(12),
            influencerAssociate: getStr(13),
            channelPrice: parseNum(columns[14]),
            iaStatus: getStr(15),
            iaComment: getStr(16),
            postingDate: getStr(17)
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

  const handleDeleteSelected = async () => {
    if (selectedRowIds.length === 0) {
      showToast('Please select at least one record to delete.', 'error');
      return;
    }
    const token = localStorage.getItem('token');
    let successCount = 0;
    let failCount = 0;
    try {
      showToast(`Deleting ${selectedRowIds.length} record(s)...`, 'success');
      await Promise.all(
        selectedRowIds.map(async (id) => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/channels/${id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 401) {
              localStorage.removeItem('token');
              navigate('/login');
              return;
            }
            if (res.ok) {
              successCount++;
            } else {
              failCount++;
            }
          } catch {
            failCount++;
          }
        })
      );
      // Remove deleted rows from local state
      setRowData(prev => prev.filter((row, idx) => !selectedRowIds.includes(getRowId(row, idx))));
      setSelectedRowIds([]);
      if (failCount === 0) {
        showToast(`Successfully deleted ${successCount} record(s).`, 'success');
      } else {
        showToast(`Deleted ${successCount}, failed ${failCount}.`, 'error');
      }
      silentRefresh();
    } catch (err) {
      showToast('Error deleting records.', 'error');
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

    // Cancel the request if activeTab changes before this one completes
    return () => controller.abort();
  }, [activeTab]); // ← only activeTab; navigate is accessed via ref

  // Use rowData for both tabs now since we update it based on activeTab
  const displayData = rowData;

  // For analytics tab: use fixed ordered columns with display labels.
  // For database tab: use dynamic columns from API response.
  const activeColumns = activeTab === 'analytics'
    ? ANALYTICS_COLUMNS
    : tableColumns.map(col => ({ key: col, label: col }));

  // Column totals — only meaningful on database tab
  const fmt = (n) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const totalBrandPrice = displayData.reduce((s, r) => s + (parseFloat(r.brandPrice) || 0), 0);
  const totalChannelPrice = displayData.reduce((s, r) => s + (parseFloat(r.channelPrice) || 0), 0);
  const PRICE_TOTALS = { brandPrice: totalBrandPrice, channelPrice: totalChannelPrice };

  const renderCell = (col, value, row) => {
    switch (col) {
      case 'platform':
        return <TypeBadge value={value || ''} />;
      case 'projectManagerStatus':
      case 'iaStatus':
        return <StatusBadge value={value || ''} />;
      case 'channelLink':
        return (
          <div className="flex items-center justify-center gap-1.5 text-brand-400 hover:text-brand-300 hover:underline cursor-pointer">
            {row.platform === 'Instagram' ? <Instagram size={14} className="text-pink-500 shrink-0" /> : <Youtube size={14} className="text-red-500 shrink-0" />}
            {value}
          </div>
        );
      case 'brandPrice':
        return <span className="font-bold text-brand-accent whitespace-nowrap">{value}</span>;
      case 'requiredPrice':
        return <span className="font-bold text-brand-500 whitespace-nowrap">{value}</span>;
      case 'channelPrice':
        return <span className="font-bold text-gray-200 whitespace-nowrap">{value}</span>;
      case 'brandUniqueKey':
      case 'channelCode':
        return <span className="font-mono text-gray-400">{value}</span>;
      case 'channelName':
        return <span className="font-bold text-white whitespace-nowrap"><ExpandableText text={value} /></span>;
      case 'projectManagerComment':
      case 'iaComment':
        return <ExpandableText text={value} />;
      case 'postingDate':
        return <span className="whitespace-nowrap text-brand-100 font-medium">{value}</span>;
      default:
        return <ExpandableText text={value} />;
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
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Share2 size={12} className="text-brand-900" />
              </div>
              <span className="font-bold tracking-tight text-white uppercase text-xs">Enmmey</span>
            </div>

            {/* Tab and Actions */}
            <div className="flex flex-1 items-center justify-between h-full">
              <nav className="flex items-center h-full gap-1 pl-4">
                <button
                  onClick={() => handleTabSwitch('database')}
                  className={`px-4 h-full transition-colors flex items-center gap-2 text-sm font-medium border-b-2 ${activeTab === 'database' ? 'text-brand-400 border-brand-500 bg-brand-500/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                >
                  Manage Database
                </button>
                <button
                  onClick={() => handleTabSwitch('analytics')}
                  className={`px-4 h-full transition-colors flex items-center gap-2 text-sm font-medium border-b-2 ${activeTab === 'analytics' ? 'text-brand-400 border-brand-500 bg-brand-500/5' : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'}`}
                >
                  Analytics
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
                            ) : (
                              <input
                                type="text"
                                value={editFormData[col.key] || ''}
                                onChange={(e) => handleEditChange(col.key, e.target.value)}
                                className="bg-black/50 border border-brand-500/40 rounded px-2 py-1.5 text-white text-[13px] w-full min-w-[120px] focus:outline-none focus:border-brand-500 focus:bg-white/5 transition-all text-center placeholder-gray-600"
                                placeholder={`Enter ${col.label}`}
                              />
                            )
                          ) : renderCell(col.key, row[col.key], row)}
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
