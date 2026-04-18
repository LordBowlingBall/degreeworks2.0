import { useState } from 'react';
import { currentSchedule } from '../data/mockData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_HOUR = 8;
const END_HOUR = 20; // 8 PM
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

function toPct(hour: number, min: number) {
  return ((hour - START_HOUR) * 60 + min) / TOTAL_MINS * 100;
}

function durationPct(startH: number, startM: number, endH: number, endM: number) {
  return ((endH - startH) * 60 + (endM - startM)) / TOTAL_MINS * 100;
}

function formatTime(h: number, m: number) {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h;
  const min = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  return `${hour}${min} ${suffix}`;
}

export default function SchedulingCurrent() {
  const [gpaOpen, setGpaOpen] = useState(false);
  const [grades, setGrades] = useState<Record<string, string>>(
    Object.fromEntries(currentSchedule.map(c => [c.id, '4.0']))
  );

  const calculateGPA = () => {
    let points = 0, credits = 0;
    currentSchedule.forEach(c => {
      points += parseFloat(grades[c.id] || '4.0') * c.credits;
      credits += c.credits;
    });
    return credits > 0 ? (points / credits).toFixed(2) : '0.00';
  };

  return (
    // Outer container fills the viewport height minus header and padding
    <div style={{
      display: 'flex', gap: 16, width: '100%',
      height: 'calc(100vh - 52px - 48px)',
      overflow: 'hidden',
    }}>
      {/* Calendar card */}
      <div style={{
        flex: 1, background: '#fff', borderRadius: 8,
        border: '1px solid #e5e5e5', padding: 16,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        minWidth: 0,
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, flexShrink: 0 }}>
          Spring 2026 Schedule
        </h2>

        {/* Day header row */}
        <div style={{ display: 'flex', flexShrink: 0, marginBottom: 0 }}>
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

        {/* Grid body — fills remaining height */}
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          {/* Time labels column */}
          <div style={{ width: 48, flexShrink: 0, position: 'relative' }}>
            {HOURS.map(h => (
              <div key={h} style={{
                position: 'absolute',
                top: `${toPct(h, 0)}%`,
                right: 4,
                transform: 'translateY(-50%)',
                fontSize: 10, color: '#aaa', whiteSpace: 'nowrap',
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
              <div key={day} style={{
                flex: 1, position: 'relative',
                borderLeft: '1px solid #e5e5e5',
              }}>
                {/* Hour grid lines */}
                {HOURS.map(h => (
                  <div key={h} style={{
                    position: 'absolute', left: 0, right: 0,
                    top: `${toPct(h, 0)}%`,
                    borderTop: '1px solid #f0f0f0',
                  }} />
                ))}

                {/* Course blocks */}
                {dayCourses.map((c, i) => {
                  const top = toPct(c.slot.startHour, c.slot.startMin);
                  const height = durationPct(c.slot.startHour, c.slot.startMin, c.slot.endHour, c.slot.endMin);
                  return (
                    <div key={i} style={{
                      position: 'absolute',
                      left: 2, right: 2,
                      top: `${top}%`,
                      height: `calc(${height}% - 2px)`,
                      background: c.color + '22',
                      borderLeft: `3px solid ${c.color}`,
                      borderRadius: 4,
                      padding: '3px 5px',
                      overflow: 'hidden',
                      fontSize: 11,
                    }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {currentSchedule.map(c => (
              <div key={c.id} style={{ borderLeft: `4px solid ${c.color}`, paddingLeft: 10 }}>
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
          }}
        >
          Calculate GPA
        </button>
      </div>

      {/* GPA Modal */}
      {gpaOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{
            background: '#fff', borderRadius: 10, padding: 24,
            minWidth: 320, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <button
              onClick={() => setGpaOpen(false)}
              style={{ position: 'absolute', top: 12, right: 14, fontSize: 18, color: '#888' }}
            >
              ✕
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {currentSchedule.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ minWidth: 110, fontWeight: 500, fontSize: 13 }}>{c.code}:</span>
                  <input
                    type="number" min="0" max="4" step="0.1"
                    value={grades[c.id]}
                    onChange={e => setGrades(g => ({ ...g, [c.id]: e.target.value }))}
                    style={{
                      width: 72, padding: '5px 8px', border: '1px solid #ddd',
                      borderRadius: 6, fontSize: 13, textAlign: 'center',
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button style={{
                padding: '8px 20px', border: '1px solid var(--rpi-red)', borderRadius: 6,
                color: 'var(--rpi-red)', fontWeight: 600,
              }}>
                Calculate GPA
              </button>
              <div style={{
                padding: '8px 16px', background: '#fce8eb',
                border: '2px solid var(--rpi-red)', borderRadius: 6,
                fontWeight: 700, fontSize: 18, color: 'var(--rpi-red)',
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
