import { useState } from 'react';
import {
  futureCoursesFall2026, futureCoursesSpring2027,
  fall2026Courses as searchPoolFall, spring2027Courses,
  type SearchCourse, type FutureCourse,
} from '../data/mockData';

const SEMESTERS = ['Fall 2026', 'Spring 2027'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_HOUR = 8;
const END_HOUR = 20;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;
const EXTRA_COLORS = ['#eab308', '#f97316', '#8b5cf6', '#06b6d4'];

function toPct(h: number, m: number) { return ((h - START_HOUR) * 60 + m) / TOTAL_MINS * 100; }
function durPct(sh: number, sm: number, eh: number, em: number) { return ((eh - sh) * 60 + (em - sm)) / TOTAL_MINS * 100; }
function fmt(h: number, m: number) {
  const s = h >= 12 ? 'PM' : 'AM';
  return `${h > 12 ? h - 12 : h}${m ? `:${String(m).padStart(2, '0')}` : ''} ${s}`;
}

// Parse a time-range string like "10a-11:50a" or "2p-3:50p"
function parseTimeRange(str: string): { startHour: number; startMin: number; endHour: number; endMin: number } | null {
  if (!str || str === 'N/A') return null;
  const m = str.match(/^(\d+)(?::(\d+))?(a|p)-(\d+)(?::(\d+))?(a|p)$/i);
  if (!m) return null;
  const toH = (n: string, min: string | undefined, ap: string) => {
    let h = parseInt(n); const mn = min ? parseInt(min) : 0;
    if (ap.toLowerCase() === 'p' && h !== 12) h += 12;
    if (ap.toLowerCase() === 'a' && h === 12) h = 0;
    return { h, mn };
  };
  const start = toH(m[1], m[2], m[3]);
  const end   = toH(m[4], m[5], m[6]);
  return { startHour: start.h, startMin: start.mn, endHour: end.h, endMin: end.mn };
}

function searchCourseToSlots(c: SearchCourse, room: string) {
  const dayMap: [string, string | undefined][] = [
    ['Monday', c.monday], ['Tuesday', c.tuesday], ['Wednesday', c.wednesday],
    ['Thursday', c.thursday], ['Friday', c.friday],
  ];
  return dayMap.flatMap(([day, val]) => {
    const t = parseTimeRange(val ?? '');
    return t ? [{ day, ...t, room }] : [];
  });
}

export default function SchedulingFuture() {
  const [view, setView] = useState<'calendar' | 'search'>('search');
  const [semIdx, setSemIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [filterChips, setFilterChips] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addedCourses, setAddedCourses] = useState<FutureCourse[]>([
    ...futureCoursesFall2026,
  ]);
  const [colorIdx, setColorIdx] = useState(0);

  const currentSem = SEMESTERS[semIdx];
  const isSpring = semIdx === 1;
  const pool: SearchCourse[] = isSpring ? spring2027Courses : searchPoolFall;

  // Courses relevant to the selected semester
  const visibleCourses = isSpring
    ? addedCourses.filter(c => futureCoursesSpring2027.some(b => b.code === c.code) ||
        !futureCoursesFall2026.some(b => b.code === c.code))
    : addedCourses.filter(c => futureCoursesFall2026.some(b => b.code === c.code));

  const filtered = pool.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    const matchChips = filterChips.length === 0 || filterChips.some(ch => c.code.toUpperCase().includes(ch.toUpperCase()));
    return matchSearch && matchChips;
  });

  const addChip = (v: string) => { if (v && !filterChips.includes(v)) setFilterChips(c => [...c, v]); setSearch(''); };
  const removeChip = (ch: string) => setFilterChips(c => c.filter(x => x !== ch));

  const addCourse = (c: SearchCourse) => {
    if (addedCourses.find(a => a.code === c.code)) return;
    const color = EXTRA_COLORS[colorIdx % EXTRA_COLORS.length];
    setColorIdx(i => i + 1);
    const slots = searchCourseToSlots(c, c.section ?? '');
    setAddedCourses(prev => [...prev, {
      code: c.code, title: c.title, credits: c.credits,
      fulfills: 'Elective', color, slots,
    }]);
  };

  const removeCourse = (code: string) => setAddedCourses(prev => prev.filter(c => c.code !== code));

  // Ensure spring base courses are present when switching to spring
  const handleSemSwitch = (idx: number) => {
    if (idx === 1) {
      // Make sure spring base courses exist in addedCourses
      setAddedCourses(prev => {
        const missing = futureCoursesSpring2027.filter(b => !prev.find(p => p.code === b.code));
        return [...prev, ...missing];
      });
    }
    setSemIdx(idx);
  };

  return (
    <div style={{
      display: 'flex', gap: 16, width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, background: '#fff', borderRadius: 8,
        border: '1px solid #e5e5e5', display: 'flex',
        flexDirection: 'column', overflow: 'hidden', minWidth: 0,
      }}>
        {/* Top bar: tabs + semester selector */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #e5e5e5', padding: '0 16px', flexShrink: 0,
        }}>
          {/* Calendar / Course Search tabs */}
          <div style={{ display: 'flex' }}>
            {(['calendar', 'search'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '12px 16px', fontSize: 13,
                fontWeight: view === v ? 600 : 400,
                color: view === v ? '#1a1a1a' : '#555',
                borderBottom: view === v ? '2px solid var(--rpi-red)' : '2px solid transparent',
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
                {v === 'search' ? 'Course Search' : 'Calendar'}
              </button>
            ))}
          </div>

          {/* Semester segmented control */}
          <div style={{
            display: 'flex', background: '#f3f4f6',
            borderRadius: 8, padding: 3, gap: 2,
          }}>
            {SEMESTERS.map((sem, i) => (
              <button key={sem} onClick={() => handleSemSwitch(i)} style={{
                padding: '5px 14px', fontSize: 12, fontWeight: semIdx === i ? 600 : 400,
                borderRadius: 6, border: 'none', cursor: 'pointer',
                background: semIdx === i ? '#fff' : 'transparent',
                color: semIdx === i ? '#1a1a1a' : '#666',
                boxShadow: semIdx === i ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}>
                {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar view */}
        {view === 'calendar' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, flexShrink: 0 }}>
              {currentSem} Schedule
            </div>
            {/* Day headers */}
            <div style={{ display: 'flex', flexShrink: 0 }}>
              <div style={{ width: 40, flexShrink: 0 }} />
              {DAYS.map(d => (
                <div key={d} style={{
                  flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 500,
                  color: '#555', padding: '3px 0', borderBottom: '1px solid #e5e5e5',
                }}>
                  {d.slice(0, 3)}
                </div>
              ))}
            </div>
            {/* Grid */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
              {/* Time labels */}
              <div style={{ width: 40, flexShrink: 0, position: 'relative' }}>
                {HOURS.map(h => (
                  <div key={h} style={{
                    position: 'absolute', top: `${toPct(h, 0)}%`,
                    right: 4, transform: 'translateY(-50%)',
                    fontSize: 9, color: '#aaa', whiteSpace: 'nowrap',
                  }}>
                    {h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`}
                  </div>
                ))}
              </div>
              {/* Days */}
              {DAYS.map(day => {
                const courses = visibleCourses.flatMap(c =>
                  c.slots.filter(s => s.day === day).map(s => ({ ...c, slot: s }))
                );
                return (
                  <div key={day} style={{ flex: 1, position: 'relative', borderLeft: '1px solid #e5e5e5' }}>
                    {HOURS.map(h => (
                      <div key={h} style={{
                        position: 'absolute', left: 0, right: 0,
                        top: `${toPct(h, 0)}%`, borderTop: '1px solid #f0f0f0',
                      }} />
                    ))}
                    {courses.map((c, i) => (
                      <div key={i} style={{
                        position: 'absolute', left: 2, right: 2,
                        top: `${toPct(c.slot.startHour, c.slot.startMin)}%`,
                        height: `calc(${durPct(c.slot.startHour, c.slot.startMin, c.slot.endHour, c.slot.endMin)}% - 2px)`,
                        background: c.color + '22', borderLeft: `3px solid ${c.color}`,
                        borderRadius: 4, padding: '2px 4px', overflow: 'hidden', fontSize: 10,
                      }}>
                        <div style={{ fontWeight: 700, color: c.color }}>{c.code}</div>
                        <div style={{ color: '#555' }}>{fmt(c.slot.startHour, c.slot.startMin)}–{fmt(c.slot.endHour, c.slot.endMin)}</div>
                        <div style={{ color: '#777' }}>{c.slot.room}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Course search view */}
        {view === 'search' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '12px 16px 16px' }}>
            {/* Search bar */}
            <div style={{
              display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
              border: '1px solid #ddd', borderRadius: 6, padding: '6px 10px',
              marginBottom: 10, flexShrink: 0,
            }}>
              {filterChips.map(chip => (
                <span key={chip} style={{
                  background: '#f0f0f0', borderRadius: 4, padding: '2px 8px',
                  fontSize: 12, display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  {chip}
                  <button onClick={() => removeChip(chip)} style={{ fontSize: 11, color: '#888' }}>✕</button>
                </span>
              ))}
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && search.trim() && addChip(search.trim())}
                placeholder={filterChips.length === 0 ? 'Search courses...' : ''}
                style={{ flex: 1, border: 'none', outline: 'none', minWidth: 80, background: 'transparent', fontSize: 13 }}
              />
              <span style={{ color: '#aaa', fontSize: 16 }}>⌕</span>
            </div>

            {/* Scrollable course list */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0 }}>
              {filtered.map(c => {
                const key = c.code + c.section;
                const isExpanded = expanded === key;
                const alreadyAdded = addedCourses.some(a => a.code === c.code);
                return (
                  <div key={key} style={{ border: '1px solid #e5e5e5', borderRadius: 6, overflow: 'hidden', flexShrink: 0, minWidth: 0 }}>
                    <div
                      onClick={() => setExpanded(isExpanded ? null : key)}
                      style={{ padding: '10px 14px', cursor: 'pointer', background: isExpanded ? '#fff5f7' : '#fff', overflow: 'hidden' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, overflow: 'hidden', flex: 1 }}>
                          <span style={{ fontWeight: 600, fontSize: 13, flexShrink: 0 }}>{c.code}</span>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ccc', display: 'inline-block', flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: '#333', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{c.title}</span>
                        </div>
                        <span style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap', marginLeft: 8, flexShrink: 0 }}>{c.credits} cr</span>
                      </div>
                      {!isExpanded && (
                        <div style={{ fontSize: 11, color: '#999', marginTop: 3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {c.description}
                        </div>
                      )}
                    </div>
                    {isExpanded && (
                      <div style={{ padding: '10px 14px', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
                        <p style={{ fontSize: 12, color: '#555', marginBottom: 12, lineHeight: 1.5, wordBreak: 'break-word' }}>{c.description}</p>
                        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 12 }}>
                          <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <div><strong>Section:</strong> {c.section}</div>
                            <div><strong>Professor:</strong> {c.professor}</div>
                            <div><strong>Length:</strong> {c.classLength}</div>
                            <div><strong>Seats:</strong> {c.seatsAvailable}</div>
                          </div>
                          <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {(['Monday','Tuesday','Wednesday','Thursday','Friday'] as const).map(day => (
                              <div key={day}><strong>{day.slice(0,3)}:</strong> {(c as unknown as Record<string,string>)[day.toLowerCase()] ?? 'N/A'}</div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => addCourse(c)}
                          disabled={alreadyAdded}
                          style={{
                            padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: alreadyAdded ? 'default' : 'pointer',
                            background: alreadyAdded ? '#e5e5e5' : 'var(--rpi-red)',
                            color: alreadyAdded ? '#999' : '#fff', border: 'none',
                          }}
                        >
                          {alreadyAdded ? 'Added' : '+ Add Course'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div style={{ width: 210, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{
          background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5',
          padding: 16, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, flexShrink: 0 }}>
            {currentSem} Courses
          </h3>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {visibleCourses.length === 0 ? (
              <div style={{ color: '#aaa', fontSize: 12, textAlign: 'center', padding: 20 }}>
                No courses added yet
              </div>
            ) : (
              visibleCourses.map(c => (
                <div key={c.code} style={{ borderLeft: `4px solid ${c.color}`, paddingLeft: 10, flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.code}</div>
                    <button onClick={() => removeCourse(c.code)} style={{ fontSize: 13, color: '#bbb', lineHeight: 1, marginLeft: 4 }}>✕</button>
                  </div>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{c.credits} Credits</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>Fulfills: <span style={{ color: '#555' }}>{c.fulfills}</span></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
