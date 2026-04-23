import { useState } from 'react';
import {
  futureCoursesFall2026, futureCoursesSpring2027,
  fall2026Courses, spring2027Courses,
  type SearchCourse, type CourseSection, type FutureCourse,
} from '../data/mockData';

const SEMESTERS = ['Fall 2026', 'Spring 2027'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_HOUR = 8;
const END_HOUR = 20;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

const PALETTE = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#f97316', '#8b5cf6', '#06b6d4', '#ec4899'];

const FULFILLS_FILTERS = ['All', 'CS Major', 'Math Major', 'ITWS Minor', 'HASS', 'Free Elective'];

interface ScheduleVariant {
  id: string;
  name: string;
  courses: FutureCourse[];
}

function toPct(h: number, m: number) { return ((h - START_HOUR) * 60 + m) / TOTAL_MINS * 100; }
function durPct(sh: number, sm: number, eh: number, em: number) { return ((eh - sh) * 60 + (em - sm)) / TOTAL_MINS * 100; }
function fmt(h: number, m: number) {
  const s = h >= 12 ? 'PM' : 'AM';
  return `${h > 12 ? h - 12 : h === 0 ? 12 : h}${m ? `:${String(m).padStart(2, '0')}` : ''} ${s}`;
}

function parseTimeRange(str: string): { startHour: number; startMin: number; endHour: number; endMin: number } | null {
  if (!str || str === 'N/A') return null;
  const m = str.match(/^(\d+)(?::(\d+))?(a|p)-(\d+)(?::(\d+))?(a|p)$/i);
  if (!m) return null;
  const toH = (n: string, mn: string | undefined, ap: string) => {
    let h = parseInt(n); const min = mn ? parseInt(mn) : 0;
    if (ap.toLowerCase() === 'p' && h !== 12) h += 12;
    if (ap.toLowerCase() === 'a' && h === 12) h = 0;
    return { h, min };
  };
  const s = toH(m[1], m[2], m[3]);
  const e = toH(m[4], m[5], m[6]);
  return { startHour: s.h, startMin: s.min, endHour: e.h, endMin: e.min };
}

function sectionDayLabel(sec: CourseSection): string {
  const dayMap: [string, string | undefined][] = [
    ['Mon', sec.monday], ['Tue', sec.tuesday], ['Wed', sec.wednesday],
    ['Thu', sec.thursday], ['Fri', sec.friday],
  ];
  return dayMap
    .filter(([, v]) => v && v !== 'N/A')
    .map(([d, v]) => `${d} ${v}`)
    .join(', ') || 'TBA';
}

function sectionToSlots(sec: CourseSection): FutureCourse['slots'] {
  const dayMap: [string, string | undefined][] = [
    ['Monday', sec.monday], ['Tuesday', sec.tuesday], ['Wednesday', sec.wednesday],
    ['Thursday', sec.thursday], ['Friday', sec.friday],
  ];
  return dayMap.flatMap(([day, val]) => {
    const t = parseTimeRange(val ?? '');
    return t ? [{ day, ...t, room: `Sec ${sec.id}` }] : [];
  });
}

function hasTimeConflict(sec: CourseSection, existing: FutureCourse[]): boolean {
  const newSlots = sectionToSlots(sec);
  return newSlots.some(ns =>
    existing.some(c =>
      c.slots.some(s =>
        s.day === ns.day &&
        s.startHour * 60 + s.startMin < ns.endHour * 60 + ns.endMin &&
        ns.startHour * 60 + ns.startMin < s.endHour * 60 + s.endMin
      )
    )
  );
}

export default function SchedulingFuture() {
  const [semIdx, setSemIdx] = useState(0);
  const [schedules, setSchedules] = useState<ScheduleVariant[]>([
    { id: 'A', name: 'Schedule A', courses: [...futureCoursesFall2026, ...futureCoursesSpring2027] },
  ]);
  const [activeScheduleId, setActiveScheduleId] = useState('A');
  const [colorIdx, setColorIdx] = useState(PALETTE.length); // offset past preset colors
  const [search, setSearch] = useState('');
  const [fulfillsFilter, setFulfillsFilter] = useState('All');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [clickedCourse, setClickedCourse] = useState<FutureCourse | null>(null);

  const currentSem = SEMESTERS[semIdx];
  const pool: SearchCourse[] = semIdx === 0 ? fall2026Courses : spring2027Courses;

  const activeSchedule = schedules.find(s => s.id === activeScheduleId)!;
  const semCourses = activeSchedule.courses.filter(c => c.semester === currentSem);

  const filtered = pool.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) ||
      (c.fulfills?.toLowerCase().includes(q) ?? false);
    const matchFilter = fulfillsFilter === 'All' || (c.fulfills?.includes(fulfillsFilter) ?? false);
    return matchSearch && matchFilter;
  });

  const addSection = (course: SearchCourse, sec: CourseSection) => {
    const color = PALETTE[colorIdx % PALETTE.length];
    setColorIdx(i => i + 1);
    const newCourse: FutureCourse = {
      code: course.code, title: course.title, credits: course.credits,
      fulfills: course.fulfills ?? 'Elective', color,
      semester: currentSem, professor: sec.professor, sectionId: sec.id,
      slots: sectionToSlots(sec),
    };
    // Replace any existing section of the same course in this semester, then add new
    setSchedules(prev => prev.map(s =>
      s.id === activeScheduleId
        ? { ...s, courses: [...s.courses.filter(c => !(c.code === course.code && c.semester === currentSem)), newCourse] }
        : s
    ));
  };

  const removeCourse = (code: string, sectionId?: string) => {
    setSchedules(prev => prev.map(s =>
      s.id === activeScheduleId
        ? { ...s, courses: s.courses.filter(c => !(c.code === code && c.semester === currentSem && (sectionId ? c.sectionId === sectionId : true))) }
        : s
    ));
  };

  const addSchedule = () => {
    const letters = 'ABCDEFGHIJ';
    const next = letters[schedules.length] || `Schedule ${schedules.length + 1}`;
    const newId = next;
    setSchedules(prev => [...prev, {
      id: newId,
      name: `Schedule ${next}`,
      courses: [...futureCoursesFall2026, ...futureCoursesSpring2027],
    }]);
    setActiveScheduleId(newId);
  };

  const totalCredits = semCourses.reduce((s, c) => s + c.credits, 0);

  const isAdded = (code: string, secId: string) =>
    activeSchedule.courses.some(c => c.code === code && c.sectionId === secId && c.semester === currentSem);

  const isAnyAdded = (code: string) =>
    activeSchedule.courses.some(c => c.code === code && c.semester === currentSem);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'calc(100vh - 52px - 48px)', overflow: 'hidden', gap: 0 }}>

      {/* Top bar: schedule tabs + semester selector */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#fff', borderRadius: '8px 8px 0 0', borderBottom: '1px solid #e5e5e5',
        padding: '0 16px', flexShrink: 0,
      }}>
        {/* Schedule variant tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <span style={{ fontSize: 12, color: '#888', marginRight: 10, fontWeight: 500 }}>SCHEDULES</span>
          {schedules.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveScheduleId(s.id)}
              style={{
                padding: '12px 16px', fontSize: 13,
                fontWeight: activeScheduleId === s.id ? 600 : 400,
                color: activeScheduleId === s.id ? '#1a1a1a' : '#666',
                borderBottom: activeScheduleId === s.id ? '2px solid var(--rpi-red)' : '2px solid transparent',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              {s.name}
            </button>
          ))}
          {schedules.length < 5 && (
            <button
              onClick={addSchedule}
              style={{
                padding: '8px 12px', fontSize: 12, color: '#888',
                border: '1px dashed #ccc', borderRadius: 6, margin: '0 8px',
                background: 'none', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--rpi-red)'; e.currentTarget.style.borderColor = 'var(--rpi-red)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#ccc'; }}
            >
              + New Schedule
            </button>
          )}
        </div>

        {/* Semester selector */}
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 8, padding: 3, gap: 2 }}>
          {SEMESTERS.map((sem, i) => (
            <button key={sem} onClick={() => setSemIdx(i)} style={{
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

      {/* Main area: left course panel + right calendar */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#f0f0f0', gap: 12, padding: 12, borderRadius: '0 0 8px 8px' }}>

        {/* LEFT PANEL: Course search + list */}
        <div style={{
          width: 360, flexShrink: 0, background: '#fff', borderRadius: 8,
          border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
              Adding to: <strong style={{ color: '#1a1a1a' }}>{currentSem}</strong>
              <span style={{ marginLeft: 8, color: '#aaa' }}>{totalCredits} cr planned</span>
            </div>

            {/* Requirement filter chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
              {FULFILLS_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFulfillsFilter(f)}
                  style={{
                    padding: '3px 9px', borderRadius: 12, fontSize: 11, fontWeight: 500,
                    border: `1.5px solid ${fulfillsFilter === f ? 'var(--rpi-red)' : '#e0e0e0'}`,
                    background: fulfillsFilter === f ? '#fce8eb' : '#fff',
                    color: fulfillsFilter === f ? 'var(--rpi-red)' : '#555',
                    cursor: 'pointer', transition: 'all 0.1s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid #ddd', borderRadius: 6, padding: '6px 10px',
            }}>
              <span style={{ color: '#aaa', fontSize: 15 }}>⌕</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13 }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ color: '#bbb', fontSize: 13 }}>✕</button>
              )}
            </div>
          </div>

          {/* Course list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', color: '#aaa', fontSize: 12, padding: 24 }}>
                No courses match your search
              </div>
            )}
            {filtered.map(course => {
              const anyAdded = isAnyAdded(course.code);
              const isOpen = expandedCourse === course.code;
              const addedCourse = anyAdded
                ? activeSchedule.courses.find(c => c.code === course.code && c.semester === currentSem)
                : null;

              return (
                <div key={course.code} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  {/* Course header row */}
                  <div
                    onClick={() => setExpandedCourse(isOpen ? null : course.code)}
                    style={{
                      padding: '10px 14px', cursor: 'pointer',
                      background: isOpen ? '#fafafa' : '#fff',
                      display: 'flex', alignItems: 'flex-start', gap: 8,
                    }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#f9f9f9'; }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = '#fff'; }}
                  >
                    {/* Color swatch if added */}
                    <div style={{
                      width: 4, alignSelf: 'stretch', borderRadius: 2, flexShrink: 0,
                      background: addedCourse ? addedCourse.color : '#e5e5e5',
                      marginTop: 2,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{course.code}</span>
                        {course.fulfills && (
                          <span style={{
                            fontSize: 10, padding: '1px 6px', borderRadius: 10, fontWeight: 500,
                            background: '#f0f0f0', color: '#555',
                          }}>
                            {course.fulfills}
                          </span>
                        )}
                        {anyAdded && (
                          <span style={{
                            fontSize: 10, padding: '1px 6px', borderRadius: 10, fontWeight: 600,
                            background: '#dcfce7', color: '#16a34a',
                          }}>
                            Added
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: '#555', marginTop: 1 }}>{course.title}</div>
                      <div style={{ fontSize: 11, color: '#aaa', marginTop: 1 }}>{course.credits} cr</div>
                    </div>
                    <span style={{ color: '#bbb', fontSize: 12, marginTop: 2, flexShrink: 0 }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </div>

                  {/* Expanded: description + sections */}
                  {isOpen && (
                    <div style={{ padding: '0 14px 12px', background: '#fafafa' }}>
                      <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5, marginBottom: 10 }}>
                        {course.description}
                      </p>

                      <div style={{ fontSize: 11, fontWeight: 600, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Available Sections
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {course.sections.map(sec => {
                          const added = isAdded(course.code, sec.id);
                          const full = sec.seatsFilled >= sec.seatsTotal;
                          const conflict = !added && !full && hasTimeConflict(sec, semCourses);
                          const pctFull = Math.round((sec.seatsFilled / sec.seatsTotal) * 100);

                          return (
                            <div
                              key={sec.id}
                              style={{
                                border: `1px solid ${added ? '#86efac' : conflict ? '#fca5a5' : '#e5e5e5'}`,
                                borderRadius: 6, padding: '8px 10px',
                                background: added ? '#f0fdf4' : conflict ? '#fff5f5' : '#fff',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: 12, fontWeight: 500, color: '#333' }}>
                                    Sec {sec.id} — {sec.professor}
                                  </div>
                                  <div style={{ fontSize: 11, color: '#666', marginTop: 1 }}>
                                    {sectionDayLabel(sec)}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                    {/* Seats bar */}
                                    <div style={{ display: 'flex', height: 4, width: 60, borderRadius: 2, overflow: 'hidden', background: '#e5e5e5' }}>
                                      <div style={{
                                        width: `${pctFull}%`,
                                        background: full ? '#ef4444' : pctFull > 70 ? '#f59e0b' : '#22c55e',
                                      }} />
                                    </div>
                                    <span style={{ fontSize: 10, color: '#888' }}>{sec.seatsFilled}/{sec.seatsTotal} seats</span>
                                    {full && (
                                      <span style={{
                                        fontSize: 10, fontWeight: 700, color: '#ef4444',
                                        border: '1px solid #ef4444', borderRadius: 4, padding: '0 4px',
                                      }}>
                                        FULL
                                      </span>
                                    )}
                                    {conflict && (
                                      <span style={{
                                        fontSize: 10, fontWeight: 700, color: '#f59e0b',
                                        border: '1px solid #f59e0b', borderRadius: 4, padding: '0 4px',
                                      }}>
                                        CONFLICT
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {added ? (
                                  <button
                                    onClick={() => removeCourse(course.code, sec.id)}
                                    style={{
                                      padding: '4px 10px', borderRadius: 5, fontSize: 11, fontWeight: 600,
                                      background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5',
                                      cursor: 'pointer', flexShrink: 0,
                                    }}
                                  >
                                    Remove
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => !full && !conflict && addSection(course, sec)}
                                    disabled={full || conflict}
                                    style={{
                                      padding: '4px 10px', borderRadius: 5, fontSize: 11, fontWeight: 600,
                                      background: full || conflict ? '#f3f4f6' : 'var(--rpi-red)',
                                      color: full || conflict ? '#aaa' : '#fff',
                                      border: 'none', cursor: full || conflict ? 'not-allowed' : 'pointer',
                                      flexShrink: 0,
                                    }}
                                  >
                                    {full ? 'Full' : conflict ? 'Conflict' : '+ Add'}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Calendar */}
        <div style={{
          flex: 1, background: '#fff', borderRadius: 8,
          border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', overflow: 'hidden',
          minWidth: 0,
        }}>
          {/* Calendar header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 16px', borderBottom: '1px solid #f0f0f0', flexShrink: 0,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{currentSem} — {activeSchedule.name}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {semCourses.map(c => (
                <div key={c.code + c.sectionId} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#555' }}>{c.code.replace('-', ' ')}</span>
                  <button
                    onClick={() => removeCourse(c.code, c.sectionId)}
                    style={{ fontSize: 10, color: '#bbb', lineHeight: 1 }}
                    title="Remove"
                  >✕</button>
                </div>
              ))}
              {semCourses.length === 0 && (
                <span style={{ fontSize: 12, color: '#aaa' }}>No courses added — search and add from the left panel</span>
              )}
            </div>
          </div>

          {/* Day column headers */}
          <div style={{ display: 'flex', flexShrink: 0 }}>
            <div style={{ width: 40, flexShrink: 0 }} />
            {DAYS.map(d => (
              <div key={d} style={{
                flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 500,
                color: '#555', padding: '5px 0', borderBottom: '1px solid #e5e5e5',
              }}>
                {d.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
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

            {/* Day columns */}
            {DAYS.map(day => {
              const dayCourses = semCourses.flatMap(c =>
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
                  {dayCourses.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => setClickedCourse(c)}
                      title={`${c.code.replace('-', ' ')} — click for info`}
                      style={{
                        position: 'absolute', left: 2, right: 2,
                        top: `${toPct(c.slot.startHour, c.slot.startMin)}%`,
                        height: `calc(${durPct(c.slot.startHour, c.slot.startMin, c.slot.endHour, c.slot.endMin)}% - 2px)`,
                        background: c.color + '22', borderLeft: `3px solid ${c.color}`,
                        borderRadius: 4, padding: '2px 4px', overflow: 'hidden', fontSize: 10,
                        cursor: 'pointer', transition: 'filter 0.1s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.93)'; }}
                      onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
                    >
                      <div style={{ fontWeight: 700, color: c.color, lineHeight: 1.2 }}>{c.code.replace('-', ' ')}</div>
                      <div style={{ color: '#555' }}>{fmt(c.slot.startHour, c.slot.startMin)}–{fmt(c.slot.endHour, c.slot.endMin)}</div>
                      <div style={{ color: '#777' }}>{c.slot.room}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course info modal */}
      {clickedCourse && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300,
          }}
          onClick={() => setClickedCourse(null)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 10, padding: 24, minWidth: 340, maxWidth: 480,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)', position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setClickedCourse(null)}
              style={{ position: 'absolute', top: 12, right: 14, fontSize: 18, color: '#888', cursor: 'pointer' }}
            >✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 4, height: 36, borderRadius: 2, background: clickedCourse.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{clickedCourse.code.replace('-', ' ')}</div>
                <div style={{ fontSize: 13, color: '#555' }}>{clickedCourse.title}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              <div><strong>Credits:</strong> {clickedCourse.credits}</div>
              <div><strong>Fulfills:</strong> {clickedCourse.fulfills}</div>
              {clickedCourse.professor && <div><strong>Professor:</strong> {clickedCourse.professor}</div>}
              {clickedCourse.sectionId && <div><strong>Section:</strong> {clickedCourse.sectionId}</div>}
              <div><strong>Schedule:</strong></div>
              {clickedCourse.slots.map((s, i) => (
                <div key={i} style={{ paddingLeft: 12, color: '#555' }}>
                  {s.day}, {fmt(s.startHour, s.startMin)} – {fmt(s.endHour, s.endMin)} · {s.room}
                </div>
              ))}
            </div>
            <button
              onClick={() => { removeCourse(clickedCourse.code, clickedCourse.sectionId); setClickedCourse(null); }}
              style={{
                marginTop: 16, padding: '7px 16px', borderRadius: 6, fontSize: 13,
                background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5',
                cursor: 'pointer', fontWeight: 600,
              }}
            >
              Remove from Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

