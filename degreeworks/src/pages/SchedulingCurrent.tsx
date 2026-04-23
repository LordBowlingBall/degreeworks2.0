import { useState } from 'react';
import { currentSchedule, type ScheduleCourse } from '../data/mockData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_HOUR = 8;
const END_HOUR = 20;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

function toPct(hour: number, min: number) {
  return ((hour - START_HOUR) * 60 + min) / TOTAL_MINS * 100;
}
function durationPct(sH: number, sM: number, eH: number, eM: number) {
  return ((eH - sH) * 60 + (eM - sM)) / TOTAL_MINS * 100;
}
function formatTime(h: number, m: number) {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const min = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  return `${hour}${min} ${suffix}`;
}

const GRADE_OPTIONS = ['4.0', '3.7', '3.3', '3.0', '2.7', '2.3', '2.0', '1.7', '1.3', '1.0', '0.0'];

export default function SchedulingCurrent() {
  const [gpaOpen, setGpaOpen] = useState(false);
  const [grades, setGrades] = useState<Record<string, string>>(
    Object.fromEntries(currentSchedule.map(c => [c.id, '4.0']))
  );
  const [selectedCourse, setSelectedCourse] = useState<ScheduleCourse | null>(null);

  const calculateGPA = () => {
    let points = 0, credits = 0;
    currentSchedule.forEach(c => {
      points += parseFloat(grades[c.id] || '4.0') * c.credits;
      credits += c.credits;
    });
    return credits > 0 ? (points / credits).toFixed(2) : '0.00';
  };

  const gpaNum = parseFloat(calculateGPA());
  const gpaColor = gpaNum >= 3.5 ? '#22c55e' : gpaNum >= 2.7 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{
      display: 'flex', gap: 16, width: '100%',
      height: 'calc(100vh - 52px - 48px)', overflow: 'hidden',
    }}>
      {/* Calendar card */}
      <div style={{
        flex: 1, background: '#fff', borderRadius: 8,
        border: '1px solid #e5e5e5', padding: 16,
        display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0,
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, flexShrink: 0 }}>
          Spring 2026 Schedule
        </h2>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 12, flexShrink: 0 }}>
          Click any course block to see details
        </div>

        {/* Day header row */}
        <div style={{ display: 'flex', flexShrink: 0 }}>
          <div style={{ width: 48, flexShrink: 0 }} />
          {DAYS.map(day => (
            <div key={day} style={{
              flex: 1, textAlign: 'center', fontSize: 12,
              fontWeight: 500, color: '#555', padding: '4px 0',
              borderBottom: '1px solid #e5e5e5',
            }}>
              {day.slice(0, 3)}
            </div>
          ))}
        </div>

        {/* Grid body */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          {/* Time labels */}
          <div style={{ width: 48, flexShrink: 0, position: 'relative' }}>
            {HOURS.map(h => (
              <div key={h} style={{
                position: 'absolute', top: `${toPct(h, 0)}%`, right: 4,
                transform: 'translateY(-50%)', fontSize: 10, color: '#aaa', whiteSpace: 'nowrap',
              }}>
                {h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map(day => {
            const dayCourses = currentSchedule.flatMap(c =>
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
                {dayCourses.map((c, i) => {
                  const top = toPct(c.slot.startHour, c.slot.startMin);
                  const height = durationPct(c.slot.startHour, c.slot.startMin, c.slot.endHour, c.slot.endMin);
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedCourse(c)}
                      title={`${c.code} — click for details`}
                      style={{
                        position: 'absolute', left: 2, right: 2,
                        top: `${top}%`, height: `calc(${height}% - 2px)`,
                        background: c.color + '22', borderLeft: `3px solid ${c.color}`,
                        borderRadius: 4, padding: '3px 5px', overflow: 'hidden', fontSize: 11,
                        cursor: 'pointer', transition: 'filter 0.1s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.93)'; }}
                      onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
                    >
                      <div style={{ fontWeight: 700, color: c.color }}>{c.code}</div>
                      <div style={{ color: '#555', fontSize: 10 }}>
                        {formatTime(c.slot.startHour, c.slot.startMin)}–{formatTime(c.slot.endHour, c.slot.endMin)}
                      </div>
                      <div style={{ color: '#777', fontSize: 10 }}>{c.slot.room}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ width: 210, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        <div style={{
          background: '#fff', borderRadius: 8, border: '1px solid #e5e5e5',
          padding: 16, flex: 1, overflow: 'auto',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Courses</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {currentSchedule.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCourse(c)}
                style={{ borderLeft: `4px solid ${c.color}`, paddingLeft: 10, cursor: 'pointer', borderRadius: '0 4px 4px 0' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f9f9f9'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>{c.code}</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 2 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#555' }}>{c.credits} Credits</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Fulfills:</div>
                <div style={{ fontSize: 11, color: '#555', marginLeft: 4 }}>{c.fulfills}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setGpaOpen(true)}
          style={{
            padding: '10px', border: '1px solid #ddd', borderRadius: 8, flexShrink: 0,
            background: '#fff', color: 'var(--rpi-red)', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', transition: 'background 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fce8eb'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
        >
          Calculate GPA
        </button>
      </div>

      {/* Course info modal */}
      {selectedCourse && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
          }}
          onClick={() => setSelectedCourse(null)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 10, padding: 24,
              minWidth: 340, maxWidth: 480, boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              style={{ position: 'absolute', top: 12, right: 14, fontSize: 18, color: '#888', cursor: 'pointer' }}
            >✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 4, height: 40, borderRadius: 2, background: selectedCourse.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedCourse.code}</div>
                <div style={{ fontSize: 13, color: '#555' }}>{selectedCourse.title}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13 }}>
              <div><strong>Credits:</strong> {selectedCourse.credits}</div>
              <div><strong>Fulfills:</strong> {selectedCourse.fulfills}</div>
              {selectedCourse.professor && <div><strong>Professor:</strong> {selectedCourse.professor}</div>}
              <div><strong>Session times:</strong></div>
              {selectedCourse.slots.map((s, i) => (
                <div key={i} style={{ paddingLeft: 12, color: '#555' }}>
                  {s.day}, {formatTime(s.startHour, s.startMin)} – {formatTime(s.endHour, s.endMin)} · {s.room}
                </div>
              ))}
              {selectedCourse.description && (
                <div style={{ marginTop: 4 }}>
                  <strong>About:</strong>
                  <p style={{ color: '#555', marginTop: 4, lineHeight: 1.5, fontSize: 12 }}>
                    {selectedCourse.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GPA Calculator Modal */}
      {gpaOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{
            background: '#fff', borderRadius: 10, padding: 24,
            minWidth: 340, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <button
              onClick={() => setGpaOpen(false)}
              style={{ position: 'absolute', top: 12, right: 14, fontSize: 18, color: '#888', cursor: 'pointer' }}
            >✕</button>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Semester GPA Calculator</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {currentSchedule.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 4, height: 24, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <span style={{ minWidth: 110, fontWeight: 500, fontSize: 13 }}>{c.code}</span>
                  <select
                    value={grades[c.id]}
                    onChange={e => setGrades(g => ({ ...g, [c.id]: e.target.value }))}
                    style={{
                      padding: '5px 8px', border: '1px solid #ddd',
                      borderRadius: 6, fontSize: 13, background: '#fff', cursor: 'pointer',
                    }}
                  >
                    {GRADE_OPTIONS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <span style={{ fontSize: 12, color: '#888' }}>{c.credits} cr</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 13, color: '#555' }}>Projected semester GPA</span>
              <div style={{
                padding: '8px 20px', background: '#fce8eb',
                border: `2px solid ${gpaColor}`, borderRadius: 8,
                fontWeight: 700, fontSize: 22, color: gpaColor,
              }}>
                {calculateGPA()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
