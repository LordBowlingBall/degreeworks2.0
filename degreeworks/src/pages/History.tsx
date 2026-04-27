import { useState } from 'react';
import { semesterHistory, futureCoursesFall2026, futureCoursesSpring2027, type CourseStatus } from '../data/mockData';

function StatusDot({ status }: { status: CourseStatus }) {
  if (status === 'complete') return <span className="status-dot dot-complete" />;
  if (status === 'inprogress') return <span className="dot-inprogress" />;
  return <span className="dot-incomplete" />;
}

function getGpaColor(gpa: number): string {
  if (gpa >= 3.5) return '#22c55e';
  if (gpa >= 3.0) return '#f59e0b';
  if (gpa >= 2.0) return '#f97316';
  return '#ef4444';
}

// Group semesters into academic years (Fall + Spring pairs)
const YEAR_GROUPS = [
  { label: 'Freshman Year', years: '2023–2024', semesters: ['fall2023', 'spring2024'] },
  { label: 'Sophomore Year', years: '2024–2025', semesters: ['fall2024', 'spring2025'] },
  { label: 'Junior Year', years: '2025–2026', semesters: ['fall2025', 'spring2026'] },
  { label: 'Senior Year', years: '2026–2027', semesters: ['fall2026', 'spring2027'] },
];

const REQ_COLORS: Record<string, string> = {
  'CS Major':      '#3b82f6',
  'Math Major':    '#8b5cf6',
  'ITWS Minor':    '#06b6d4',
  'Math/Science':  '#22c55e',
  'HASS':          '#f59e0b',
  'Pathway':       '#f97316',
  'Concentration': '#ec4899',
  'Free':          '#a3a3a3',
};

function ReqBadge({ requirement }: { requirement: string }) {
  const color = REQ_COLORS[requirement] ?? '#9ca3af';
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 10,
      background: color + '22', color, border: `1px solid ${color}44`,
      whiteSpace: 'nowrap',
    }}>
      {requirement}
    </span>
  );
}

function SemesterCard({ semId }: { semId: string }) {
  const sem = semesterHistory.find(s => s.id === semId);

  if (!sem) {
    // Future or planned semester not yet in history — show empty slot
    const isKnown = semId === 'fall2026' || semId === 'spring2027';
    if (!isKnown) return (
      <div style={{
        flex: 1, border: '1px dashed #e5e5e5', borderRadius: 8, padding: 16,
        color: '#ccc', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        No data
      </div>
    );
  }

  const isPast = sem && !sem.current && !sem.planned;
  const isCurrent = sem?.current;
  const isPlanned = sem?.planned;

  const headerBg = isCurrent ? '#eff6ff' : isPlanned ? '#f9f9f9' : '#fff';
  const borderColor = isCurrent ? '#3b82f6' : isPlanned ? '#e5e5e5' : '#e5e5e5';

  const courses = sem?.courses ?? [];
  const uniqueReqs = [...new Set(courses.map(c => c.requirement))];

  return (
    <div style={{
      flex: 1, border: `1px solid ${borderColor}`,
      borderTop: `3px solid ${isCurrent ? '#3b82f6' : isPlanned ? '#d1d5db' : '#e5e5e5'}`,
      borderRadius: 8, overflow: 'hidden', minWidth: 0,
    }}>
      {/* Semester header */}
      <div style={{ padding: '10px 14px', background: headerBg, borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{sem?.label ?? semId}</span>
          {isCurrent && (
            <span style={{ fontSize: 10, fontWeight: 600, color: '#3b82f6', border: '1.5px solid #3b82f6', borderRadius: 4, padding: '1px 5px' }}>
              CURRENT
            </span>
          )}
          {isPlanned && (
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', border: '1.5px solid #d1d5db', borderRadius: 4, padding: '1px 5px' }}>
              PLANNED
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666' }}>
          <span>
            <strong style={{ color: isPast ? getGpaColor(sem?.gpa ?? 0) : '#aaa' }}>
              {isPast ? (sem?.gpa ?? 0).toFixed(2) : '—'}
            </strong> GPA
          </span>
          <span><strong>{sem?.creditsTaken ?? 0}</strong> cr</span>
          <span><strong>{courses.length}</strong> courses</span>
        </div>
      </div>

      {/* Requirements chips */}
      {uniqueReqs.length > 0 && (
        <div style={{ padding: '8px 14px', display: 'flex', flexWrap: 'wrap', gap: 4, borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
          {uniqueReqs.map(r => <ReqBadge key={r} requirement={r} />)}
        </div>
      )}

      {/* Course list */}
      <div style={{ padding: '6px 0' }}>
        {courses.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', fontSize: 12,
            borderBottom: i < courses.length - 1 ? '1px solid #f5f5f5' : 'none',
          }}>
            <StatusDot status={c.status} />
            <span style={{ fontWeight: 500, color: '#333', minWidth: 0, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {c.code}
            </span>
            <div style={{ flex: '0 0 36px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span style={{ color: c.grade === '—' ? '#ccc' : '#555', fontWeight: 600, fontSize: 11, width: 14, textAlign: 'center' }}>
                {c.grade === '—' ? '—' : c.grade[0]}
              </span>
              <span style={{ color: c.grade === '—' ? '#ccc' : '#555', fontWeight: 600, fontSize: 11, width: 10, textAlign: 'left' }}>
                {c.grade !== '—' && c.grade.length > 1 ? c.grade[1] : ''}
              </span>
            </div>
            <span style={{ color: '#888', fontSize: 11, flex: '0 0 26px', textAlign: 'right' }}>{c.credits}cr</span>
          </div>
        ))}
        {courses.length === 0 && (
          <div style={{ padding: '12px 14px', color: '#ccc', fontSize: 12, textAlign: 'center' }}>No courses</div>
        )}
      </div>
    </div>
  );
}

export default function History() {
  const [view, setView] = useState<'semester' | '4year'>('semester');
  const [activeId, setActiveId] = useState(semesterHistory.find(s => s.current)?.id ?? semesterHistory[0].id);

  const semester = semesterHistory.find(s => s.id === activeId) ?? semesterHistory[0];

  // Derive requirement categories touched this semester
  const reqCategories = [...new Set(semester.courses.map(c => c.requirement))];

  // Cumulative GPA across completed semesters
  const completedSems = semesterHistory.filter(s => !s.current && !s.planned && s.gpa > 0);
  const cumulativeGpa = completedSems.length > 0
    ? (completedSems.reduce((s, x) => s + x.gpa * x.creditsTaken, 0) / completedSems.reduce((s, x) => s + x.creditsTaken, 0)).toFixed(2)
    : '—';

  return (
    <div style={{ width: '100%' }}>
      {/* View toggle + tabs row */}
      <div style={{
        display: 'flex', alignItems: 'center', background: '#fff',
        borderRadius: '8px 8px 0 0', borderBottom: '1px solid #e5e5e5',
        padding: '0 20px', gap: 0, overflowX: 'auto',
      }}>
        {/* View toggle */}
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 6, padding: 3, gap: 2, marginRight: 16, flexShrink: 0 }}>
          {(['semester', '4year'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '4px 12px', fontSize: 12, fontWeight: view === v ? 600 : 400,
                borderRadius: 4, border: 'none', cursor: 'pointer',
                background: view === v ? '#fff' : 'transparent',
                color: view === v ? '#1a1a1a' : '#666',
                boxShadow: view === v ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.1s',
              }}
            >
              {v === 'semester' ? 'By Semester' : '4-Year View'}
            </button>
          ))}
        </div>

        {/* Semester tabs (only in semester view) */}
        {view === 'semester' && semesterHistory.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            style={{
              padding: '14px 16px', fontSize: 13, fontWeight: activeId === s.id ? 600 : 400,
              color: activeId === s.id ? '#1a1a1a' : '#555',
              borderBottom: activeId === s.id ? '2px solid var(--rpi-red)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a'; }}
            onMouseLeave={e => { e.currentTarget.style.color = activeId === s.id ? '#1a1a1a' : '#555'; }}
          >
            {s.label}
            {s.current && (
              <span style={{ fontSize: 10, fontWeight: 600, color: '#3b82f6', border: '1.5px solid #3b82f6', borderRadius: 4, padding: '1px 5px' }}>
                CURRENT
              </span>
            )}
            {s.planned && (
              <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', border: '1.5px solid #d1d5db', borderRadius: 4, padding: '1px 5px' }}>
                PLAN
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── SEMESTER VIEW ── */}
      {view === 'semester' && (
        <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', border: '1px solid #e5e5e5', borderTop: 'none' }}>
          {/* Summary bar */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>{semester.label} Summary</div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semester GPA</div>
                <div style={{
                  fontSize: 22, fontWeight: 700,
                  color: semester.current || semester.planned ? '#aaa' : getGpaColor(semester.gpa),
                }}>
                  {semester.current || semester.planned ? '—' : semester.gpa.toFixed(2)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cumulative GPA</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{cumulativeGpa}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Credits</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{semester.creditsTaken}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Courses</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{semester.courses.length}</div>
              </div>
              {reqCategories.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Requirement Areas {semester.current ? 'In Progress' : 'Advanced'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {reqCategories.map(r => <ReqBadge key={r} requirement={r} />)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course table */}
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
                {['Status', 'Course Code', 'Title', 'Grade', 'Credits', 'Requirement Area'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 20px',
                    fontWeight: 600, fontSize: 12, color: '#666',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semester.courses.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 20px' }}><StatusDot status={c.status} /></td>
                  <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: 14 }}>{c.code}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14 }}>{c.title}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: c.grade === '—' ? '#bbb' : '#333', fontWeight: c.grade !== '—' ? 500 : 400 }}>{c.grade}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14 }}>{c.credits}</td>
                  <td style={{ padding: '14px 20px' }}><ReqBadge requirement={c.requirement} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 4-YEAR VIEW ── */}
      {view === '4year' && (
        <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', border: '1px solid #e5e5e5', borderTop: 'none', padding: 20 }}>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              { color: '#22c55e', label: 'Completed' },
              { color: '#3b82f6', label: 'In Progress (current)' },
              { color: '#d1d5db', label: 'Planned' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#555' }}>
                <div style={{ width: 12, height: 4, borderRadius: 2, background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>

          {/* Year rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {YEAR_GROUPS.map(year => (
              <div key={year.label}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 8,
                  marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid #f0f0f0',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {year.label}
                  </span>
                  <span style={{ fontSize: 11, color: '#aaa', fontWeight: 400 }}>{year.years}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {year.semesters.map(semId => (
                    <SemesterCard key={semId} semId={semId} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Future planned courses note */}
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#f9f9f9', borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 12, color: '#666' }}>
            <strong>Senior Year courses</strong> reflect your current planned schedule. You can modify them in{' '}
            <a href="/scheduling/future" style={{ color: 'var(--rpi-red)', textDecoration: 'none' }}>Future Scheduling</a>.
            Currently planned: {futureCoursesFall2026.length + futureCoursesSpring2027.length} courses across Fall 2026 and Spring 2027.
          </div>
        </div>
      )}
    </div>
  );
}
