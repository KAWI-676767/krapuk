(() => {
  'use strict';

  const KEY = 'krapuk.v1';
  const LKEY = 'krapuk.lang';
  const PHOTO_PREFIX = 'krapuk.photo.';
  const COLORS = ['#1f6bff', '#2eb8ff', '#0b2a6b', '#6a7dff', '#12a8b8', '#5e9bff'];
  const MAX_AMOUNT = 1e9;
  const TEMPLATES = [
    { k: 'tp_travel', t: 20000 },
    { k: 'tp_emergency', t: 50000 },
    { k: 'tp_gadget', t: 15000 },
    { k: 'tp_gift', t: 3000 },
    { k: 'tp_course', t: 10000 },
    { k: 'tp_down', t: 100000 },
  ];
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- สองภาษา ---------- */
  const I18N = {
    th: {
      app: 'กระปุก',
      tab_home: 'หน้าหลัก', tab_history: 'ประวัติ', menu_aria: 'เมนูหลัก',
      lang_aria: 'สลับภาษา', settings_aria: 'ตั้งค่าและสำรองข้อมูล',
      total_label: 'ยอดออมรวม',
      this_month: m => `เดือนนี้ ${m}`,
      goals_count: (n, d) => `${n} เป้าหมาย${n ? ` · ครบแล้ว ${d}` : ''}`,
      other_goals: 'เป้าหมายอื่น',
      done: 'ครบแล้ว', reached: 'ถึงเป้าหมายแล้ว',
      left: m => `เหลืออีก ${m}`, of: m => `จาก ${m}`,
      empty_title: 'เริ่มออมจากเป้าหมายแรก',
      empty_body: 'แตะแม่แบบด้านล่างเพื่อสร้างทันที แล้วค่อยปรับชื่อ ยอด และรูปทีหลังได้',
      custom_goal: 'ตั้งเองตั้งแต่ต้น',
      history: 'ประวัติ',
      hist_empty_title: 'ยังไม่มีรายการ',
      hist_empty_body: 'เมื่อฝากหรือถอนเงิน รายการจะมาอยู่ที่นี่ เรียงตามวันที่',
      today: 'วันนี้', yesterday: 'เมื่อวาน',
      deposit_word: 'ฝากเงิน', withdraw_word: 'ถอนเงิน', dep_short: 'ฝาก', wd_short: 'ถอน',
      init_note: 'ยอดตั้งต้น',
      goal_target: m => `เป้าหมาย ${m}`,
      close: 'ปิด', back: 'กลับ',
      history_of_goal: 'ประวัติของเป้าหมายนี้',
      no_entries: 'ยังไม่มีรายการ แตะ "ฝากเงิน" เพื่อเริ่ม',
      edit: 'แก้ไข', del_goal: 'ลบเป้าหมาย', tap_delete: 'แตะอีกครั้งเพื่อลบ',
      del_entry_aria: 'ลบรายการนี้',
      dep_current: (n, m) => `${n} · ยอดปัจจุบัน ${m}`,
      note_ph: 'บันทึก (ไม่บังคับ) เช่น เงินเดือน', note_aria: 'บันทึก',
      del_digit_aria: 'ลบตัวเลข',
      enter_amount: 'ใส่จำนวนเงินมากกว่า 0',
      amount_big: 'จำนวนเงินมากเกินไป', amount_small: 'จำนวนเงินน้อยเกินไป',
      over_withdraw: 'ถอนเกินยอดที่ออมไว้',
      reached_toast: 'ถึงเป้าหมายแล้ว ยินดีด้วย!',
      deposited: 'ฝากแล้ว', withdrawn: 'ถอนแล้ว',
      new_goal: 'เป้าหมายใหม่', edit_goal: 'แก้ไขเป้าหมาย',
      photo_aria: 'เลือกรูปประจำเป้าหมาย',
      change_photo: 'เปลี่ยนรูป', add_photo: 'เพิ่มรูป (ไม่บังคับ)', remove_photo: 'เอารูปออก',
      goal_name: 'ชื่อเป้าหมาย', goal_name_ph: 'เช่น เที่ยวญี่ปุ่น',
      target_label: 'ยอดเป้าหมาย (บาท)',
      init_label: 'มีเงินออมอยู่แล้ว (ไม่บังคับ)',
      color_label: 'สีประจำเป้าหมาย', color_aria: i => `สีที่ ${i}`,
      cancel: 'ยกเลิก', save_btn: 'บันทึก',
      name_first: 'ตั้งชื่อเป้าหมายก่อน',
      target_pos: 'ใส่ยอดเป้าหมายมากกว่า 0', target_big: 'ยอดเป้าหมายมากเกินไป',
      photo_full: 'รูปนี้ใหญ่เกินพื้นที่เก็บในเครื่อง',
      saved: 'บันทึกแล้ว',
      photo_fail: 'เปิดรูปนี้ไม่ได้ ลองเลือกรูปอื่น',
      settings_title: 'สำรองข้อมูล',
      backup_note: 'ข้อมูลเก็บอยู่ในเครื่องนี้เท่านั้น ไม่ต้องใช้อินเทอร์เน็ต ถ้าถอนการติดตั้งแอป ข้อมูลจะหาย ควรคัดลอกข้อมูลสำรองเก็บไว้เป็นระยะ ข้อมูลสำรองมีเฉพาะตัวเลขและชื่อ ไม่รวมรูปภาพ',
      your_backup: 'ข้อมูลสำรองของคุณ', copy_backup: 'คัดลอกข้อมูลสำรอง',
      restore_label: 'กู้คืนจากข้อมูลสำรอง', restore_ph: 'วางข้อมูลสำรองที่นี่',
      restore_btn: 'กู้คืน (แทนที่ข้อมูลปัจจุบัน)', erase_btn: 'ลบข้อมูลทั้งหมด',
      tap_confirm: 'แตะอีกครั้งเพื่อยืนยัน', tap_erase: 'แตะอีกครั้งเพื่อลบทั้งหมด',
      copied: 'คัดลอกแล้ว', copy_fail: 'เลือกข้อความไว้แล้ว กดคัดลอกจากเมนูของเครื่อง',
      paste_first: 'วางข้อมูลสำรองก่อน', bad_backup: 'ข้อมูลสำรองไม่ถูกต้อง',
      restored: n => `กู้คืนแล้ว ${n} เป้าหมาย`,
      erased: 'ลบข้อมูลทั้งหมดแล้ว',
      goal_deleted: 'ลบเป้าหมายแล้ว', entry_deleted: 'ลบรายการแล้ว',
      tpl_created: 'สร้างแล้ว แตะ "แก้ไข" เพื่อปรับยอดและใส่รูป',
      save_fail: 'บันทึกไม่สำเร็จ พื้นที่เก็บข้อมูลเต็มหรือถูกบล็อก',
      tp_travel: 'เที่ยว', tp_emergency: 'เงินสำรองฉุกเฉิน', tp_gadget: 'ซื้อของใหม่',
      tp_gift: 'ของขวัญ', tp_course: 'เรียน/คอร์ส', tp_down: 'ดาวน์รถ/บ้าน',
    },
    en: {
      app: 'Krapuk',
      tab_home: 'Home', tab_history: 'History', menu_aria: 'Main menu',
      lang_aria: 'Switch language', settings_aria: 'Settings and backup',
      total_label: 'Total saved',
      this_month: m => `This month ${m}`,
      goals_count: (n, d) => `${n} ${n === 1 ? 'goal' : 'goals'}${n ? ` · ${d} done` : ''}`,
      other_goals: 'Other goals',
      done: 'Done', reached: 'Goal reached',
      left: m => `${m} to go`, of: m => `of ${m}`,
      empty_title: 'Start with your first goal',
      empty_body: 'Tap a template to create it right away. You can change the name, amount and photo later.',
      custom_goal: 'Create your own',
      history: 'History',
      hist_empty_title: 'No activity yet',
      hist_empty_body: 'Deposits and withdrawals will show up here, newest first.',
      today: 'Today', yesterday: 'Yesterday',
      deposit_word: 'Deposit', withdraw_word: 'Withdraw', dep_short: 'Deposit', wd_short: 'Withdraw',
      init_note: 'Starting balance',
      goal_target: m => `Target ${m}`,
      close: 'Close', back: 'Back',
      history_of_goal: 'Activity for this goal',
      no_entries: 'Nothing here yet. Tap "Deposit" to start.',
      edit: 'Edit', del_goal: 'Delete goal', tap_delete: 'Tap again to delete',
      del_entry_aria: 'Delete this entry',
      dep_current: (n, m) => `${n} · Balance ${m}`,
      note_ph: 'Note (optional), e.g. salary', note_aria: 'Note',
      del_digit_aria: 'Delete digit',
      enter_amount: 'Enter an amount above 0',
      amount_big: 'That amount is too large', amount_small: 'That amount is too small',
      over_withdraw: "You can't withdraw more than you've saved",
      reached_toast: 'Goal reached. Congratulations!',
      deposited: 'Deposited', withdrawn: 'Withdrawn',
      new_goal: 'New goal', edit_goal: 'Edit goal',
      photo_aria: 'Choose a goal photo',
      change_photo: 'Change photo', add_photo: 'Add a photo (optional)', remove_photo: 'Remove photo',
      goal_name: 'Goal name', goal_name_ph: 'e.g. Trip to Japan',
      target_label: 'Target amount (THB)',
      init_label: 'Already saved (optional)',
      color_label: 'Goal color', color_aria: i => `Color ${i}`,
      cancel: 'Cancel', save_btn: 'Save',
      name_first: 'Give your goal a name first',
      target_pos: 'Enter a target above 0', target_big: 'That target is too large',
      photo_full: 'This photo is too large to store',
      saved: 'Saved',
      photo_fail: "Couldn't open that photo. Try another.",
      settings_title: 'Backup',
      backup_note: 'Everything is stored on this phone only and works without internet. If you uninstall the app, your data is lost, so copy a backup now and then. The backup holds names and numbers only, not photos.',
      your_backup: 'Your backup', copy_backup: 'Copy backup',
      restore_label: 'Restore from a backup', restore_ph: 'Paste your backup here',
      restore_btn: 'Restore (replaces current data)', erase_btn: 'Erase all data',
      tap_confirm: 'Tap again to confirm', tap_erase: 'Tap again to erase everything',
      copied: 'Copied', copy_fail: "Text selected. Use your phone's copy option.",
      paste_first: 'Paste a backup first', bad_backup: 'That backup is not valid',
      restored: n => `Restored ${n} ${n === 1 ? 'goal' : 'goals'}`,
      erased: 'All data erased',
      goal_deleted: 'Goal deleted', entry_deleted: 'Entry deleted',
      tpl_created: 'Created. Tap "Edit" to change the amount or add a photo.',
      save_fail: 'Could not save. Storage is full or blocked.',
      tp_travel: 'Travel', tp_emergency: 'Emergency fund', tp_gadget: 'New gadget',
      tp_gift: 'Gift', tp_course: 'Course', tp_down: 'Car or home down payment',
    },
  };
  let lang = 'th';
  try { const v = localStorage.getItem(LKEY); if (v === 'en' || v === 'th') lang = v; } catch (e) { /* ไม่เป็นไร */ }
  let langFrom = null;
  const t = (k, ...a) => {
    const v = I18N[lang][k] !== undefined ? I18N[lang][k] : I18N.th[k];
    return typeof v === 'function' ? v(...a) : v;
  };
  const locale = () => (lang === 'th' ? 'th-TH' : 'en-US');

  const ICON = {
    gear: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>',
    camera: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    del: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 5H9l-6 7 6 7h12z"/><path d="M13 9l4 6M17 9l-4 6"/></svg>',
  };

  /* ---------- ตัวช่วย ---------- */
  const NF = {};
  function numFmt() {
    const loc = locale();
    return NF[loc] || (NF[loc] = {
      i: new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }),
      d: new Intl.NumberFormat(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    });
  }
  const nf = {
    format: n => { const f = numFmt(); return (Number.isInteger(n) ? f.i : f.d).format(n); },
    int: n => numFmt().i.format(n),
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const money = n => '฿' + nf.format(n);
  const round2 = n => Math.round(n * 100) / 100;
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const sumSaved = g => round2(g.entries.reduce((a, e) => a + e.amt, 0));
  const pctOf = g => (g.target > 0 ? Math.min(1, Math.max(0, sumSaved(g)) / g.target) : 0);
  const colorOf = g => COLORS[g.color % COLORS.length];
  const initialOf = g => Array.from(g.name.trim())[0] || '•';
  const entryLabel = e => (e.note === '@init' || e.note === 'ยอดตั้งต้น')
    ? t('init_note')
    : (e.note || (e.amt > 0 ? t('deposit_word') : t('withdraw_word')));

  function dateLabel(ts) {
    const d = new Date(ts);
    const opt = { day: 'numeric', month: 'short' };
    if (d.getFullYear() !== new Date().getFullYear()) opt.year = '2-digit';
    return d.toLocaleDateString(locale(), opt);
  }
  function dayLabel(ts) {
    const d = new Date(ts), now = new Date();
    const same = (a, b) => a.toDateString() === b.toDateString();
    if (same(d, now)) return t('today');
    const y = new Date(now); y.setDate(now.getDate() - 1);
    if (same(d, y)) return t('yesterday');
    return dateLabel(ts);
  }
  const timeLabel = ts => new Date(ts).toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' });

  /* ---------- ข้อมูลในเครื่อง ---------- */
  function sanitize(raw) {
    const out = { goals: [] };
    if (!raw || !Array.isArray(raw.goals)) return out;
    for (const g of raw.goals) {
      if (!g || typeof g.name !== 'string' || !(Number(g.target) > 0)) continue;
      const entries = (Array.isArray(g.entries) ? g.entries : [])
        .filter(e => e && Number.isFinite(Number(e.amt)) && Number(e.amt) !== 0)
        .map(e => ({
          id: typeof e.id === 'string' ? e.id : uid(),
          amt: round2(Number(e.amt)),
          note: typeof e.note === 'string' ? e.note.slice(0, 60) : '',
          ts: Number.isFinite(Number(e.ts)) ? Number(e.ts) : Date.now(),
        }));
      out.goals.push({
        id: typeof g.id === 'string' ? g.id : uid(),
        name: g.name.slice(0, 40),
        target: round2(Number(g.target)),
        color: Number.isInteger(g.color) ? g.color : 0,
        createdAt: Number.isFinite(Number(g.createdAt)) ? Number(g.createdAt) : Date.now(),
        entries,
      });
    }
    return out;
  }
  function load() {
    try { return sanitize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { return { goals: [] }; }
  }
  let state = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { toast(t('save_fail')); }
  }

  /* ---------- รูปประจำเป้าหมาย (เก็บแยกในเครื่อง) ---------- */
  const photoCache = new Map();
  function getPhoto(id) {
    if (photoCache.has(id)) return photoCache.get(id);
    let v = null;
    try { v = localStorage.getItem(PHOTO_PREFIX + id); } catch (e) { /* ไม่เป็นไร */ }
    photoCache.set(id, v);
    return v;
  }
  function setPhoto(id, url) {
    try {
      if (url) localStorage.setItem(PHOTO_PREFIX + id, url); else localStorage.removeItem(PHOTO_PREFIX + id);
      photoCache.set(id, url || null);
      return true;
    } catch (e) { return false; }
  }
  function prunePhotos() {
    try {
      const ids = new Set(state.goals.map(g => g.id));
      Object.keys(localStorage).filter(k => k.startsWith(PHOTO_PREFIX)).forEach(k => {
        const id = k.slice(PHOTO_PREFIX.length);
        if (!ids.has(id)) { localStorage.removeItem(k); photoCache.delete(id); }
      });
    } catch (e) { /* ไม่เป็นไร */ }
  }
  function readPhoto(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const M = 320, s = Math.min(1, M / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * s));
        c.height = Math.max(1, Math.round(img.height * s));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode')); };
      img.src = url;
    });
  }

  /* ---------- สถานะหน้าจอ ---------- */
  let tab = 'home';
  let view = null;

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
  }

  /* ---------- ตัวเลขวิ่งนับเพิ่ม + วงแหวน ---------- */
  const shown = new Map();
  const ringShown = new Map();

  function countUp(el) {
    const to = Number(el.dataset.count), key = el.dataset.key || '';
    const from = shown.has(key) ? shown.get(key) : 0;
    shown.set(key, to);
    const pre = el.dataset.pre || '';
    const fmt = el.dataset.fmt === 'pct'
      ? v => Math.floor(v * 100) + '%'
      : (v, last) => nf.format(last ? v : Math.round(v));
    if (reduce || from === to) { el.textContent = pre + fmt(to, true); return; }
    const t0 = performance.now(), dur = 750;
    const step = ts => {
      const k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + fmt(k < 1 ? from + (to - from) * e : to, k >= 1);
      if (k < 1 && el.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function ring(pct, color, size, stroke, key) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    const from = ringShown.has(key) ? ringShown.get(key) : 0;
    ringShown.set(key, pct);
    const off = v => (c * (1 - v)).toFixed(2);
    return `<svg class="ring" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle class="ring-bg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="ring-fg" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
        stroke-linecap="round" stroke-dasharray="${c.toFixed(2)}"
        style="stroke-dashoffset:${off(from)};stroke-opacity:${from > 0 ? 1 : 0}"
        data-to="${off(pct)}" data-op="${pct > 0 ? 1 : 0}"
        transform="rotate(-90 ${size / 2} ${size / 2})"/>
    </svg>`;
  }

  function post(root = document) {
    $$('[data-photo]', root).forEach(el => {
      const url = getPhoto(el.dataset.photo);
      if (url) { el.style.backgroundImage = `url("${url}")`; el.classList.add('has-photo'); }
    });
    $$('[data-count]', root).forEach(countUp);
    const rings = $$('.ring-fg', root);
    if (rings.length) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        rings.forEach(el => { el.style.strokeDashoffset = el.dataset.to; el.style.strokeOpacity = el.dataset.op; });
      }));
    }
  }

  /* ---------- ฉลองเมื่อถึงเป้า ---------- */
  function confetti() {
    try { if (navigator.vibrate) navigator.vibrate([30, 40, 30]); } catch (e) { /* ไม่เป็นไร */ }
    if (reduce) return;
    const c = $('#confetti'), ctx = c.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth, H = window.innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    c.style.display = 'block';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cols = ['#1f6bff', '#4cc3ff', '#ffffff', '#bfe3ff', '#0b2a6b', '#7aa7ff'];
    const P = Array.from({ length: 70 }, () => ({
      x: W / 2 + (Math.random() - .5) * 80, y: H * .58,
      vx: (Math.random() - .5) * 11, vy: -Math.random() * 15 - 5,
      s: 6 + Math.random() * 7, r: Math.random() * 6.28, vr: (Math.random() - .5) * .35,
      c: cols[Math.floor(Math.random() * cols.length)], round: Math.random() < .45,
    }));
    const t0 = performance.now();
    (function frame(ts) {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of P) {
        p.vy += .34; p.x += p.vx; p.y += p.vy; p.vx *= .991; p.r += p.vr;
        if (p.y < H + 20) alive = true;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 6.283); ctx.fill(); }
        else ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .66);
        ctx.restore();
      }
      if (alive && ts - t0 < 2800) requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, W, H); c.style.display = 'none'; }
    })(t0);
  }

  /* ---------- ส่วนประกอบ ---------- */
  function sortedGoals() {
    return [...state.goals].sort((a, b) => {
      const da = sumSaved(a) >= a.target, db = sumSaved(b) >= b.target;
      return da === db ? a.createdAt - b.createdAt : da ? 1 : -1;
    });
  }
  const featured = () => sortedGoals()[0] || null;

  function dot(g, size) {
    return `<span class="dot" data-photo="${esc(g.id)}" style="--c:${colorOf(g)};width:${size}px;height:${size}px;font-size:${Math.round(size * .42)}px">${esc(initialOf(g))}</span>`;
  }

  function topBar(title) {
    const cur = langFrom || lang;
    return `<header class="top">
      <h1>${esc(title)}</h1>
      <div class="top-r">
        <div class="lang glass" data-lang="${cur}" role="group" aria-label="${esc(t('lang_aria'))}">
          <i></i>
          <button data-action="lang" data-v="th" class="${cur === 'th' ? 'on' : ''}" aria-pressed="${lang === 'th'}">ไทย</button>
          <button data-action="lang" data-v="en" class="${cur === 'en' ? 'on' : ''}" aria-pressed="${lang === 'en'}">EN</button>
        </div>
        <button class="round glass" data-action="settings" aria-label="${esc(t('settings_aria'))}">${ICON.gear}</button>
      </div>
    </header>`;
  }

  function heroCard(g) {
    const s = sumSaved(g), p = pctOf(g), col = colorOf(g), done = s >= g.target, left = round2(g.target - s);
    const len = money(s).length, fs = len <= 9 ? 24 : len <= 11 ? 20 : len <= 13 ? 17 : 14;
    return `<button class="hero glass" data-action="open" data-id="${esc(g.id)}" style="--c:${col}">
      <span class="hero-head">${dot(g, 40)}<span class="hero-name">${esc(g.name)}</span>
        ${done ? `<span class="pill ok">${t('done')}</span>`
          : `<span class="pill" data-count="${p}" data-fmt="pct" data-key="pct:${esc(g.id)}">${Math.floor(p * 100)}%</span>`}
      </span>
      <span class="ring-wrap">${ring(p, col, 172, 14, 'r:' + g.id)}
        <span class="ring-center">
          <span class="rc-num" style="font-size:${fs}px" data-count="${s}" data-pre="฿" data-key="s:${esc(g.id)}">${money(s)}</span>
          <span class="rc-sub">${t('of', money(g.target))}</span>
        </span>
      </span>
      <span class="hero-foot">${done ? t('reached') : t('left', money(left))}</span>
    </button>`;
  }

  function capRow(g) {
    const s = sumSaved(g), p = pctOf(g), col = colorOf(g), done = s >= g.target;
    return `<button class="cap glass" data-action="open" data-id="${esc(g.id)}" style="--c:${col}">
      <span class="mini">${ring(p, col, 52, 5, 'm:' + g.id)}${dot(g, 36)}</span>
      <span class="cap-info"><span class="cap-name">${esc(g.name)}</span><span class="cap-sub">${money(s)} ${t('of', money(g.target))}</span></span>
      ${done ? `<span class="pill ok">${t('done')}</span>` : `<span class="cap-pct" style="color:${col}">${Math.floor(p * 100)}%</span>`}
    </button>`;
  }

  function emptyState() {
    return `<section class="empty glass">
      <div class="coin" aria-hidden="true"></div>
      <h2>${t('empty_title')}</h2>
      <p>${t('empty_body')}</p>
      <div class="tpls">${TEMPLATES.map((tp, i) => `<button class="chip tp" data-action="tpl" data-i="${i}">${esc(t(tp.k))}<span class="amt">${money(tp.t)}</span></button>`).join('')}</div>
      <button class="btn soft" data-action="new">${t('custom_goal')}</button>
    </section>`;
  }

  /* ---------- หน้าหลัก / ประวัติ ---------- */
  function renderHome() {
    const goals = sortedGoals();
    const total = round2(goals.reduce((a, g) => a + sumSaved(g), 0));
    const now = new Date();
    const m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const month = round2(goals.flatMap(g => g.entries).filter(e => e.ts >= m0).reduce((a, e) => a + e.amt, 0));
    const done = goals.filter(g => sumSaved(g) >= g.target).length;
    const [first, ...rest] = goals;
    $('#app').innerHTML = `<div class="wrap">
      ${topBar(t('app'))}
      <section class="total glass deep">
        <div class="lbl">${t('total_label')}</div>
        <div class="num"><small>฿</small><span data-count="${total}" data-key="total">${nf.format(total)}</span></div>
        <div class="chips-row">
          <span class="badge">${t('this_month', (month >= 0 ? '+' : '−') + money(Math.abs(month)))}</span>
          <span class="badge soft">${t('goals_count', goals.length, done)}</span>
        </div>
      </section>
      ${first ? heroCard(first) : emptyState()}
      ${rest.length ? `<div class="cap-title">${t('other_goals')}</div><div class="caps">${rest.map(capRow).join('')}</div>` : ''}
    </div>`;
  }

  function renderHistory() {
    const rows = state.goals.flatMap(g => g.entries.map(e => ({ g, e }))).sort((a, b) => b.e.ts - a.e.ts).slice(0, 300);
    let html = '', last = '';
    for (const { g, e } of rows) {
      const lbl = dayLabel(e.ts);
      if (lbl !== last) { html += `${last ? '</div>' : ''}<div class="cap-title">${esc(lbl)}</div><div class="caps">`; last = lbl; }
      html += `<button class="cap glass" data-action="open" data-id="${esc(g.id)}" style="--c:${colorOf(g)}">
        ${dot(g, 44)}
        <span class="cap-info"><span class="cap-name">${esc(entryLabel(e))}</span><span class="cap-sub">${esc(g.name)} · ${timeLabel(e.ts)}</span></span>
        <span class="e-amt ${e.amt > 0 ? 'pos' : 'neg'}">${e.amt > 0 ? '+' : '−'}${nf.format(Math.abs(e.amt))}</span>
      </button>`;
    }
    if (last) html += '</div>';
    $('#app').innerHTML = `<div class="wrap">
      ${topBar(t('history'))}
      ${html || `<section class="empty glass"><div class="coin" aria-hidden="true"></div><h2>${t('hist_empty_title')}</h2><p>${t('hist_empty_body')}</p></section>`}
    </div>`;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('app');
    $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    $$('[data-ta]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.ta)); });
  }

  function render(enter) {
    if (tab === 'home') renderHome(); else renderHistory();
    if (enter) $('.wrap').classList.add('enter');
    post($('#app'));
  }

  function setLang(v) {
    if (v === lang || (v !== 'th' && v !== 'en')) return;
    langFrom = lang;
    lang = v;
    try { localStorage.setItem(LKEY, v); } catch (e) { /* ไม่เป็นไร */ }
    applyLang();
    render();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      langFrom = null;
      $$('.lang').forEach(el => {
        el.dataset.lang = lang;
        $$('button', el).forEach(b => {
          const on = b.dataset.v === lang;
          b.classList.toggle('on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      });
    }));
  }

  function setTab(tb) {
    if (tb === tab) return;
    tab = tb;
    $('#dock').dataset.tab = tb;
    $$('#dock .tab').forEach(b => {
      const on = b.dataset.tab === tb;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    window.scrollTo(0, 0);
    render(true);
  }

  /* ---------- แผ่นล่าง ---------- */
  function openSheet(html) {
    const sheet = $('#sheet');
    const first = sheet.hidden;
    $('#sheet-body').innerHTML = html;
    post($('#sheet-body'));
    if (first) {
      sheet.hidden = false;
      try { history.pushState({ sheet: 1 }, ''); } catch (e) { /* ไม่เป็นไร */ }
      requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('open')));
    } else {
      $('.panel').scrollTop = 0;
    }
  }
  function hideSheet() {
    const sheet = $('#sheet');
    if (sheet.hidden) return;
    sheet.classList.remove('open');
    view = null;
    setTimeout(() => { if (!sheet.classList.contains('open')) { sheet.hidden = true; $('#sheet-body').innerHTML = ''; } }, 450);
  }
  function closeSheet() {
    if (history.state && history.state.sheet) history.back(); else hideSheet();
  }
  window.addEventListener('popstate', hideSheet);

  /* ---------- รายละเอียดเป้าหมาย ---------- */
  function showGoal(id) {
    const g = state.goals.find(x => x.id === id);
    if (!g) return closeSheet();
    view = { type: 'goal', id };
    const s = sumSaved(g), p = pctOf(g), left = round2(g.target - s), col = colorOf(g);
    const rows = [...g.entries].sort((a, b) => b.ts - a.ts).map(e => `
      <li class="entry">
        <div class="e-main">
          <span class="e-note">${esc(entryLabel(e))}</span>
          <span class="e-date">${dateLabel(e.ts)} · ${timeLabel(e.ts)}</span>
        </div>
        <span class="e-amt ${e.amt > 0 ? 'pos' : 'neg'}">${e.amt > 0 ? '+' : '−'}${nf.format(Math.abs(e.amt))}</span>
        <button class="frost-btn" data-action="delentry" data-id="${esc(e.id)}" aria-label="${esc(t('del_entry_aria'))}">×</button>
      </li>`).join('');

    openSheet(`
      <div class="sheet-head">
        ${dot(g, 52)}
        <h2>${esc(g.name)}<span class="sub">${t('goal_target', money(g.target))}</span></h2>
        <button class="frost-btn" data-action="close" aria-label="${esc(t('close'))}">×</button>
      </div>
      <div class="stack" style="--c:${col}">
        <div class="big"><small>฿</small><span data-count="${s}" data-key="gs:${esc(g.id)}">${nf.format(s)}</span></div>
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.floor(p * 100)}"><i style="width:${(p * 100).toFixed(1)}%"></i></div>
        <p class="note">${left > 0 ? `${t('left', money(left))} · ${Math.floor(p * 100)}%` : t('reached')}</p>
        <div class="row2">
          <button class="btn primary" data-action="depo" data-id="${esc(g.id)}" data-mode="in">${t('deposit_word')}</button>
          <button class="btn soft" data-action="depo" data-id="${esc(g.id)}" data-mode="out">${t('withdraw_word')}</button>
        </div>
        <h3>${t('history_of_goal')}</h3>
        ${rows ? `<ul class="entries">${rows}</ul>` : `<p class="note" style="padding-left:6px">${t('no_entries')}</p>`}
        <div class="row2">
          <button class="btn soft" data-action="edit" data-id="${esc(g.id)}">${t('edit')}</button>
          <button class="btn danger" data-action="delgoal" data-id="${esc(g.id)}">${t('del_goal')}</button>
        </div>
      </div>`);
  }

  /* ---------- ฝาก/ถอน ด้วยแผงตัวเลข ---------- */
  function showDeposit(goalId, mode, from) {
    const goals = sortedGoals();
    if (!goals.length) { showEdit(); return; }
    const g = goals.find(x => x.id === goalId) || goals[0];
    view = { type: 'dep', goalId: g.id, mode: mode || 'in', amt: '', from: from || null };
    const chips = goals.length > 1
      ? `<div class="pick" id="pick">${goals.map(x => `<button class="chip" data-action="pick" data-id="${esc(x.id)}" style="--c:${colorOf(x)}">${dot(x, 28)}${esc(x.name)}</button>`).join('')}</div>`
      : '';
    openSheet(`
      <div class="sheet-head">
        ${view.from ? `<button class="frost-btn" data-action="open" data-id="${esc(view.from)}" aria-label="${esc(t('back'))}">${ICON.back}</button>` : ''}
        <h2 id="dep-title">${t('deposit_word')}</h2>
        <button class="frost-btn" data-action="close" aria-label="${esc(t('close'))}">×</button>
      </div>
      <div class="stack">
        <div class="seg" id="seg" data-mode="in">
          <i></i>
          <button data-action="mode" data-v="in">${t('dep_short')}</button>
          <button data-action="mode" data-v="out">${t('wd_short')}</button>
        </div>
        ${chips}
        <div class="disp empty" id="disp"><small>฿</small><span id="disp-n">0</span></div>
        <div class="disp-sub" id="dsub"></div>
        <div class="qrow">
          <button class="chip q" data-action="quick" data-v="100">+100</button>
          <button class="chip q" data-action="quick" data-v="500">+500</button>
          <button class="chip q" data-action="quick" data-v="1000">+1,000</button>
          <button class="chip q" data-action="quick" data-v="5000">+5,000</button>
        </div>
        <div class="pad">
          ${['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(k => `<button class="key" data-action="key" data-k="${k}">${k}</button>`).join('')}
          <button class="key sub" data-action="key" data-k=".">.</button>
          <button class="key" data-action="key" data-k="0">0</button>
          <button class="key sub" data-action="key" data-k="del" aria-label="${esc(t('del_digit_aria'))}">${ICON.del}</button>
        </div>
        <input class="input" id="note" type="text" maxlength="60" placeholder="${esc(t('note_ph'))}" aria-label="${esc(t('note_aria'))}">
        <button class="btn primary" id="confirm" data-action="confirm" disabled>${t('dep_short')}</button>
      </div>`);
    refreshDep();
  }

  function dispFmt(a) {
    if (!a) return '0';
    const [i, d] = a.split('.');
    const int = nf.int(Number(i || 0));
    return d === undefined ? int : int + '.' + d;
  }

  function refreshDep() {
    if (!view || view.type !== 'dep') return;
    const g = state.goals.find(x => x.id === view.goalId);
    if (!g) return;
    const out = view.mode === 'out';
    const n = Number(view.amt) || 0;
    $('#seg').dataset.mode = view.mode;
    $$('#seg button').forEach(b => b.classList.toggle('on', b.dataset.v === view.mode));
    $('#dep-title').textContent = out ? t('withdraw_word') : t('deposit_word');
    $('#disp-n').textContent = dispFmt(view.amt);
    $('#disp').classList.toggle('empty', !view.amt);
    $('#dsub').textContent = t('dep_current', g.name, money(sumSaved(g)));
    $$('#pick .chip').forEach(c => c.classList.toggle('on', c.dataset.id === view.goalId));
    const btn = $('#confirm');
    const word = out ? t('wd_short') : t('dep_short');
    btn.disabled = !(n > 0);
    btn.textContent = n > 0 ? `${word} ${money(n)}` : word;
    btn.className = 'btn ' + (out ? 'soft' : 'primary');
  }

  function pressKey(k) {
    let a = view.amt;
    if (k === 'del') a = a.slice(0, -1);
    else if (k === '.') { if (!a.includes('.')) a = (a || '0') + '.'; }
    else if (a === '0') a = k;
    else {
      const [i, d] = a.split('.');
      if (d !== undefined) { if (d.length >= 2) return; } else if (i.length >= 9) return;
      a += k;
    }
    view.amt = a;
    refreshDep();
  }

  function confirmDep() {
    if (!view || view.type !== 'dep') return;
    const g = state.goals.find(x => x.id === view.goalId);
    if (!g) return;
    const sign = view.mode === 'out' ? -1 : 1;
    const raw = Number(view.amt);
    if (!(raw > 0)) return toast(t('enter_amount'));
    if (raw > MAX_AMOUNT) return toast(t('amount_big'));
    const amt = round2(raw * sign);
    if (amt === 0) return toast(t('amount_small'));
    const before = sumSaved(g);
    if (sign < 0 && -amt > before + 1e-9) return toast(t('over_withdraw'));
    g.entries.push({ id: uid(), amt, note: ($('#note').value || '').trim().slice(0, 60), ts: Date.now() });
    save();
    const reached = sign > 0 && before < g.target && sumSaved(g) >= g.target;
    const from = view.from;
    if (from) { render(); showGoal(g.id); } else { closeSheet(); render(); }
    if (reached) { toast(t('reached_toast')); confetti(); }
    else toast(sign > 0 ? t('deposited') : t('withdrawn'));
  }

  /* ---------- สร้าง/แก้ไขเป้าหมาย ---------- */
  function photoPreviewStyle() {
    if (!view) return '';
    const url = view.photo === undefined ? (view.id ? getPhoto(view.id) : null) : view.photo;
    return url ? `background-image:url("${url}")` : '';
  }

  function showEdit(id) {
    const g = id ? state.goals.find(x => x.id === id) : null;
    view = { type: 'edit', id: g ? g.id : null, color: g ? g.color % COLORS.length : state.goals.length % COLORS.length, photo: undefined };
    const has = !!photoPreviewStyle();
    openSheet(`
      <div class="sheet-head">
        <h2>${g ? t('edit_goal') : t('new_goal')}</h2>
        <button class="frost-btn" data-action="close" aria-label="${esc(t('close'))}">×</button>
      </div>
      <div class="stack">
        <button class="photo-pick ${has ? 'has' : ''}" id="photo-pick" data-action="pickphoto" style="${photoPreviewStyle()}" aria-label="${esc(t('photo_aria'))}">${has ? '' : ICON.camera}</button>
        <div class="photo-actions">
          <button class="chip t" id="photo-btn" data-action="pickphoto">${has ? t('change_photo') : t('add_photo')}</button>
          <button class="chip t" id="rm-photo" data-action="rmphoto" ${has ? '' : 'hidden'}>${t('remove_photo')}</button>
        </div>
        <input id="g-file" type="file" accept="image/*" hidden>
        <div class="field">
          <label for="g-name">${t('goal_name')}</label>
          <input class="input" id="g-name" type="text" maxlength="40" placeholder="${esc(t('goal_name_ph'))}" value="${g ? esc(g.name) : ''}">
        </div>
        <div class="field">
          <label for="g-target">${t('target_label')}</label>
          <input class="input" id="g-target" type="number" inputmode="decimal" min="0" step="any" placeholder="30000" value="${g ? g.target : ''}">
        </div>
        ${g ? '' : `<div class="field">
          <label for="g-init">${t('init_label')}</label>
          <input class="input" id="g-init" type="number" inputmode="decimal" min="0" step="any" placeholder="0">
        </div>`}
        <div class="field">
          <label>${t('color_label')}</label>
          <div class="swatches">
            ${COLORS.map((c, i) => `<button class="sw ${i === view.color ? 'on' : ''}" data-action="color" data-i="${i}" style="background:${c}" aria-label="${esc(t('color_aria', i + 1))}"></button>`).join('')}
          </div>
        </div>
        <div class="row2">
          <button class="btn soft" data-action="${g ? 'open' : 'close'}" data-id="${g ? esc(g.id) : ''}">${t('cancel')}</button>
          <button class="btn primary" data-action="savegoal">${t('save_btn')}</button>
        </div>
      </div>`);
  }

  function updatePhotoPreview() {
    const pick = $('#photo-pick'); if (!pick) return;
    const style = photoPreviewStyle();
    pick.style.backgroundImage = style ? style.replace('background-image:', '') : '';
    pick.classList.toggle('has', !!style);
    pick.innerHTML = style ? '' : ICON.camera;
    const rm = $('#rm-photo'); if (rm) rm.hidden = !style;
    const pb = $('#photo-btn'); if (pb) pb.textContent = style ? t('change_photo') : t('add_photo');
  }

  async function onFile(file) {
    if (!file || !view || view.type !== 'edit') return;
    try {
      view.photo = await readPhoto(file);
      updatePhotoPreview();
    } catch (e) { toast(t('photo_fail')); }
  }

  function createGoal(name, target, init) {
    const g = { id: uid(), name, target: round2(target), color: state.goals.length % COLORS.length, createdAt: Date.now(), entries: [] };
    if (init > 0 && init <= MAX_AMOUNT) g.entries.push({ id: uid(), amt: round2(init), note: '@init', ts: Date.now() });
    state.goals.push(g);
    return g;
  }

  function saveGoal() {
    if (!view || view.type !== 'edit') return;
    const name = $('#g-name').value.trim();
    const target = Number($('#g-target').value);
    if (!name) return toast(t('name_first'));
    if (!(target > 0)) return toast(t('target_pos'));
    if (target > MAX_AMOUNT) return toast(t('target_big'));
    let g = view.id ? state.goals.find(x => x.id === view.id) : null;
    if (g) { g.name = name; g.target = round2(target); g.color = view.color; }
    else {
      g = createGoal(name, target, Number($('#g-init') ? $('#g-init').value : 0));
      g.color = view.color;
    }
    if (view.photo !== undefined && !setPhoto(g.id, view.photo)) toast(t('photo_full'));
    save();
    render();
    showGoal(g.id);
    if (!$('#toast').classList.contains('show')) toast(t('saved'));
  }

  /* ---------- ตั้งค่า / สำรองข้อมูล ---------- */
  function showSettings() {
    view = { type: 'settings' };
    openSheet(`
      <div class="sheet-head">
        <h2>${t('settings_title')}</h2>
        <button class="frost-btn" data-action="close" aria-label="${esc(t('close'))}">×</button>
      </div>
      <div class="stack">
        <p class="note" style="padding:0 6px">${t('backup_note')}</p>
        <div class="field">
          <label for="backup">${t('your_backup')}</label>
          <textarea class="input" id="backup" readonly></textarea>
        </div>
        <button class="btn primary" data-action="copybackup">${t('copy_backup')}</button>
        <div class="field">
          <label for="restore">${t('restore_label')}</label>
          <textarea class="input" id="restore" placeholder="${esc(t('restore_ph'))}"></textarea>
        </div>
        <button class="btn soft" data-action="restore">${t('restore_btn')}</button>
        <button class="btn danger" data-action="erase">${t('erase_btn')}</button>
      </div>`);
    $('#backup').value = JSON.stringify(state);
  }

  function arm(btn, text) {
    if (btn.dataset.armed) return true;
    btn.dataset.armed = '1';
    btn.dataset.orig = btn.textContent;
    btn.textContent = text;
    setTimeout(() => {
      if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = btn.dataset.orig; }
    }, 3000);
    return false;
  }

  async function copyBackup() {
    const ta = $('#backup');
    try { await navigator.clipboard.writeText(ta.value); toast(t('copied')); }
    catch (e) { ta.focus(); ta.select(); toast(t('copy_fail')); }
  }

  function restore(btn) {
    const txt = $('#restore').value.trim();
    if (!txt) return toast(t('paste_first'));
    let parsed;
    try { parsed = JSON.parse(txt); } catch (e) { return toast(t('bad_backup')); }
    if (!parsed || !Array.isArray(parsed.goals)) return toast(t('bad_backup'));
    const clean = sanitize(parsed);
    if (!arm(btn, t('tap_confirm'))) return;
    state = clean;
    save(); prunePhotos(); closeSheet(); render();
    toast(t('restored', clean.goals.length));
  }

  /* ---------- จัดการการกด ---------- */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const id = el.dataset.id;
    switch (el.dataset.action) {
      case 'tab': setTab(el.dataset.tab); break;
      case 'lang': setLang(el.dataset.v); break;
      case 'deposit': showDeposit(null, 'in', null); break;
      case 'depo': showDeposit(id, el.dataset.mode, id); break;
      case 'mode': view.mode = el.dataset.v; refreshDep(); break;
      case 'pick': view.goalId = id; refreshDep(); break;
      case 'key': pressKey(el.dataset.k); break;
      case 'quick': {
        const n = round2((Number(view.amt) || 0) + Number(el.dataset.v));
        if (n <= MAX_AMOUNT) { view.amt = String(n); refreshDep(); }
        break;
      }
      case 'confirm': confirmDep(); break;
      case 'new': showEdit(); break;
      case 'tpl': {
        const tp = TEMPLATES[Number(el.dataset.i)];
        if (!tp) break;
        const g = createGoal(t(tp.k), tp.t, 0);
        save(); render(); showGoal(g.id);
        toast(t('tpl_created'));
        break;
      }
      case 'open': showGoal(id); break;
      case 'close': closeSheet(); break;
      case 'settings': showSettings(); break;
      case 'edit': showEdit(id); break;
      case 'color':
        view.color = Number(el.dataset.i);
        $$('.sw').forEach((b, i) => b.classList.toggle('on', i === view.color));
        break;
      case 'pickphoto': { const f = $('#g-file'); if (f) f.click(); break; }
      case 'rmphoto': view.photo = null; updatePhotoPreview(); break;
      case 'savegoal': saveGoal(); break;
      case 'delentry': {
        const g = state.goals.find(x => x.id === (view && view.id));
        if (!g) break;
        g.entries = g.entries.filter(x => x.id !== id);
        save(); render(); showGoal(g.id); toast(t('entry_deleted'));
        break;
      }
      case 'delgoal':
        if (!arm(el, t('tap_delete'))) break;
        state.goals = state.goals.filter(x => x.id !== id);
        setPhoto(id, null);
        save(); closeSheet(); render(); toast(t('goal_deleted'));
        break;
      case 'copybackup': copyBackup(); break;
      case 'restore': restore(el); break;
      case 'erase':
        if (!arm(el, t('tap_erase'))) break;
        state = { goals: [] };
        save(); prunePhotos(); closeSheet(); render(); toast(t('erased'));
        break;
    }
  });

  document.addEventListener('change', e => {
    if (e.target && e.target.id === 'g-file') onFile(e.target.files && e.target.files[0]);
  });

  applyLang();
  render(true);
})();
