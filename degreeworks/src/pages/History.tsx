import { useState } from 'react';
import { semesterHistory, type CourseStatus } from '../data/mockData';

function StatusDot({ status }: { status: CourseStatus }) {
  if (status === 'complete') return <span className="status-dot dot-complete" />;
  if (status === 'inprogress') return <span className="dot-inprogress" />;
  return <span className="dot-incomplete" />;
}

export default function History() {
  const [activeId, setActiveId] = useState(semesterHistory[0].id);
  const semester = semesterHistory.find(s => s.id === activeId) ?? semesterHistory[0];

  return (
    <div style={{ width: '100%' }}>
      {/* Semester tabs */}
      <div style={{
        display: 'flex', alignItems: 'center', background: '#fff',
        borderRadius: '8px 8px 0 0', borderBottom: '1px solid #e5e5e5',
        padding: '0 20px', gap: 0, overflowX: 'auto',
      }}>
        {semesterHistory.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            style={{
              padding: '14px 20px', fontSize: 13, fontWeight: activeId === s.id ? 600 : 400,
              color: activeId === s.id ? '#1a1a1a' : '#555',
              borderBottom: activeId === s.id ? '2px solid var(--rpi-red)' : '2px solid transparent',
              background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {s.label}
            {s.current && (
              <span style={{
                fontSize: 10, fontWeight: 600, color: '#3b82f6',
                border: '1.5px solid #3b82f6', borderRadius: 4,
                padding: '1px 5px', letterSpacing: '0.04em',
              }}>
                CURRENT
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', border: '1px solid #e5e5e5', borderTop: 'none' }}>
        {/* Summary */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{semester.label} Summary</div>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semester GPA</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>
                {semester.current ? '—' : semester.gpa.toFixed(2)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Credits</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{semester.creditsTaken}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Courses</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{semester.courses.length}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requirements Filled</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{semester.requirementsFilled}</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
              {['Status', 'Course Code', 'Title', 'Grade', 'Credits', 'Requirement'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '12px 20px',
                  fontWeight: 600, fontSize: 12,
                  color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {semester.courses.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '16px 20px' }}>
                  <StatusDot status={c.status} />
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 600, fontSize: 14 }}>{c.code}</td>
                <td style={{ padding: '16px 20px', fontSize: 14 }}>{c.title}</td>
                <td style={{ padding: '16px 20px', fontSize: 14, color: c.grade === '—' ? '#bbb' : '#333', fontWeight: c.grade !== '—' ? 500 : 400 }}>{c.grade}</td>
                <td style={{ padding: '16px 20px', fontSize: 14 }}>{c.credits}</td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: '#666' }}>{c.requirement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
